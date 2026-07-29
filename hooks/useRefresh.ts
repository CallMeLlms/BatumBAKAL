import { useState, useCallback } from "react";

export function useRefresh(fetchers: (() => Promise<void>)[]) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.allSettled(fetchers.map((f) => f()));
    setRefreshing(false);
  }, [fetchers]);

  return { refreshing, onRefresh };
}
