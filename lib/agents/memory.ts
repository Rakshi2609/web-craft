import { BaseAgent } from './base'
import Conversation from '@/models/Conversation'
import { AgentResponse } from '../types/agents'

export class MemoryAgent extends BaseAgent {
  async getContext(userId: string): Promise<AgentResponse<string>> {
    try {
      // Get the last 3 conversations for context
      const history = await Conversation.find({ userId } as any)
        .sort({ createdAt: -1 })
        .limit(3)

      if (!history || history.length === 0) {
        return { success: true, content: "", thoughts: "No prior history found." }
      }

      const context = history.map(conv => {
        return `User Prompt: ${conv.prompt}\nAssistant Thoughts: ${JSON.stringify(conv.thoughts.map(t => t.content).join('; '))}`
      }).join('\n---\n')

      return {
        success: true,
        content: context,
        thoughts: `Retrieved ${history.length} recent interactions for context.`
      }
    } catch (e: any) {
      return { success: false, content: "", thoughts: "Error fetching history.", error: e.message }
    }
  }

  async save(userId: string, prompt: string, response: any, thoughts: { agent: string, content: string }[]) {
    await Conversation.create({
      userId,
      prompt,
      response,
      thoughts
    })
  }
}
