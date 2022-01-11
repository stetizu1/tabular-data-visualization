export interface Margin {
  top: number
  bottom: number
  right: number
  left: number
}

export const marginWidth = (margin: Margin) => margin.left + margin.right
export const marginHeight = (margin: Margin) => margin.top + margin.bottom

export const defaultMargin: Margin = {
  top: 20,
  bottom: 25,
  right: 30,
  left: 30,
}


