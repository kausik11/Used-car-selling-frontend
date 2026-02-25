import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './PannellumViewer.css';

const PAN_CSS = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
const PAN_JS = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';

const ensurePannellumAssets = () => {
  if (!$(`link[href="${PAN_CSS}"]`).length) {
    $('<link>', {
      rel: 'stylesheet',
      href: PAN_CSS,
    }).appendTo('head');
  }

  return new Promise((resolve, reject) => {
    if (window.pannellum) {
      resolve(window.pannellum);
      return;
    }

    const existingScript = $(`script[src="${PAN_JS}"]`);
    if (existingScript.length) {
      existingScript.one('load', () => resolve(window.pannellum));
      existingScript.one('error', reject);
      return;
    }

    $('<script>', {
      src: PAN_JS,
      async: true,
    })
      .one('load', () => resolve(window.pannellum))
      .one('error', reject)
      .appendTo('body');
  });
};

const PannellumViewer = ({
  imageSrc,
  height = 360,
  title = 'Drag and explore',
  author = 'Panorama viewer',
  initialHfov = 120,
  minHfov = 50,
  maxHfov = 120,
  onError,
}) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    ensurePannellumAssets()
      .then((pannellum) => {
        if (!active || !containerRef.current || !pannellum || !imageSrc) return;

        viewerRef.current = pannellum.viewer(containerRef.current, {
          type: 'equirectangular',
          panorama: imageSrc,
          title,
          author,
          autoLoad: true,
          autoRotate: -2,
          autoRotateInactivityDelay: 3000,
          hfov: initialHfov,
          minHfov,
          maxHfov,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
        });
      })
      .catch(() => {
        if (!active) return;
        setHasError(true);
        if (onError) onError();
      });

    return () => {
      active = false;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [author, imageSrc, initialHfov, maxHfov, minHfov, onError, title]);

  if (hasError) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-500 sm:h-[360px]">
        Panorama failed to load
      </div>
    );
  }

  return (
    <div className="pannellum">
      <div className="pannellum__viewer" ref={containerRef} style={{ height: `${height}px` }} />
    </div>
  );
};

export default PannellumViewer;
