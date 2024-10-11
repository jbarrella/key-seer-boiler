export default function NoDataMessage() {
  return (
    <div className="mt-10 size-full bg-orange-100 p-8 text-center">
      <span className="text-2xl">No Data Found</span>
      <p>
        We couldn&apos;t find any data for the term you entered. Sometimes a term can be
        too specific or can be blocked due to other reasons. Please try another term.
      </p>
    </div>
  );
}
