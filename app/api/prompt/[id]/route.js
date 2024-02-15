// GET (read)
import { connectToDB } from "@utils/database"  
import Prompt from "@models/prompt"

export const GET = async (request, {params}) => {
  try {
    await connectToDB()
    /** Find through all the posts and let us know who is the creator */
    const prompt = await Prompt.findById(params.id).populate('creator')
    
    if(!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
      
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}

// PATH (update)
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json()

    try {
        await connectToDB()
        
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response('Prompt not found', { status: 404 })

        // update of prompt and tag with the new values
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        // save new values
        await existingPrompt.save()
        
        return new Response(JSON.stringify(existingPrompt), { status: 200 })

    } catch (error) {
        return new Response('Failed to update prompt', { status: 500 })
    }
}


// DELETE (delete)
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB()
        // find and remove the prompt with id passed
        await Prompt.findByIdAndRemove(params.id)
        return new Response('Prompt deleted successfully', { status: 200 })
    } catch (error) {
        return new Response('Failed to delete prompt', { status: 500 })
    }
}