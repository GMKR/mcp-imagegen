import { z } from 'zod'
import { useTogether } from './providers/together'

export const InputSchema = {
  prompt: z.string().describe("The prompt to generate an image for"),
  width: z.coerce.number().describe("The width of the image to generate"),
  height: z.coerce.number().describe("The height of the image to generate"),
  numberOfImages: z.coerce.number().describe("The number of images to generate").default(1),
}

export const handler = async (prompt: string, params: Record<string, any>) => {
  const { generateImage } = useTogether(process.env.TOGETHER_API_KEY!)
  const generatedImages = await generateImage(prompt, {
    ...params,
    n: params.numberOfImages || undefined,
  })
  if (!generatedImages || generatedImages.length === 0) {
    throw new Error("No image returned from Together")
  }
  return generatedImages.map((pc) => {
    return {
      type: "image",
      data: pc.b64_json!,
      mimeType: 'image/jpeg',
    }
  })
}
