import { useLayoutEffect, useRef, type MouseEvent, type PointerEvent, type RefObject } from 'react';

const CONTROL_SELECTOR = 'button, input, select, textarea, a, summary, [role="button"], [role="slider"], [role="switch"], [contenteditable="true"]';

// Keep finished, non-filling CSS animations too: getAnimations() omits them after completion.
export function useDemoReplay(stageRef: RefObject<HTMLDivElement>, enabled: boolean, techniqueId: string) {
  const animations = useRef(new Set<CSSAnimation>());
  const content = () => enabled ? stageRef.current?.lastElementChild : null;

  const collect = () => {
    const root = content();
    if (!root?.getAnimations) return;
    const live = root.getAnimations({ subtree: true }).filter((animation): animation is CSSAnimation => 'animationName' in animation);
    const retained = [...animations.current].filter(animation => {
      const effect = animation.effect as KeyframeEffect | null;
      const target = effect?.target;
      if (!target || !root.contains(target)) return false;
      // A keyed replay can replace an animation on the same element. Keep its latest instance.
      return !live.some(current => current !== animation && current.animationName === animation.animationName &&
        (current.effect as KeyframeEffect | null)?.target === target &&
        (current.effect as KeyframeEffect | null)?.pseudoElement === effect.pseudoElement);
    });
    animations.current = new Set([...retained, ...live]);
  };

  useLayoutEffect(() => {
    animations.current.clear();
    collect();
    return () => animations.current.clear();
  }, [enabled, techniqueId]);

  const replay = (target: EventTarget) => {
    const root = content();
    if (!root?.contains(target as Node) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    collect();
    for (const animation of animations.current) {
      const effect = animation.effect as KeyframeEffect;
      const target = effect.target!;
      const style = getComputedStyle(target, effect.pseudoElement);
      const names = style.animationName.split(',').map(name => name.trim());
      const index = names.indexOf(animation.animationName);
      const states = style.animationPlayState.split(',').map(state => state.trim());
      if (animation.playState === 'paused' || index < 0 || states[index % states.length] === 'paused') continue;
      // Seeking a CSS animation restarts it without play(), which would override later CSS pauses.
      animation.currentTime = 0;
    }
  };

  return {
    onAnimationStartCapture: collect,
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'touch') replay(event.target);
    },
    onClick: (event: MouseEvent<HTMLDivElement>) => {
      // Let the demo's own controls handle toggles, range values, and dedicated replay buttons.
      if (!(event.target as Element).closest?.(CONTROL_SELECTOR)) replay(event.target);
    },
  };
}
