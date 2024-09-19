import { Loader } from "lucide-react";

import { useGetMember } from "@/features/members/api/use-get-member";
import { useMemberId } from "@/hooks/use-member-id";

import { useGetMessages } from "@/features/messages/api/use-get-messages";

import { Id } from "~convex/_generated/dataModel";

import { Header } from "./header";

interface ConversationProps {
  id: Id<"conversations">;
}

export const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId();

  const { data: member, isLoading: memberLoading } = useGetMember({ memberId });
  const { results, status, loadMore } = useGetMessages({
    conversationId: id,
  });

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => {}}
      />
    </div>
  );
};
