"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
	/** To get the user session */
	const {data: session} = useSession()
  const router = useRouter()
	const [posts, setPosts] = useState([])

	/** API to GET posts from a specific user */
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }
		if(session?.user.id) fetchPost()
		
  }, [])

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async (post) => {}

  return (
    <Profile 
      name="My Profile"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile