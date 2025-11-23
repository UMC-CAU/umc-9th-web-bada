import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  // 1. 상태 변수: throttledValue : 최종적으로 스로틀링 적용된 값 저장.
  // 초기값을 전달받은 value로 설정.
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. Ref lastExecuted : 마지막으로 실행된 시간을 기록하는 변수
  // useRef 사용하면 컴포넌트가 리렌더되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지 않아요.
  const lastExecuted = useRef<number>(Date.now());

  // 3. useEffect: value, delay가 변경될 때마다 로직 실행.
  useEffect(() => {
    // 현재 시간과 lastExecuted.current 저장된 마지막 시간 + delay를 비교합니다.
    // 충분한 시간이 지난 경우 바로 업데이트
    if (Date.now() >= lastExecuted.current + delay) {
      // 즉시 실행 가능한 경우, 현재 시각 업데이트
      lastExecuted.current = Date.now();

      // 최신 value를 throttledValue에 저장하고 컴포넌트 리렌더링
      setThrottledValue(value);
    } else {
      // 충분한 시간이 지나지 않은 경우, delay 시간 후에 업데이트 (최신 value로)
      const timerId: number = window.setTimeout(() => {
        // 타이머가 완료되면, 마지막 업데이트 시간을 현재 시각으로 갱신합니다.
        lastExecuted.current = Date.now();

        // 최신 value를 throttledValue에 저장하고 컴포넌트 리렌더링
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
