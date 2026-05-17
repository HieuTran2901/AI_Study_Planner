import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Star, Clock, BarChart3, Play } from "lucide-react";
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

import { useLearningPath } from "@/hooks";
import { mapAIToCourse } from "./components/CoursesMapper";
import type { Course } from "@/types/Entity";
import CheckInstructor from "./components/CheckInstructor";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const { learningPath, getLearningPath } = useLearningPath();

  const coursesData: Course[] = useMemo(() => {
    if (!learningPath) return [];
    return mapAIToCourse(learningPath);
  }, [learningPath]);

  useEffect(() => {
    getLearningPath();
  }, [getLearningPath]);

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
                src={course.imageUrl}
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
                <CheckInstructor course={course} />
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
