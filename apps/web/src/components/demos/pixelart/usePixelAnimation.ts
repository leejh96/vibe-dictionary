import { useEffect, useRef, useState, type RefObject } from 'react';
import { useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';

/**
 * 픽셀아트 데모 전용 애니메이션 훅.
 * - useDemoAutoplayRunning으로 prefers-reduced-motion 및 document.hidden 감지 재사용
 * - IntersectionObserver로 실제 뷰포트 가시성 확인
 * - unmount 시 즉시 clearInterval 정리
 * - Node.js SSR 및 테스트 환경 안전 가드 포함
 */
export function usePixelAnimation(
  onTick: () => void,
  intervalMs: number | null,
  containerRef: RefObject<HTMLElement | null>
) {
  const [isVisible, setIsVisible] = useState(true);
  const isAllowed = useDemoAutoplayRunning();
  const tickRef = useRef(onTick);
  tickRef.current = onTick;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries.some((e) => e.isIntersecting));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const canRun = isAllowed && isVisible && intervalMs !== null && intervalMs > 0;

  useEffect(() => {
    if (!canRun || intervalMs === null) return;
    const timer = setInterval(() => {
      tickRef.current();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [canRun, intervalMs]);
}
