export default function SkeletonCard() {
  return (
    <article
      className="w-64 rounded-xl border p-4 animate-pulse motion-reduce:animate-none"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-full">
          <div className="mb-2 h-3 w-1/3 rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-1/4 rounded bg-gray-200" />
        </div>
        <div className="h-5 w-5 rounded-full bg-gray-200" />
      </div>

      <div className="my-3 aspect-square w-full rounded bg-gray-200" />
      <div className="h-5 w-20 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
      <div className="mt-3 h-8 w-full rounded-full bg-gray-200" />
    </article>
  );
}