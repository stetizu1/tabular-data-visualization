import { Dispatch, VoidFunctionComponent, SetStateAction, useMemo } from 'react'
import { Box, Divider, Drawer, Button, Link, Tooltip, Typography } from '@mui/material'
import { ChevronRight, GitHub } from '@mui/icons-material'

import { SelectableDataType } from '../../../types/data/data'
import { Settings } from '../../../types/views/settings/Settings'

import { ViewType } from '../../../constants/views-general/ViewType'
import { ANCHOR, DRAWER_VARIANT } from '../../../constants/mui'
import { GITHUB_LINK } from '../../../constants/link'

import { SETTINGS_DRAWER_BOTTOM_TEXT } from '../../../text/settingsDrawerBottomText'

import { settingsDrawerStyle } from '../../../components-style/content/data-drawer/settingsDrawerStyle'

import { ParallelCoordinatesSettingsComponent } from '../views/parallel-coordinates/ParallelCoordinatesSettingsComponent'
import { ScatterPlotMatrixSettingsComponent } from '../views/scatter-plot-matrix/ScatterPlotMatrixSettingsComponent'
import { GlyphsSettingsComponent } from '../views/glyphs/GlyphsSettingsComponent'
import { ScatterPlotGlyphsSettingsComponent } from '../views/scatter-plot-glyphs/ScatterPlotGlyphsSettingsComponent'
import { DataTableSettingsComponent } from '../views/data-table/DataTableSettingsComponent'
import { ParallelSetsBundledSettingsComponent } from '../views/parallel-sets-bundeled/ParallelSetsBundledSettingsComponent'

export interface SettingsDrawerProps {
  isOpen: boolean
  close: () => void
  dataset: ReadonlyArray<SelectableDataType>
  views: ViewType[]
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}

export const SettingsDrawer: VoidFunctionComponent<SettingsDrawerProps> = ({
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
    <Drawer variant={DRAWER_VARIANT.persistent} anchor={ANCHOR.right} open={isOpen} sx={settingsDrawerStyle.drawer}>
      <Box sx={settingsDrawerStyle.header}>
        <Button onClick={close} sx={settingsDrawerStyle.button}>
          <Tooltip title={SETTINGS_DRAWER_BOTTOM_TEXT.hide}>
            <ChevronRight sx={settingsDrawerStyle.chevron} />
          </Tooltip>
        </Button>
      </Box>
      <Divider />
      <Box sx={settingsDrawerStyle.setting}>{settingsComponents}</Box>
      <Box sx={settingsDrawerStyle.fill} />
      <Box sx={settingsDrawerStyle.footer}>
        <Typography sx={settingsDrawerStyle.text}>{SETTINGS_DRAWER_BOTTOM_TEXT.description}</Typography>
        <Typography sx={settingsDrawerStyle.text}>{SETTINGS_DRAWER_BOTTOM_TEXT.openSource}</Typography>
        <Link href={GITHUB_LINK} sx={settingsDrawerStyle.text}>
          <GitHub sx={settingsDrawerStyle.githubIcon} />
          {SETTINGS_DRAWER_BOTTOM_TEXT.github}
        </Link>
      </Box>
    </Drawer>
  )
}
