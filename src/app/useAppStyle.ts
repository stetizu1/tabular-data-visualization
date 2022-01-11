import { makeStyles } from '@material-ui/core/styles'
import { COLORS } from './styles/colors'


export const useAppStyle = makeStyles({
  app: {
    textAlign: `center`,
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  appHeader: {
    backgroundColor: COLORS.backgroundColor,
    padding: `10px 0`,
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    fontSize: `calc(10px + 2vmin)`,
    color: COLORS.fontColor,
  },
})
