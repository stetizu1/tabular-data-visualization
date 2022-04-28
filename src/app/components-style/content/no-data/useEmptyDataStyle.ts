import { makeStyles } from '@mui/styles'

import { px } from '../../../helpers/d3/stringGetters'
import { EMPTY_SITE_COLORS } from '../../../styles/colors'

export const useEmptyDataStyle = makeStyles({
  site: {
    paddingTop: px(20),
    color: EMPTY_SITE_COLORS.font,
  },
})
