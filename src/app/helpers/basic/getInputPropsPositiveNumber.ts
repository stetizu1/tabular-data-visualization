import { InputBaseComponentProps } from '@mui/material/InputBase'

import { INPUT_PROPS } from '../../constants/others'

export const getInputPropsPositiveNumber = ({ min, max }: { min?: number; max?: number }): InputBaseComponentProps => {
  const minVal = min ? { min } : {}
  const maxVal = max ? { max } : {}
  return {
    ...INPUT_PROPS.positiveNumber,
    ...minVal,
    ...maxVal,
  }
}
