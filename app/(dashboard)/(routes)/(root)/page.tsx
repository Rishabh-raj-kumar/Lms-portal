'use client'

import { useAuth } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock } from "lucide-react"
import { useState, useEffect } from 'react'

import { CoursesList } from "@/components/courses-list"
import { InfoCard } from "./_components/info-card"

export default function Dashboard() {
  const { userId, isLoaded, isSignedIn, getToken, signOut } = useAuth()
  const router = useRouter()

  const [coursesData, setCoursesData] = useState(null)
  const [completedCourses, setCompletedCourses] = useState([])
  const [coursesInProgress, setCoursesInProgress] = useState([])

  const fetcher = async (url: any) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error)
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      const coursesUrl = `/api/courses?user_id=${userId}`
      fetcher(coursesUrl)
        .then((data) => {
          setCoursesData(data)
          setCompletedCourses(data.completedCourses)
          setCoursesInProgress(data.coursesInProgress)
        })
    }
  }, [isLoaded, isSignedIn, userId, getToken])

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  if (!userId) {
    return router.push("/")
  }

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