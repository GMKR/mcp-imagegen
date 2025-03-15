import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { useTogether } from "./providers/together";
import { z } from 'zod'

const server = new McpServer({
  name: "Image Generator",
  version: "1.0.0",
})

server.tool(
  "generate_image",
  "Generates and returns an image based on the provided prompt" +
  "Use this tool when you need to generate an image based on a prompt" +
  "The image will be returned as a base64 encoded string",
  {
    prompt: z.string().describe("The prompt to generate an image for"),
    width: z.number().describe("The width of the image to generate"),
    height: z.number().describe("The height of the image to generate"),
    numberOfImages: z.number().describe("The number of images to generate").default(1),
  },
  async (args) => {
    try {
      const { generateImage } = useTogether(process.env.TOGETHER_API_KEY!)
      const { prompt, ...rest } = args as any;
      const generatedImages = await generateImage(prompt as string, {
        ...rest,
        n: args.numberOfImages,
      })
      if (!generatedImages || generatedImages.length === 0) {
        throw new Error("No image returned from Together")
      }
      return {
        content: generatedImages.map((pc) => {
          return {
            type: "image",
            data: pc.b64_json!,
            mimeType: 'image/png',
          }
        }),
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
