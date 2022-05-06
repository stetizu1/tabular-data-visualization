import { SxProps } from '@mui/system'

export const getViewBoxStyle = (w: number, h: number): SxProps => ({
  width: w,
  height: h,
  overflowX: `hidden`,
  overflowY: `auto`,
})
