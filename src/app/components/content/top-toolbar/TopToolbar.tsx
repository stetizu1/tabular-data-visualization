import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { AddCircle, AutoFixOff, SkipNext } from '@mui/icons-material'
import { Info } from '@mui/icons-material'

import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { TOP_TOOLBAR_TEXT } from '../../../text/SiteText'

import { useTopToolbar } from '../../../components-style/content/top-toolbar/useTopToolbar'

import { ClickableButton } from './items/buttons/ClickableButton'
import { FileReader, FileReaderDataProps } from './items/file-reader/FileReader'
import { ToggleButtonSingle } from './items/buttons/ToggleButtonSingle'
import { OpenSettingsButton } from './items/buttons/OpenSettingsButton'

export interface TopToolbarProps extends FileReaderDataProps {
  openDrawer: SideEffectVoid
  isToolsDisabled: boolean

  isDetailsVisible: boolean
  setIsDetailsVisible: Dispatch<SetStateAction<boolean>>
  isBrushingOnEndOfMove: boolean
  setIsBrushingOnEndOfMove: (newIsBrushingOnEndOfMove: boolean) => void

  isBrushingActive: boolean
  clearBrushes: () => void

  setIsAddViewDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const TopToolbar: FunctionComponent<TopToolbarProps> = ({
  openDrawer,
  isToolsDisabled,
  isDetailsVisible,
  setIsDetailsVisible,
  isBrushingOnEndOfMove,
  setIsBrushingOnEndOfMove,
  isBrushingActive,
  clearBrushes,
  setDataset,
  setDataLoadState,
  setIsAddViewDialogOpen,
}) => {
  const classes = useTopToolbar()
  return (
    <div className={classes.toolbar}>
      <div className={classes.left}>
        <ToggleButtonSingle
          icon={<Info />}
          value={isDetailsVisible}
          setValue={setIsDetailsVisible}
          disabled={isToolsDisabled}
          label={TOP_TOOLBAR_TEXT.labelDetailsVisible}
        />
        <ToggleButtonSingle
          icon={<SkipNext />}
          value={isBrushingOnEndOfMove}
          setValue={setIsBrushingOnEndOfMove}
          disabled={isToolsDisabled}
          label={TOP_TOOLBAR_TEXT.labelBrushingOnEOM}
        />
        <div className={classes.separator} />
        <ClickableButton
          icon={<AutoFixOff />}
          onClick={clearBrushes}
          disabled={!isBrushingActive}
          label={TOP_TOOLBAR_TEXT.labelClearBrushes}
        />
        <ClickableButton
          icon={<AddCircle />}
          onClick={() => setIsAddViewDialogOpen(true)}
          disabled={isToolsDisabled}
          label={TOP_TOOLBAR_TEXT.labelAddView}
        />
      </div>
      <div className={classes.right}>
        <FileReader setDataset={setDataset} setDataLoadState={setDataLoadState} isHighlighted={isToolsDisabled} />
        <OpenSettingsButton open={openDrawer} disabled={isToolsDisabled} />
      </div>
    </div>
  )
}
