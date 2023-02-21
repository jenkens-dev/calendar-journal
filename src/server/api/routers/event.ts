import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  postEvent: protectedProcedure
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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.event.findMany({
        // update to use select and return only specific data?
        where: { userId: ctx.session.user.id },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
});
