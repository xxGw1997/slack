import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = {
  id: Id<"members">;
};

type ResponseType = Id<"members"> | null;

export const useRemoveMember = () => {
  const mutation = useMutation(api.members.remove);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
