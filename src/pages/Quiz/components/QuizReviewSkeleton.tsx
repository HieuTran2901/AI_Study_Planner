import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function QuizReviewSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-64" />
              </div>

              <Skeleton className="h-10 w-44" />
            </div>
          </CardContent>
        </Card>

        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="mb-4">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />

                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
