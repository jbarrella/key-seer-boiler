import Discovery from '@/components/keyword-discovery/Discovery';

export default function KeywordDiscovery() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1>Keyword Discovery</h1>
        <p className="mb-4 mt-10 text-xl">Enter a search term below</p>
      </div>
      <Discovery />
    </div>
  );
}
