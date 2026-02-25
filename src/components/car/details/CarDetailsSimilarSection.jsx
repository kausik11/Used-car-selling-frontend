import CarCard from '../CarCard';

const CarDetailsSimilarSection = ({ cars }) => {
  if (!cars.length) return null;

  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-black text-slate-900">Similar Cars</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarDetailsSimilarSection;

