import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { FormatColorReset, Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'

import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { useTopToolbar } from '../../../components-style/content/top-toolbar/useTopToolbar'

import { ClickableButton } from './items/buttons/ClickableButton'
import { FileReader, FileReaderDataProps } from './items/file-reader/FileReader'
import { ToggleButtonSingle } from './items/buttons/ToggleButtonSingle'

export interface TopToolbarProps extends FileReaderDataProps {
  openDrawer: SideEffectVoid
  openDrawerDisabled: boolean
  isDetailsVisible: boolean
  setIsDetailsVisible: Dispatch<SetStateAction<boolean>>
  isBrushingActive: boolean
  clearBrushes: () => void
}

export const TopToolbar: FunctionComponent<TopToolbarProps> = ({
  openDrawer,
  openDrawerDisabled,
  isDetailsVisible,
  setIsDetailsVisible,
  isBrushingActive,
  clearBrushes,
  setDataset,
  setDataLoadState,
}) => {
  const classes = useTopToolbar()
  return (
    <div className={classes.toolbar}>
      <div className={classes.left}>
        <ToggleButtonSingle icon={<Info />} value={isDetailsVisible} setValue={setIsDetailsVisible} />
        <div className={classes.separator} />
        <ClickableButton icon={<FormatColorReset />} onClick={clearBrushes} disabled={!isBrushingActive} />
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
