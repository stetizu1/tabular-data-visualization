import { makeStyles } from '@mui/styles'
import { HEADER_COLORS } from '../../styles/colors'

export const useHeaderStyle = makeStyles({
  headerContainer: {
    backgroundColor: HEADER_COLORS.backgroundColor,
    padding: `10px 0`,
    width: `100%`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `flex-end`,
    justifyContent: `space-between`,
    color: HEADER_COLORS.fontColor,
  },
  title: {
    fontSize: `calc(5px + 2vmin)`,
    padding: `0 20px`,
  },
  description: {
    padding: `0 15px`,
    fontSize: `calc(2px + 1vmin)`,
  },
})
