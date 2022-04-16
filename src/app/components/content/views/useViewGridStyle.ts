import { makeStyles } from '@mui/styles'

export const useViewGridStyle = makeStyles({
  column: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  row: {
    display: `flex`,
  },
})
