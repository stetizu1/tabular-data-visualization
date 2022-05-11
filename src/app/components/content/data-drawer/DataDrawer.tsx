import { Dispatch, VoidFunctionComponent, SetStateAction, useMemo } from 'react'
import { Box, Divider, Drawer, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { ChevronRight, GitHub } from '@mui/icons-material'

import { SelectableDataType } from '../../../types/data/data'
import { Settings } from '../../../types/views/settings/Settings'

import { ViewType } from '../../../constants/views-general/ViewType'
import { ANCHOR, DRAWER_VARIANT } from '../../../constants/mui'

import { DATA_DRAWER_TEXT, GITHUB_LINK } from '../../../text/dataDrawerText'

import { dataDrawerStyle } from '../../../components-style/content/data-drawer/dataDrawerStyle'

import { ParallelCoordinatesSettingsComponent } from '../views/parallel-coordinates/ParallelCoordinatesSettingsComponent'
import { ScatterPlotMatrixSettingsComponent } from '../views/scatter-plot-matrix/ScatterPlotMatrixSettingsComponent'
import { GlyphsSettingsComponent } from '../views/glyphs/GlyphsSettingsComponent'
import { ScatterPlotGlyphsSettingsComponent } from '../views/scatter-plot-glyphs/ScatterPlotGlyphsSettingsComponent'
import { DataTableSettingsComponent } from '../views/data-table/DataTableSettingsComponent'
import { ParallelSetsBundledSettingsComponent } from '../views/parallel-sets-bundeled/ParallelSetsBundledSettingsComponent'

export interface DataDrawerProps {
  isOpen: boolean
  close: () => void
  dataset: ReadonlyArray<SelectableDataType>
  views: ViewType[]
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}

export const DataDrawer: VoidFunctionComponent<DataDrawerProps> = ({
  isOpen,
  close,
  dataset,
  views,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const settingsComponents = useMemo(
    () =>
      views.map((view, idx) => {
        switch (view) {
          case ViewType.Glyphs:
            return (
              <GlyphsSettingsComponent
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ParallelCoordinates:
            return (
              <ParallelCoordinatesSettingsComponent
                dataset={dataset}
                settings={settings!}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ScatterPlotMatrix:
            return (
              <ScatterPlotMatrixSettingsComponent
                dataset={dataset}
                settings={settings!}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ScatterPlotGlyphs:
            return (
              <ScatterPlotGlyphsSettingsComponent
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.DataTable:
            return (
              <DataTableSettingsComponent
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ParallelSetsBundled:
            return (
              <ParallelSetsBundledSettingsComponent
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          default:
            return null
        }
      }),
    [cleanSelectedIfViewWasBrushing, dataset, setSettings, settings, views],
  )
  return (
    <Drawer variant={DRAWER_VARIANT.persistent} anchor={ANCHOR.right} open={isOpen} sx={dataDrawerStyle.drawer}>
      <Box sx={dataDrawerStyle.header}>
        <IconButton onClick={close}>
          <Tooltip title={DATA_DRAWER_TEXT.hide}>
            <ChevronRight sx={dataDrawerStyle.chevron} />
          </Tooltip>
        </IconButton>
      </Box>
      <Divider />
      <Box sx={dataDrawerStyle.setting}>{settingsComponents}</Box>
      <Box sx={dataDrawerStyle.fill} />
      <Box sx={dataDrawerStyle.footer}>
        <Typography sx={dataDrawerStyle.text}>{DATA_DRAWER_TEXT.description}</Typography>
        <Typography sx={dataDrawerStyle.text}>{DATA_DRAWER_TEXT.openSource}</Typography>
        <Link href={GITHUB_LINK} sx={dataDrawerStyle.text}>
          <GitHub sx={dataDrawerStyle.githubIcon} />
          {DATA_DRAWER_TEXT.github}
        </Link>
      </Box>
    </Drawer>
  )
}
