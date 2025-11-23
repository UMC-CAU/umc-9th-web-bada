import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // value, delay가 변경될 때마다 실행
  useEffect(() => {
    // delay(ms) 후에 실행합니다.
    // delay 시간 후에 value로 debouncedValue를 업데이트하는 타이머를 시작합니다.
    const handler: number = setTimeout(() => setDebouncedValue(value), delay);

    // value가 변경되면, 기존 타이머를 취소해서 업데이트를 취소합니다.
    // 값이 계속 바뀌고 그 때마다 마지막만 업데이트 됩니다.
    return () => clearTimeout(handler);
  }, [value, delay]);

  // 최종적으로 '잠시 기다린 후'의 값을 반환합니다.
  return debouncedValue;
}

export default useDebounce;
