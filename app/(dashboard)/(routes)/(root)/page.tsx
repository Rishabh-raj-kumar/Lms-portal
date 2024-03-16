'use client'

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
// import { useRouter } from "next/router";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useState,useEffect } from "react";

export default async function Dashboard() {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [coursesInProgress, setCoursesInProgress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await auth();
        if (!userId) {
          redirect("/");
          return;
        }

        const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
        setCompletedCourses(completedCourses);
        setCoursesInProgress(coursesInProgress);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}