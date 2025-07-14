import { Effect, Layer, ManagedRuntime } from "effect";

const MainLayer = Layer.empty;

export const RuntimeClient = ManagedRuntime.make(MainLayer);

export const ClientMatch = <Ok, Err, ResultFailure, ResultSuccess>(
  effect: Effect.Effect<Ok, Err, never>,
  match: {
    readonly onFailure: (error: Err) => ResultFailure;
    readonly onSuccess: (value: Ok) => ResultSuccess;
  }
) => RuntimeClient.runSync(Effect.match(effect, match));
