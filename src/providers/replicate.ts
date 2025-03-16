import Replicate, { FileOutput } from "replicate";


export const useReplicate = async () => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
    useFileOutput: true,
  });

  async function generateImage(prompt: string, params?: Record<string, string | number>) {
    const model = process.env.MODEL_NAME || "black-forest-labs/flux-schnell"
    const output = await replicate.run(model as `${string}/${string}`, {
      input: {
        ...params,
        prompt,
        num_outputs: params?.numberOfImages,
      },
    })
    const generatedImages = output as FileOutput[]
    const outputArray: { type: string, data: string, mimeType: string }[] = []
    for (const pc of generatedImages) {
      const fileBlob = await pc.blob()
      const base64 = Buffer.from(await fileBlob.arrayBuffer()).toString('base64')
      outputArray.push({
        type: "image",
        data: base64,
        mimeType: 'image/jpeg',
      })
    }
    return outputArray
  }

  return {
    generateImage,
  }
};

