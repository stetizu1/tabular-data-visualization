import { Dispatch, VoidFunctionComponent, SetStateAction, useMemo } from 'react'
import { Box, Divider, Drawer, IconButton, Link, Typography } from '@mui/material'
import { ChevronRight, GitHub } from '@mui/icons-material'

import { SelectableDataType } from '../../../types/data/data'
import { Settings } from '../../../types/views/settings/Settings'

import { ViewType } from '../../../constants/views-general/ViewType'
import { ANCHOR, DRAWER_VARIANT } from '../../../constants/mui'

import { DATA_DRAWER_TEXT, GITHUB_LINK } from '../../../text/dataDrawerText'

import { dataDrawerStyle } from '../../../components-style/content/data-drawer/dataDrawerStyle'

import { ParallelCoordinatesMenu } from '../views/parallel-coordinates/ParallelCoordinatesMenu'
import { ScatterPlotMatrixMenu } from '../views/scatter-plot-matrix/ScatterPlotMatrixMenu'
import { GlyphsMenu } from '../views/glyphs/GlyphsMenu'
import { ScatterPlotGlyphsMenu } from '../views/scatter-plot-glyphs/ScatterPlotGlyphsMenu'
import { DataTableMenu } from '../views/data-table/DataTableMenu'
import { ParallelSetsBundledMenu } from '../views/parallel-sets-bundeled/ParallelSetsBundledMenu'

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
  const menus = useMemo(
    () =>
      views.map((view, idx) => {
        switch (view) {
          case ViewType.Glyphs:
            return (
              <GlyphsMenu
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ParallelCoordinates:
            return (
              <ParallelCoordinatesMenu
                dataset={dataset}
                settings={settings!}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ScatterPlotMatrix:
            return (
              <ScatterPlotMatrixMenu
                dataset={dataset}
                settings={settings!}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ScatterPlotGlyphs:
            return (
              <ScatterPlotGlyphsMenu
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.DataTable:
            return (
              <DataTableMenu
                dataset={dataset}
                settings={settings}
                setSettings={setSettings}
                cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
                key={idx}
              />
            )
          case ViewType.ParallelSetsBundled:
            return (
              <ParallelSetsBundledMenu
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
          <ChevronRight sx={dataDrawerStyle.chevron} />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={dataDrawerStyle.menu}>{menus.map((menu) => menu)}</Box>
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
