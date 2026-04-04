import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  BarChart3,
  ExternalLink,
  Play,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: number;
  title: string;
  platform: string;
  instructor: string;
  rating: number;
  duration: string;
  progress: number;
  enrolled: boolean;
  image: string;
  category: string;
  level: string;
}

const coursesData: Course[] = [
  {
    id: 1,
    title: "Complete React Developer Course",
    platform: "Udemy",
    instructor: "Andrew Mead",
    rating: 4.8,
    duration: "39 hours",
    progress: 65,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1758876203754-1bc9d3ed514c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBsYXB0b3AlMjBzY3JlZW58ZW58MXx8fHwxNzc0NzU3OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Frontend",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Advanced CSS and Sass",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.9,
    duration: "28 hours",
    progress: 100,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1080&q=80",
    category: "Frontend",
    level: "Advanced",
  },
  {
    id: 3,
    title: "TypeScript: The Complete Developer's Guide",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.7,
    duration: "25 hours",
    progress: 40,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1080&q=80",
    category: "Programming",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Node.js, Express & MongoDB Bootcamp",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    duration: "42 hours",
    progress: 0,
    enrolled: false,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&q=80",
    category: "Backend",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "React Testing Library & Jest",
    platform: "Udemy",
    instructor: "Bonnie Schulkin",
    rating: 4.6,
    duration: "15 hours",
    progress: 0,
    enrolled: false,
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1080&q=80",
    category: "Testing",
    level: "Intermediate",
  },
  {
    id: 6,
    title: "Modern JavaScript From The Beginning",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.7,
    duration: "21 hours",
    progress: 100,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=1080&q=80",
    category: "Programming",
    level: "Beginner",
  },
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "enrolled" && course.enrolled) ||
      (filterStatus === "not-enrolled" && !course.enrolled);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const enrolledCount = coursesData.filter((c) => c.enrolled).length;
  const completedCount = coursesData.filter(
    (c) => c.enrolled && c.progress === 100,
  ).length;
  const inProgressCount = coursesData.filter(
    (c) => c.enrolled && c.progress > 0 && c.progress < 100,
  ).length;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          My Courses
        </h1>
        <p className="text-gray-400">Manage and track your learning journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-8">
        <Card className="border-white/[0.08] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Enrolled</p>
                <p className="text-2xl font-bold text-white">{enrolledCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <BarChart3 className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/[0.08] bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {completedCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Star className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/[0.08] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-white">
                  {inProgressCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/[0.05] border-white/[0.08] text-white placeholder:text-gray-500 focus:bg-white/[0.08] focus:border-indigo-500/50"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[180px] bg-white/[0.05] border-white/[0.08] text-white">
            <Filter size={16} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Programming">Programming</SelectItem>
            <SelectItem value="Testing">Testing</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] bg-white/[0.05] border-white/[0.08] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="enrolled">Enrolled</SelectItem>
            <SelectItem value="not-enrolled">Not Enrolled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="border-white/[0.08] bg-card/50 backdrop-blur-xl hover:shadow-xl hover:shadow-indigo-500/5 transition-all group overflow-hidden"
          >
            {/* Course Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60" />
              {course.enrolled && (
                <Badge className="absolute top-3 right-3 bg-indigo-500/90 text-white border-0">
                  Enrolled
                </Badge>
              )}
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/10 text-white border-0 backdrop-blur-sm">
                  {course.platform}
                </Badge>
              </div>
            </div>

            <CardContent className="p-5">
              {/* Title & Rating */}
              <div className="mb-3">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  {course.instructor}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <Badge className="text-xs bg-white/[0.05] text-gray-400 border-white/[0.08]">
                  {course.level}
                </Badge>
              </div>

              {/* Progress */}
              {course.enrolled && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-medium text-white">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              )}

              {/* Action Button */}
              {course.enrolled ? (
                course.progress === 100 ? (
                  <Button
                    variant="outline"
                    className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    <Star size={16} className="mr-2" />
                    Completed
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30">
                    <Play size={16} className="mr-2" />
                    Continue Learning
                  </Button>
                )
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-white/[0.08] text-gray-300 hover:bg-white/[0.05]"
                >
                  <ExternalLink size={16} className="mr-2" />
                  View Course
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No courses found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
