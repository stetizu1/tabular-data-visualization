import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

import { ColorArray } from '../../../../types/styling/ColorArray'
import { important, px } from '../../../../helpers/d3/stringGetters'
import { DATA_DRAWER_FONT } from '../../../../styles/font'

interface StyleProps {
  colors: ColorArray
}
export const usePalettePickerStyle = makeStyles<Theme, StyleProps>(() => ({
  picker: {
    margin: px(5, 7),
  },
  text: {
    fontSize: important(px(DATA_DRAWER_FONT.fontSize)),
  },
  row: {
    display: `flex`,
    flexDirection: `row`,
  },
  col: {
    display: `flex`,
    flexDirection: `column`,
    width: `20%`,
  },
  c: {
    '& input': {
      width: `100%`,
      height: px(20),
      opacity: 0,
    },
  },
  c0: {
    backgroundColor: ({ colors }) => colors[0],
  },
  c1: {
    backgroundColor: ({ colors }) => colors[1],
  },
  c2: {
    backgroundColor: ({ colors }) => colors[2],
  },
  c3: {
    backgroundColor: ({ colors }) => colors[3],
  },
  c4: {
    backgroundColor: ({ colors }) => colors[4],
  },
  c5: {
    backgroundColor: ({ colors }) => colors[5],
  },
  c6: {
    backgroundColor: ({ colors }) => colors[6],
  },
  c7: {
    backgroundColor: ({ colors }) => colors[7],
  },
  c8: {
    backgroundColor: ({ colors }) => colors[8],
  },
  c9: {
    backgroundColor: ({ colors }) => colors[9],
  },
}))
