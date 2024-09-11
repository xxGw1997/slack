import { useApiMutationHook } from "@/hooks/use-api-mutation";
import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

type RequestType = {
  id: Id<"channels">;
  name: string;
};
type ResponseType = Id<"channels"> | null;

export const useUpdateChannel = () => {
  const mutation = useMutation(api.channels.update);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
