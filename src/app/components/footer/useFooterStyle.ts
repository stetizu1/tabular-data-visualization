import { makeStyles } from '@mui/styles'
import { FOOTER_COLORS } from '../../styles/colors'

export const useFooterStyle = makeStyles({
  footerContainer: {
    backgroundColor: FOOTER_COLORS.backgroundColor,
    color: FOOTER_COLORS.fontColor,
    padding: `10px 0`,
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-end`,
    justifyContent: `flex-end`,
  },
  text: {
    padding: `0 15px`,
    fontSize: `calc(2px + 1vmin)`,
  },
})
