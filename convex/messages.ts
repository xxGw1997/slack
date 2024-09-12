import { v } from "convex/values";

import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const getMember = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
  userId: Id<"users">
) => {
  return await ctx.db
    .query("members")
    .withIndex("by_workspace_id_user_id", (q) =>
      q.eq("workspaceId", workspaceId).eq("userId", userId)
    )
    .unique();
};

export const create = mutation({
  args: {
    body: v.string(),
    image: v.optional(v.id("_storage")),
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    parentMessageId: v.optional(v.id("messages")),
    // TODO: Add Conversation ID
  },
  handler: async (ctx, args) => {
    const { body, image, workspaceId, channelId, parentMessageId } = args;

    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await getMember(ctx, workspaceId, userId);

    if (!member) throw new Error("Unauthorized");

    // TODO: Handle conversationId

    const messageId = await ctx.db.insert("messages", {
      body,
      image,
      memberId: member._id,
      workspaceId,
      channelId,
      parentMessageId,
      updatedAt: Date.now(),
    });

    return messageId;
  },
});
