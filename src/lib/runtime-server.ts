import { PostService } from "@/lib/services/post";
import { Layer, ManagedRuntime } from "effect";

const MainLayer = Layer.mergeAll(PostService.Default);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
