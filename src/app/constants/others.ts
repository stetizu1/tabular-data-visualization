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
