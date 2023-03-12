import { SxProps } from '@mui/system'

import { px } from '@/helpers/stringGetters'

export const attributeCheckerStyle: Record<string, SxProps> = {
  buttons: {
    display: `flex`,
    flexDirection: `column`,
  },
  control: {
    margin: px(0, 5),
    padding: 0,
    minWidth: 0,
    height: 15,
  },
}
