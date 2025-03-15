# MCP Image Generator

A Model Context Protocol (MCP) server for generating images using Together AI's image generation models.

## Prerequisites

- Node.js
- Together AI API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gmkr/mcp-imagegen.git
   cd mcp-imagegen
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Configuration

The MCP Image Generator requires a Together AI API key. You can get one by signing up at [Together AI](https://www.together.ai/).

Create a configuration file for your MCP client. Here's an example configuration:

```json
{
  "mcpServers": {
    "image-generator": {
      "command": "pnpx",
      "args": [
        "-y",
        "tsx",
        "/path/to/mcp-imagegen/src/index.ts"
      ],
      "env": {
        "TOGETHER_API_KEY": "your-together-api-key"
      }
    }
  }
}
```

Replace `/path/to/mcp-imagegen` with the absolute path to your cloned repository and `your-together-api-key` with your actual Together AI API key.

## Usage

The MCP Image Generator provides a tool called `generate_image` that can be used to generate images based on text prompts.

### Tool: generate_image

Generates an image based on the provided prompt.

**Parameters:**
- `prompt` (string): The text prompt to generate an image for
- `width` (number, optional): The width of the image to generate (default: 512)
- `height` (number, optional): The height of the image to generate (default: 512)

## Environment Variables

- `TOGETHER_API_KEY`: Your Together AI API key
- `TOGETHER_MODEL` (optional): The Together AI model to use for image generation (default: "black-forest-labs/FLUX.1-schnell-Free")

## License

MIT 
