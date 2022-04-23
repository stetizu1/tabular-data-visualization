import { FunctionComponent } from 'react'
import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { ClearBrushesButton, ClearBrushesButtonDataProps } from './items/buttons/ClearBrushesButton'
import { FileReader, FileReaderDataProps } from './items/fileRader/FileReader'
import { useTopToolbar } from './useTopToolbar'

export interface TopToolbarProps extends ClearBrushesButtonDataProps, FileReaderDataProps {
  openDrawer: SideEffectVoid
  openDrawerDisabled: boolean
}

export const TopToolbar: FunctionComponent<TopToolbarProps> = ({
  clearBrushes,
  brushingActive,
  setDataset,
  setDataLoadState,
  openDrawer,
  openDrawerDisabled,
}) => {
  const classes = useTopToolbar()
  return (
    <div className={classes.toolbar}>
      <div>
        <ClearBrushesButton clearBrushes={clearBrushes} brushingActive={brushingActive} />
      </div>
      <div>
        <FileReader setDataset={setDataset} setDataLoadState={setDataLoadState} />
        <IconButton size="small" disabled={openDrawerDisabled} onClick={openDrawer}>
          <Menu />
        </IconButton>
      </div>
    </div>
  )
}
