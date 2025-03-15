import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { handler, InputSchema } from "./utils";

const app = express();

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

let transport: SSEServerTransport | null = null;


app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(process.env.PORT || 3000);
