import { Variants } from 'framer-motion'

export const imageVariant: Variants = {
  hidden: {
    y: 10,
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
}
export const slideDown: Variants = {
  hidden: {
    y: -80,
    opacity: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}
export const slideUp: Variants = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}
