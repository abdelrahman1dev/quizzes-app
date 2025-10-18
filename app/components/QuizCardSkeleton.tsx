import { Skeleton } from "@/components/ui/skeleton";

export default function QuizCardSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
      <div className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
