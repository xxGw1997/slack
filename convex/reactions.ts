import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { getMember } from "./messages";
import { getAuthUserId } from "@convex-dev/auth/server";

export const toggle = mutation({
  args: { messageId: v.id("messages"), value: v.string() },
  handler: async (ctx, { messageId, value }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const message = await ctx.db.get(messageId);

    if (!message) throw new Error("Message not found");

    const member = await getMember(ctx, message.workspaceId, userId);

    if (!member) throw new Error("Unauthorized");

    const exsitingMessageReactionFromUser = await ctx.db
      .query("reactions")
      .filter((q) =>
        q.and(
          q.eq(q.field("messageId"), messageId),
          q.eq(q.field("memberId"), member._id),
          q.eq(q.field("value"), value)
        )
      )
      .first();

    if (exsitingMessageReactionFromUser) {
      await ctx.db.delete(exsitingMessageReactionFromUser._id);

      return exsitingMessageReactionFromUser._id;
    } else {
      const newReactionId = await ctx.db.insert("reactions", {
        value,
        messageId,
        memberId: member._id,
        workspaceId: message.workspaceId,
      });
      return newReactionId;
    }
  },
});
