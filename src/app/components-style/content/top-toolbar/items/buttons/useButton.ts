import { makeStyles } from '@mui/styles'

import { important, px } from '../../../../../helpers/d3/stringGetters'

export const useButton = makeStyles({
  button: {
    margin: important(px(0, 7)),
    padding: important(px(4)),
    minWidth: important(`0`),
    '&.MuiButtonBase-root': {
      background: important(`#363b46`),
    },
    '&.Mui-selected': {
      background: important(`#d6e1ff`),
    },
    '&.MuiButton-contained:not(.Mui-disabled)': {
      background: important(`#d6e1ff`),
      color: `rgba(0, 0, 0, 0.87)`,
    },
  },
})
