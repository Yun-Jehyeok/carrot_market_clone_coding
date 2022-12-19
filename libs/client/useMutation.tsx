import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {})) // res를 json 형식으로 바꿔서
      .then((data) => setState((prev) => ({ ...prev, data }))) // setData
      .catch((error) => setState((prev) => ({ ...prev, error }))) // 에러는 setError
      .finally(() => setState((prev) => ({ ...prev, loading: false }))); // 끝나면 로딩 종료
  }

  return [mutation, { ...state }];
}
