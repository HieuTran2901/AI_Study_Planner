import { Wand2 } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { CustomQuizDialog } from "./CustomQuizDialog";

export function CustomQuizCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer hover:border-indigo-500 transition-all"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-6">
          <div className="flex gap-3 items-start">
            <Wand2 className="h-6 w-6 text-indigo-500" />

            <div>
              <h3 className="font-semibold">Create Custom Quiz</h3>

              <p className="text-sm text-muted-foreground mt-1">
                Generate quizzes from topics and difficulty.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <CustomQuizDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
