import { Together } from "together-ai";

export const useTogether = () => {
  const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY!,
  });

  async function generateImage(prompt: string, params?: Record<string, string | number>) {
    const model = process.env.MODEL_NAME || "black-forest-labs/FLUX.1-schnell-Free"
    const response = await together.images.create({
      ...params,
      prompt,
      model,
      response_format: "base64",
    });

    return response.data.map((pc) => {
      return {
        type: "image",
        data: pc.b64_json!,
        mimeType: 'image/jpeg',
      }
    }).filter((pc) => pc.data !== null && pc.data !== undefined)
  }

  return {
    generateImage,
  }
}
