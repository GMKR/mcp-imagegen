import { z } from 'zod'
import { useImageProvider } from './providers'

export const InputSchema = {
  prompt: z.string().describe("The prompt to generate an image for"),
  width: z.coerce.number().describe("The width of the image to generate").optional(),
  height: z.coerce.number().describe("The height of the image to generate").optional(),
  numberOfImages: z.coerce.number().describe("The number of images to generate").optional(),
}

export const handler = async (prompt: string, params: Record<string, any>) => {
  const provider = process.env.PROVIDER || "replicate"
  const { generateImage } = await useImageProvider(provider)
  const generatedImages = await generateImage(prompt, {
    ...params,
    n: params.numberOfImages || undefined,
  })
  if (!generatedImages || generatedImages.length === 0) {
    throw new Error(`No image returned from ${provider}`)
  }
  return generatedImages
}
