import { useMutation } from "convex/react";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

import { api } from "~convex/_generated/api";

type ResponseType = string | null;

export const useGenerateUploadUrl = () => {
  const mutation = useMutation(api.upload.generateUploadUrl);

  return useApiMutationHook<any, ResponseType>(mutation);
};
