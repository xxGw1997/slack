import { useState, useMemo, useCallback } from "react";
import { useMutation } from "convex/react";

// 公共的类型定义
type Options<ResponseType> = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

type Status = "success" | "error" | "settled" | "pending" | null;

// 封装的 useMutationHook
export const useApiMutationHook = <RequestType, ResponseType>(
  mutationFn: (values: RequestType) => Promise<ResponseType>
) => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Status>(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutate = useCallback(
    async (values: RequestType, options?: Options<ResponseType>) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutationFn(values);
        setStatus("success");
        options?.onSuccess?.(response);
        setData(response);
        return response;
      } catch (error) {
        setError(error as Error);
        setStatus("error");
        options?.onError?.(error as Error);
        if (options?.throwError) throw error;
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutationFn]
  );

  return { mutate, data, error, isSuccess, isError, isPending, isSettled };
};
