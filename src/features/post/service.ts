import { Effect } from "effect";
import { Post, PostNotFound } from "./schema";

const posts: (typeof Post.Encoded)[] = [
  {
    id: 1,
    name: "Post 1",
  },
  {
    id: 2,
    name: "Post 2",
  },
];

export class PostService extends Effect.Service<PostService>()("PostService", {
  effect: Effect.gen(function* () {
    return {
      getPosts: Effect.gen(function* () {
        return posts;
      }),
      getLatestPost: Effect.gen(function* () {
        const post = posts.at(-1);

        if (!post) {
          return yield* Effect.fail(new PostNotFound());
        }

        return post;
      }),
      createPost: Effect.gen(function* () {
        return ({ name }: { name: string }) => {
          const post = { id: posts.length + 1, name };
          posts.push(post);
          return post;
        };
      }),
    };
  }),
}) {}
