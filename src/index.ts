import { useMemo } from 'react';
import useSWRImmutable, {
  SWRConfiguration,
  SWRResponse,
  Key,
  mutate,
} from 'swr';

type StateFetcher<T> = () => T | Promise<T>;

const mutateState = <T>(
  key: Key,
  data?: T,
  shouldRevalidate: boolean = false
): Promise<T | undefined> => {
  return mutate<T>(key, data, shouldRevalidate);
};

function createSWRState<T>(
  key: Key,
  fetcher: StateFetcher<T> | null,
  config?: SWRConfiguration<T>
): SWRResponse<T, any> {
  return useSWRImmutable<T>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...config,
  });
}

export { mutateState, createSWRState };
