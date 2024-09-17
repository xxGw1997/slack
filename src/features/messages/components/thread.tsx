import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AlertTriangle, Loader, XIcon } from "lucide-react";
import { toast } from "sonner";
import Quill from "quill";

import { Id } from "~convex/_generated/dataModel";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMessage } from "@/features/messages/api/use-get-message";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/message";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ThreadProps {
  messageId: Id<"messages">;
  onClose: () => void;
}

type CreateMessageValues = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  parentMessageId: Id<"messages">;
  body: string;
  image?: Id<"_storage"> | undefined;
};

export const Thread = ({ messageId, onClose }: ThreadProps) => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const { data: currentMember } = useCurrentMember({
    workspaceId,
  });
  const { data: message, isLoading: loadingMessage } = useGetMessage({
    id: messageId,
  });
  const { mutate: createMessage } = useCreateMessage();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef.current?.enable(false);
      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        parentMessageId: messageId,
        body,
        image: undefined,
      };

      if (image) {
        const url = await generateUploadUrl({}, { throwError: true });

        if (!url) throw new Error("Failed to generate upload URL");

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!result.ok) throw new Error("Failed to upload image");

        const { storageId } = await result.json();

        values.image = storageId;
      }

      await createMessage(values, { throwError: true });
      setEditorKey((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      editorRef.current?.enable(true);
    }
  };

  const ThreadContent = () => {
    if (loadingMessage) {
      return (
        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      );
    } else if (!message) {
      return (
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm to-muted-foreground">Message not found</p>
        </div>
      );
    } else {
      return (
        <>
          <div>
            <Message
              hideThreadButton
              memberId={message.memberId}
              authorImage={message.user.image}
              authorName={message.user.name}
              isAuthor={message.memberId === currentMember?._id}
              body={message.body}
              image={message.image}
              createdAt={message._creationTime}
              updatedAt={message.updatedAt}
              id={message._id}
              reactions={message.reactions}
              isEditing={editingId === message._id}
              setEditingId={setEditingId}
            />
          </div>
          <div className="px-4">
            <Editor
              key={editorKey}
              onSubmit={handleSubmit}
              disabled={isPending}
              innerRef={editorRef}
              placeholder="Reply..."
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-[49px] flex justify-between items-center px-4 border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onClose} size="iconSm" variant="ghost">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <ThreadContent />
    </div>
  );
};
