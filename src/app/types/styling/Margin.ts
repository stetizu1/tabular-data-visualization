/**
 * Class for defining margin for the view.
 * Important especially for the user to be able to reveal axis labels, but also for aesthetic reasons.
 */
export class Margin {
  readonly width: number
  readonly height: number
  constructor(readonly top: number, readonly right: number, readonly bottom: number, readonly left: number) {
    this.width = this.right + this.left
    this.height = this.top + this.bottom
  }
}

/**
 * Array of margins - top, right, bottom, left
 */
export type MarginArray = [number, number, number, number]
