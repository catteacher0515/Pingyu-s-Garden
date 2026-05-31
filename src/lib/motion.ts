import type { TargetAndTransition, Transition } from 'framer-motion'

interface RouteTransitionConfig {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
  transition: Transition
}

export const routeTransition = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.995 },
  transition: { duration: 0.32, ease: 'easeOut' },
} satisfies RouteTransitionConfig

export const cardEntrance = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: (index: number): Transition => ({
    delay: index * 0.06,
    duration: 0.34,
    ease: 'easeOut',
  }),
}
