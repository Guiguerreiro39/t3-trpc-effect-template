import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Effect, Schema } from "effect";
import { PostService } from "@/features/post/service";
import { RuntimeServer } from "@/lib/runtime-server";
import { TRPCError } from "@trpc/server";
import { notReachable } from "@/lib/utils";
import { PostInputs } from "@/features/post/schema";

export const postRouter = Effect.gen(function* () {
  const postService = yield* PostService;

  return {
    create: publicProcedure
      .input(Schema.standardSchemaV1(PostInputs.create))
      .mutation(async ({ input }) => {
        return Effect.gen(function* () {
          const createPost = yield* postService.createPost;
          return createPost(input);
        }).pipe(RuntimeServer.runPromise);
      }),

    getLatest: publicProcedure.query(() => {
      return Effect.gen(function* () {
        return yield* postService.getLatestPost;
      }).pipe(
        Effect.match({
          onFailure: (error) => {
            switch (error._tag) {
              case "PostNotFound":
                throw new TRPCError({
                  code: "NOT_FOUND",
                  message: "Post not found",
                });
              default:
                return notReachable(error._tag);
            }
          },
          onSuccess: (value) => value,
        }),
        RuntimeServer.runPromise
      );
    }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
