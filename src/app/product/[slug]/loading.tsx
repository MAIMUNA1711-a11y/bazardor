export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-24 rounded-xl" />
        <div className="skeleton h-24 rounded-xl" />
        <div className="skeleton h-24 rounded-xl" />
      </div>
      <div className="skeleton h-64 w-full rounded-xl" />
    </div>
  );
}
