import { useReplicate } from "./replicate"
import { useTogether } from "./together"


export const useImageProvider = (provider: string) => {

  switch (provider) {
    case "together":
      return useTogether()
    case "replicate":
      return useReplicate()
    default:
      throw new Error(`Provider ${provider} not supported`)
  }
}
