import { useEffect, useMemo, useRef, useState } from 'react';

const MIN_FRAME_COUNT = 12;

const wrapPercent = (value) => ((value % 100) + 100) % 100;

const Product360Viewer = ({ frames = [], panoramaImage = '', dragSensitivity = 8, alt = '360 degree product view' }) => {
  const normalizedFrames = useMemo(() => {
    const baseFrames = frames.filter(Boolean);
    if (!baseFrames.length) return [];

    if (baseFrames.length >= MIN_FRAME_COUNT) return baseFrames;

    const expanded = [];
    while (expanded.length < MIN_FRAME_COUNT) {
      expanded.push(baseFrames[expanded.length % baseFrames.length]);
    }
    return expanded;
  }, [frames]);

  const totalFrames = normalizedFrames.length;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [panPosition, setPanPosition] = useState(50);

  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const carryDeltaRef = useRef(0);
  const isPanningRef = useRef(false);
  const panLastXRef = useRef(0);

  useEffect(() => {
    if (panoramaImage) return undefined;
    if (!isDraggingRef.current) return undefined;

    const onPointerMove = (event) => {
      if (!isDraggingRef.current || !totalFrames) return;

      const delta = event.clientX - lastXRef.current;
      lastXRef.current = event.clientX;
      carryDeltaRef.current += delta;

      if (Math.abs(carryDeltaRef.current) < dragSensitivity) return;

      const steps = Math.trunc(carryDeltaRef.current / dragSensitivity);
      carryDeltaRef.current -= steps * dragSensitivity;

      setCurrentFrame((frame) => (frame + steps + totalFrames) % totalFrames);
    };

    const endDrag = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
  }, [dragSensitivity, panoramaImage, totalFrames]);

  const startDrag = (event) => {
    if (!totalFrames) return;
    isDraggingRef.current = true;
    lastXRef.current = event.clientX;
    carryDeltaRef.current = 0;
  };

  const startPan = (event) => {
    isPanningRef.current = true;
    panLastXRef.current = event.clientX;
  };

  const onPanMove = (event) => {
    if (!isPanningRef.current) return;
    const delta = event.clientX - panLastXRef.current;
    panLastXRef.current = event.clientX;
    setPanPosition((prev) => wrapPercent(prev + delta * 0.08));
  };

  const endPan = () => {
    isPanningRef.current = false;
  };

  if (panoramaImage) {
    return (
      <div className="space-y-2">
        <div
          role="presentation"
          onPointerDown={startPan}
          onPointerMove={onPanMove}
          onPointerUp={endPan}
          onPointerCancel={endPan}
          className="relative h-[280px] overflow-hidden rounded-xl bg-slate-100 sm:h-[360px]"
          style={{
            backgroundImage: `url(${panoramaImage})`,
            backgroundPosition: `${panPosition}% center`,
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'repeat-x',
            cursor: 'grab',
          }}
        >
          <div className="absolute inset-x-0 bottom-3 text-center text-xs font-semibold text-white">
            <span className="rounded-full bg-black/45 px-3 py-1">Drag to rotate panorama</span>
          </div>
        </div>
        <p className="text-xs font-medium text-slate-500">Panoramic 360 preview.</p>
      </div>
    );
  }

  if (!totalFrames) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-500">
        360 view unavailable
      </div>
    );
  }

  const activeFrame = ((currentFrame % totalFrames) + totalFrames) % totalFrames;

  return (
    <div className="space-y-2">
      <div
        role="presentation"
        onPointerDown={startDrag}
        className="relative overflow-hidden rounded-xl bg-slate-100"
      >
        <img
          src={normalizedFrames[activeFrame]}
          alt={alt}
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          className="h-[280px] w-full bg-slate-100 object-contain sm:h-[360px]"
        />
      </div>
      <p className="text-xs font-medium text-slate-500">Drag or swipe to rotate.</p>
    </div>
  );
};

export default Product360Viewer;
