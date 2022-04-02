import { makeStyles } from '@material-ui/core/styles'
import { HEADER_COLORS } from './styles/colors'


export const useAppStyle = makeStyles({
  app: {
    textAlign: `center`,
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  appHeader: {
    backgroundColor: HEADER_COLORS.backgroundColor,
    padding: `10px 0`,
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    fontSize: `calc(10px + 2vmin)`,
    color: HEADER_COLORS.fontColor,
  },
})
