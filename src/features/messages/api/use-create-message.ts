import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = {
  body: string;
  workspaceId: Id<"workspaces">;
  channelId?: Id<"channels">;
  image?: Id<"_storage">;
  parentMessageId?: Id<"messages">;
  // TODO: Add conversationId
};

type ResponseType = Id<"messages"> | null;

export const useCreateMessage = () => {
  const mutation = useMutation(api.messages.create);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
