"use client"

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPost] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  /** I need to call the API to GET the posts list */
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPost(data)
    }
    fetchPost()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

    <PromptCardList
      data={posts}
      handleTagClick={() => {}}
      searchText={searchText}
    />

    </section>
  )
}

export default Feed