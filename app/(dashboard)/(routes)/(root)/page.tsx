import { auth } from "@clerk/nextjs"
// import { useRouter,redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useEffect } from "react";

export default async function Dashboard() {
  const { userId } = auth();
  const router = useRouter()

  if (!userId) {
    router.push("/"); // Using useRouter for redirect
    return null; // Add a return statement here to prevent further execution of the function
  }


  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

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