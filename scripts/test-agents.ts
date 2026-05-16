import { MonitorAgent } from '../lib/agents/monitor'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function test() {
  const monitor = new MonitorAgent()
  console.log("--- STARTING MULTI-AGENT TEST ---")
  const result = await monitor.run("A premium dark-themed portfolio for a creative director in Tokyo.", "testuser")
  
  if (result.success) {
    console.log("SUCCESS!")
    console.log("Thoughts:", JSON.stringify(result.thoughts, null, 2))
    console.log("Components Count:", result.components.length)
  } else {
    console.error("FAILURE:", result.error)
  }
}

test()
