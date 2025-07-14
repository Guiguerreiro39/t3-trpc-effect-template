import { Schema } from "effect";

export class Post extends Schema.Class<Post>("Post")({
  id: Schema.Number,
  name: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}
