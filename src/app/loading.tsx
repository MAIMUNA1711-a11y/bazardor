import { SkeletonGrid } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="skeleton h-64 w-full rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-8 w-48" />
        <SkeletonGrid count={6} />
      </div>
    </div>
  );
}
