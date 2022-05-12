import { InputBaseComponentProps } from '@mui/material/InputBase'

export const HTML = {
  newLine: `<br/>`,
}

export const INPUT_TYPE = {
  color: `color`,
  number: `number`,
  file: `file`,
}

export const INPUT_PROPS: Record<string, InputBaseComponentProps> = {
  positiveNumber: { inputMode: `numeric`, min: 0 },
}

/**
 * Size of block containing font in plots
 */
export const PLOT_FONT_BOX_SIZE = 14 // font box, 2px bigger than the fontSize 12
