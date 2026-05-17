import type { Course } from "@/types/Entity";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

function CheckInstructor({ course }: { course: Course }) {
  switch (course.instructor) {
    case "Github project":
      return (
        <a href={course.url} target="_blank" rel="noopener noreferrer">
          <Button className="w-full border-white/[0.08] text-gray-300 hover:bg-white/[0.05]">
            <ExternalLink size={16} className="mr-2" />
            View Project
          </Button>
        </a>
      );
    default:
      return (
        <Link to={`/course-learning/${course.id}`}>
          <Button className="w-full border-white/[0.08] text-gray-300 hover:bg-white/[0.05]">
            <ExternalLink size={16} className="mr-2" />
            View Course
          </Button>
        </Link>
      );
  }
}

export default CheckInstructor;
