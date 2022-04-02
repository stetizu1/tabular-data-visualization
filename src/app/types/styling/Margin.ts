export class Margin {
  readonly width: number
  readonly height: number
  constructor (readonly top: number, readonly bottom: number, readonly left: number, readonly right: number) {
    this.width = this.right + this.left
    this.height = this.top + this.bottom
  }
}

export const defaultMargin = new Margin(20, 25, 50, 50)