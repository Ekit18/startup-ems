import { useMemo, useEffect } from "react";
import { useEvent } from "./useEvent";
import { rafThrottle } from "../../../utils/rafThrottle";

export function useRafThrottle<Fn extends(...args: any[]) => any>(fn: Fn) {
    const memoizedFn = useEvent(fn);

    const throttledFn = useMemo(
      () =>
        rafThrottle((...args: Parameters<Fn>) => {
          memoizedFn(...args);
        }),
      []
    );

    useEffect(
      () => () => {
        throttledFn.cancel();
      },
      [throttledFn]
    );

    return throttledFn;
  }
