import { Id } from "~convex/_generated/dataModel";
import { AlertTriangle, Loader, XIcon } from "lucide-react";

import { useGetMember } from "@/features/members/api/use-get-member";

import { Button } from "@/components/ui/button";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
  const { data: member, isLoading: isLoadingMember } = useGetMember({
    memberId,
  });

  const ThreadContent = () => {
    if (isLoadingMember) {
      return (
        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      );
    } else if (!member) {
      return (
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm to-muted-foreground">Profile not found</p>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-[49px] flex justify-between items-center px-4 border-b">
        <p className="text-lg font-bold">Profile</p>
        <Button onClick={onClose} size="iconSm" variant="ghost">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <ThreadContent />
    </div>
  );
};
