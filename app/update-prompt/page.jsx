"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"


const EditPrompt = () => {
  const router = useRouter()
  // to get id from url
  const searchParams = useSearchParams()
  // assign 'id' from url
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false) 
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()

        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
    }

    if(promptId) getPromptDetails()

  }, [promptId])

  const updatePrompt = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert('Prompt ID not found')

    try {
      // here I call the API I'll going to create
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt