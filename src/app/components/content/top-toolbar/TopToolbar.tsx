import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { AddCircle, AutoFixOff, Brush, SkipNext } from '@mui/icons-material'
import { Info } from '@mui/icons-material'

import { Box } from '@mui/material'
import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { TOP_TOOLBAR_TEXT } from '../../../text/SiteText'

import { topToolbarStyle } from '../../../components-style/content/top-toolbar/topToolbarStyle'

import { ClickableButton } from './items/buttons/ClickableButton'
import { FileReader, FileReaderDataProps } from './items/file-reader/FileReader'
import { ToggleButtonSingle } from './items/buttons/ToggleButtonSingle'
import { OpenSettingsButton } from './items/buttons/OpenSettingsButton'
import { ColorButton } from './items/buttons/ColorButton'

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

  brushColor: string
  setBrushColor: Dispatch<SetStateAction<string>>
}

export const TopToolbar: VoidFunctionComponent<TopToolbarProps> = ({
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
  brushColor,
  setBrushColor,
}) => (
  <Box sx={topToolbarStyle.toolbar}>
    <Box sx={topToolbarStyle.left}>
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
      <Box sx={topToolbarStyle.separator} />
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
    </Box>
    <Box sx={topToolbarStyle.middle}>
      <ColorButton
        color={brushColor}
        handleSetColor={(color) => setBrushColor(color)}
        icon={<Brush />}
        disabled={isToolsDisabled}
        tooltip={TOP_TOOLBAR_TEXT.labelBrushColor}
      />
    </Box>
    <Box sx={topToolbarStyle.right}>
      <FileReader setDataset={setDataset} setDataLoadState={setDataLoadState} isHighlighted={isToolsDisabled} />
      <OpenSettingsButton open={openDrawer} disabled={isToolsDisabled} />
    </Box>
  </Box>
)
