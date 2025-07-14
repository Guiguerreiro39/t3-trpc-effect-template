import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Effect, Schema } from "effect";
import { PostService } from "@/lib/services/post";
import { RuntimeServer } from "@/lib/runtime-server";
import { Result } from "@/lib/result";
import { withRetry } from "@/server/helpers/with-retry";

export const postRouter = Effect.gen(function* () {
  const postService = yield* PostService;

  return {
    create: publicProcedure
      .input(Schema.standardSchemaV1(Schema.Struct({ name: Schema.String })))
      .mutation(async ({ input }) => {
        return Effect.gen(function* () {
          const createPost = yield* postService.createPost;
          return createPost(input);
        }).pipe(
          Effect.match({
            onSuccess: Result.ok,
            onFailure: Result.error,
          }),
          RuntimeServer.runPromise
        );
      }),

    getLatest: publicProcedure.query(() => {
      return postService.getLatestPost.pipe(
        withRetry,
        Effect.match({
          onSuccess: Result.ok,
          onFailure: Result.error,
        }),
        RuntimeServer.runPromise
      );
    }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
