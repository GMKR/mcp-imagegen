import { Together } from "together-ai";
import { ImageCreateParams } from "together-ai/src/resources/images.js";

export const useTogether = (apiKey: string) => {
  const together = new Together({
    apiKey,
  });

  async function generateImage(prompt: string, params?: Partial<Omit<ImageCreateParams, "prompt">>) {
    const response = await together.images.create({
      model: process.env.TOGETHER_MODEL || "black-forest-labs/FLUX.1-schnell-Free",
      width: 512,
      height: 512,
      n: 1,
      response_format: "base64",
      ...params,
      prompt,
    });

    return response.data
  }

  return {
    client: together,
    generateImage,
  }
}
