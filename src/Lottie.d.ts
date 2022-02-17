declare module 'react-lottie-player' {
  import React from 'react'

  interface LottieProps {
    animationData?: unknown
    path?: string
    play?: boolean
    goTo?: number
    speed?: number
    direction?: number
    loop?: number | boolea
    segments?: number[] | boolean
    rendererSettings?: unknown
    renderer?: string
    audioFactory?: unknown
    onComplete?: () => void
    onLoopComplete?: () => void
    onEnterFrame?: () => void
    onSegmentStart?: () => void
    style?: React.CSSProperties
  }

  export default class Lottie extends React.Component<LottieProps> {}
}
