import { useMutation } from "convex/react";

import { useApiMutationHook } from "@/hooks/use-api-mutation";
import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";
import { mutation } from "~convex/_generated/server";

type RequestType = {
  value: string;
  messageId: Id<"messages">;
};

type ResponseType = Id<"reactions"> | null;

export const useToggleReaction = () => {
  const mutation = useMutation(api.reactions.toggle);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
