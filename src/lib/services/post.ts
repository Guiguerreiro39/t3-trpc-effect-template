import { Effect } from "effect";
import { Post } from "@/lib/schemas/post";

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
      getPosts: Effect.succeed(posts),
      getLatestPost: Effect.succeed(posts.at(-1)),
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
