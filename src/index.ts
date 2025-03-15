import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handler, InputSchema } from "./utils";

const server = new McpServer({
  name: "Image Generator",
  version: "1.0.0",
})

server.tool(
  "generate_image",
  "Generates and returns an image based on the provided prompt" +
  "Use this tool when you need to generate an image based on a prompt" +
  "The image will be returned as a base64 encoded string",
  InputSchema,
  async (args) => {
    try {
      const content = await handler(args.prompt, args)
      return {
        content,
        isError: false,
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      }
    }
  }
)

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport)
  console.error("Image Generator MCP server is running on stdio")
}


runServer().catch((error) => {
  console.error("Error running server", error)
  process.exit(1)
})
