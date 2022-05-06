import { SxProps } from '@mui/system'
import { px } from '../../../helpers/d3/stringGetters'
import { SITE_COLORS, ERROR_COLORS, BUTTON_COLORS } from '../../../styles/colors'

export const dialogStyle: Record<string, SxProps> = {
  dialog: {
    '& .MuiPaper-root': {
      minWidth: px(300),
    },
  },
  alert: {
    color: ERROR_COLORS.font,
  },
  description: {
    padding: px(25, 30, 20),
    color: SITE_COLORS.font,
  },
  innerContent: {
    padding: px(0, 40, 10),
  },
  contentBox: {
    height: px(120),
    display: `flex`,
    flexDirection: `column`,
  },
  text: {
    color: SITE_COLORS.font,
  },
  toggleDialogGroup: {
    width: `100%`,
    marginBottom: px(5),
    display: `flex`,
  },
  toggleDialogButton: {
    flexGrow: 1,
    padding: px(6),
    '&.Mui-selected': {
      bgcolor: BUTTON_COLORS.buttonDialogBackground,
      color: BUTTON_COLORS.buttonDialogFont,
      '&:hover': {
        bgcolor: BUTTON_COLORS.buttonDialogHoverBackground,
      },
    },
  },
  button: {
    margin: px(0, 20, 20),
  },
  attHeader: {
    fontSize: px(16),
    fontWeight: `bold`,
    paddingBottom: px(4),
    color: SITE_COLORS.font,
  },
  numInput: {
    minWidth: `95%`,
    alignSelf: `center`,
    '&.MuiFormControl-root': {
      margin: px(20, 6, 6),
    },
    '& input': {
      padding: px(8, 10, 6),
    },
  },
}
