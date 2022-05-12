import { SxProps } from '@mui/system'

import { px } from '../../../helpers/stringGetters'

import { DIALOG_COLORS } from '../../../styles/colors'

export const helpDialogStyle: Record<string, SxProps> = {
  dialog: {
    '& .MuiPaper-root': {
      textAlign: `justify`,
    },
  },
  iconedHeaderBox: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `flex-end`,
    '& svg': {
      fontSize: px(20),
      opacity: 0.5,
      paddingBottom: px(2),
    },
  },
  header: {
    fontWeight: `bold`,
    fontSize: px(16),
    paddingTop: px(10),
  },
  brushContainer: {
    minWidth: px(0),
    display: `flex`,
    justifyContent: `space-between`,
    margin: px(2),
    '@media (max-width: 630px)': {
      flexWrap: `wrap`,
    },
  },
  topText: {
    padding: px(8, 0, 6),
    color: DIALOG_COLORS.font,
  },
  text: {
    padding: px(9, 10, 5),
    color: DIALOG_COLORS.font,
  },
  image: {
    height: px(130),
    width: px(238),
  },
  iconTextBox: {
    display: `flex`,
    alignItems: `flex-start`,
    '& p': {
      padding: px(1, 5, 4),
    },
  },
  inlineIcon: {
    fontSize: px(15),
    marginRight: px(3),
  },
}
