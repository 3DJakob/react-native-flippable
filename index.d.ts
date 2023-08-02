import React from 'react'

interface API {
  /**
   * Programmatically trigger a flip to the left
   */
  flipLeft: () => void
  /**
   * Programmatically trigger a flip to the right
   */
  flipRight: () => void
}

interface Props {
  ref?: React.Ref<API>

  /**
   * The children to be flipped. The first child will be the front, the second child will be the back.
   */
  children: React.ReactNode[]
  /**
   * If the card should be flipped if the user taps on it.
   */
  flipOnTap?: boolean
}

declare const Flippable: React.FC<Props>

export = Flippable