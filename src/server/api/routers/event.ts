import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  postEvent: publicProcedure
    .input(
      z.object({
        title: z.string(),
        completed: z.boolean(),
        userId: z.string(),
        isRecurring: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.event.create({
          data: {
            title: input.title,
            completed: input.completed,
            userId: input.userId,
            isRecurring: input.isRecurring,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
