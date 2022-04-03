import React, { FunctionComponent } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { IconButton } from '@material-ui/core'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { ClearBrushesButton, ClearBrushesButtonDataProps } from './items/buttons/ClearBrushesButton'
import { FileReader, FileReaderDataProps } from './items/fileRader/FileReader'
import { useTopToolbar } from './useTopToolbar'

export interface TopToolbarProps extends ClearBrushesButtonDataProps, FileReaderDataProps {
  openDrawer: SideEffectVoid
}

export const TopToolbar: FunctionComponent<TopToolbarProps> = ({
  clearBrushes,
  setData,
  brushingActive,
  openDrawer,
}) => {
  const classes = useTopToolbar()
  return (
    <div className={classes.toolbar}>
      <div>
        <ClearBrushesButton clearBrushes={clearBrushes} brushingActive={brushingActive}/>
      </div>
      <div>
        <FileReader setData={setData}/>
        <IconButton size="small" onClick={openDrawer}><MenuIcon/></IconButton>
      </div>
    </div>
  )
}
