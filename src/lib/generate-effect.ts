import { Result } from "@/lib/result";
import type {
  UseSuspenseQueryResult,
  UseMutationResult,
  UseQueryResult,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { Effect } from "effect";

export const effectFromResult = <Ok, Err>(result: Result<Ok, Err>) =>
  Effect.succeed(result).pipe(
    Effect.flatMap(
      Result.match({
        onOk: Effect.succeed,
        onError: Effect.fail,
      })
    )
  );

export function effectFromQuery<Ok, Err, TRPCError>(
  query: UseQueryResult<Result<Ok, Err>, TRPCError>
) {
  return {
    ...query,
    data: query.data && effectFromResult(query.data),
  };
}

export function effectFromMutation<Ok, Err, TRPCError, T1, T2>(
  mutation: UseMutationResult<Result<Ok, Err>, TRPCError, T1, T2>
) {
  return {
    ...mutation,
    data: mutation.data && effectFromResult(mutation.data),
  };
}

export function effectFromSuspenseQuery<Ok, Err, TRPCError>(
  suspenseQuery: [
    Result<Ok, Err>,
    UseSuspenseQueryResult<Result<Ok, Err>, TRPCError>
  ]
) {
  return [
    effectFromResult(suspenseQuery[0]),
    {
      ...suspenseQuery[1],
      data: suspenseQuery[1].data && effectFromResult(suspenseQuery[1].data),
    },
  ] as const;
}
