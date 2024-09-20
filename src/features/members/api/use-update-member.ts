import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = {
  id: Id<"members">;
  role: "admin" | "member";
};

type ResponseType = Id<"members"> | null;

export const useUpdateMember = () => {
  const mutation = useMutation(api.members.update);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
