import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = {
  workspaceId: Id<"workspaces">;
  memberId: Id<"members">;
};

type ResponseType = Id<"conversations"> | null;

export const useCreateOrGetConversation = () => {
  const mutation = useMutation(api.conversations.createOrGet);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
