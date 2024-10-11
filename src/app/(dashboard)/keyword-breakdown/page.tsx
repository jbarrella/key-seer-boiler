import Breakdown from '@/components/keyword-breakdown/Breakdown';

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1>Keyword Breakdown</h1>
        <p className="mb-4 mt-10 text-xl">Enter a search term below</p>
      </div>
      <Breakdown />
    </div>
  );
}
