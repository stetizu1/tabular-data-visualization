import { calc } from '../helpers/d3/stringGetters'

export const HEADER_FONT = {
  titleFontSize: calc(5, `2vmin`),
  descriptionFontSize: calc(2, `1vmin`),
}

export const FOOTER_FONT = {
  fontSize: calc(2, `1vmin`),
}

export const DATA_DRAWER_FONT = {
  headerFontSize: 14,
  labelFontSize: `0.8em`,
  fontSize: 12,
}

export const PLOT_FONT = {
  fontSize: 12,
}

export const PLOT_FONT_BOX_SIZE = PLOT_FONT.fontSize + 2 // font box, 2px bigger than the fontSize
