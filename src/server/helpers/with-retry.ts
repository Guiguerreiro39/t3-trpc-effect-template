import { Effect, Schedule } from "effect";

type RetryOptions = {
  times?: number;
  delay?: `${number} ${"millis" | "seconds" | "minutes"}`;
  retryOn?: (error: unknown) => boolean;
};

/**
 * Adds retry logic to an Effect program.
 */
export const withRetry = <R, E, A>(
  effect: Effect.Effect<R, E, A>,
  options: RetryOptions = {}
): Effect.Effect<R, E, A> => {
  const { times = 3, delay = "500 millis", retryOn = () => true } = options;

  const baseSchedule = Schedule.addDelay(Schedule.recurs(times), () => delay);

  return effect.pipe(Effect.retry(baseSchedule));
};
