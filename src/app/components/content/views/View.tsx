/**
 * Component setting a specific view according to the given viewType parameter
 */
import { Box } from '@mui/material'
import { FC } from 'react'

import { Brushable } from '@/types/brushing/Brushable'
import { Settings } from '@/types/views/settings/Settings'
import { VisualizationView } from '@/types/views/VisualizationView'

import { getViewRecord, VIEW_BORDER_SIZE } from '@/constants/views-general/view'
import { ViewType } from '@/constants/views-general/ViewType'

import { getViewBoxStyle } from '@/components-style/content/views/viewStyle'

export interface ViewProps extends Brushable, VisualizationView {
  viewType: ViewType
  settings: Settings
  brushColor: string
  showFilter?: boolean
}

export const View: FC<ViewProps> = ({ width, height, viewType, settings, showFilter, ...dataProps }) => {
  const getView = getViewRecord[viewType]
  const settingsCurr = settings[viewType]
  if (!settingsCurr) return null
  return (
    <Box sx={getViewBoxStyle(width, height)}>
      {getView({ width, height: height - VIEW_BORDER_SIZE, ...dataProps }, settingsCurr, showFilter)}
    </Box>
  )
}
