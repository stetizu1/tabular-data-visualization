import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Divider, Drawer, IconButton } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { Settings } from '../views/Settings'
import { GlyphsMenu } from '../views/glyphs/GlyphsMenu'
import { SelectableDataType } from '../../../types/data/data'
import { ViewType } from '../views/ViewTypes'
import { useDataDrawerStyle } from './useDataDrawerStyle'

export interface DataDrawerProps {
  isOpen: boolean
  close: SideEffectVoid
  dataset: SelectableDataType[]
  views: Array<ViewType>
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const DataDrawer: FunctionComponent<DataDrawerProps> = ({
  isOpen,
  close,
  dataset,
  views,
  settings,
  setSettings,
}) => {
  const classes = useDataDrawerStyle()
  const menus = views.map((view, idx) => {
    if (view === ViewType.Glyphs)
      return <GlyphsMenu dataset={dataset} settings={settings} setSettings={setSettings} key={idx} />
    return null
  })
  return (
    <Drawer variant="persistent" anchor="right" open={isOpen} className={classes.drawer}>
      <div className={classes.header}>
        <IconButton onClick={close}>
          <ChevronRight />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.menu}>{menus.map((menu) => menu)}</div>
    </Drawer>
  )
}
