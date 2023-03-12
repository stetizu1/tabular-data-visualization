import { SxProps } from '@mui/system'

import { Margin } from '@/types/styling/Margin'

export const getViewsNotDisplayStyle = (width: number, height: number, margin: Margin): SxProps => ({
  width: width - margin.width,
  height: height - margin.height,
  padding: margin.toString,
})
