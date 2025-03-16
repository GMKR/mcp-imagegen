# MCP Image Generator

A Model Context Protocol (MCP) server for generating images using Together AI's image generation models. This MCP Server can be run locally or using an SSE endpoint. 
The MCP Image Generator required a provider, only "Replicate" and "Together" are supported currently. You need to set the `TOGETHER_API_KEY` or `REPLICATE_API_TOKEN` environment variables. and set the `PROVIDER` environment variable to "replicate" or "together"/

## SSE Endpoint (Docker environment)

### Clone the repository

```bash
git clone https://github.com/gmkr/mcp-imagegen.git
cd mcp-imagegen
```

### Build and run Docker container

```bash
docker build -f Dockerfile.server -t mcp-imagegen .
docker run -p 3000:3000 mcp-imagegen
```

### Configuring with MCP Client
```
{
  "mcpServers": {
    "imagegenerator": {
      "url": "http://localhost:3000/sse",
      "env": {
        "PROVIDER": "replicate",
        "REPLICATE_API_TOKEN": "your-replicate-api-token"
      }
    }
  }
}
```
Adjust the `url` to the endpoint of the MCP server you want to use.  `provider` can be "replicate" or "together".

## Running locally using stdio

### Prerequisites

- Node.js
- Together AI API key or Replicate API token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gmkr/mcp-imagegen.git
   cd mcp-imagegen
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
### Configuration
Create a configuration file for your MCP client. Here's an example configuration:

```json
{
  "mcpServers": {
    "imagegenerator": {
      "command": "pnpx",
      "args": [
        "-y",
        "tsx",
        "/path/to/mcp-imagegen/src/index.ts"
      ],
      "env": {
        "PROVIDER": "replicate",
        "REPLICATE_API_TOKEN": "your-replicate-api-token"
      }
    }
  }
}
```

Replace `/path/to/mcp-imagegen` with the absolute path to your cloned repository and `your-replicate-api-token` with your actual Replicate API token.

## Usage

The MCP Image Generator provides a tool called `generate_image` that can be used to generate images based on text prompts.

### Tool: generate_image

Generates an image based on the provided prompt.

**Parameters:**
- `prompt` (string): The text prompt to generate an image for
- `width` (number, optional): The width of the image to generate (default: 512)
- `height` (number, optional): The height of the image to generate (default: 512)
- `numberOfImages` (number, optional): The number of images to generate (default: 1)

## Environment Variables
- `PROVIDER`: The provider to use for image generation (default: "replicate")
- `REPLICATE_API_TOKEN`: Your Replicate API token
- `TOGETHER_API_KEY`: Your Together AI API key
- `MODEL_NAME`: The model to use for image generation (default: "black-forest-labs/flux-schnell")

## License

MIT 
