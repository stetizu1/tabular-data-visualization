import { SxProps } from '@mui/system'

import { Opacity } from '../../../../types/styling/Opacity'

import { important } from '../../../../helpers/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'

export const SELECTED_CLASS = `parallelSetsBundledSelected`
export const TABS_CLASS = `psbTabs`
export const LINE_NOT_SELECTED_CLASS = `psbLine`
export const CONNECTORS_CLASS = `psbConnector`
export const INNER_TEXT_CLASS = `psbInnerText`
export const TABS_SELECTED_CLASS = `psbTabsSelected`

// all styles need to be in one sxProps for the view saving with css
export const getParallelSetsBundledStyle = (
  opacity: Opacity,
  isBrushActive: boolean,
  brushColor: string,
  fontColorInner: string,
): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& .psbConnector': {
    fill: `none`,
  },
  '& .psbTabs': {
    cursor: `pointer`,
    '&.psbTabsSelected': {
      fill: important(brushColor),
    },
  },
  '& path': {
    '&.parallelSetsBundledSelected': {
      opacity: opacity[1] / 100,
      stroke: important(brushColor),
    },
    '&.psbLine': {
      opacity: !isBrushActive ? opacity[0] / 100 : opacity[2] / 100,
      mixBlendMode: `multiply`,
    },
  },
  '& .psbInnerText': {
    fill: fontColorInner,
  },
})
