import Lookup from '@/components/keywords-lookup/Lookup';

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1>Keywords Lookup</h1>
        <p className="mb-4 mt-10 text-xl">Enter your search terms below</p>
      </div>
      <Lookup />
    </div>
  );
}
