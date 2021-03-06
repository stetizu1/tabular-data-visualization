/**
 * Top toolbar, containing general settings independent of the specific view.
 */
import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { Box } from '@mui/material'
import { AddCircle, Brush, Dashboard, SkipNext } from '@mui/icons-material'

import { BrushOffSvg } from '../../../../icons/BrushOffSvg'
import { TooltipSvg } from '../../../../icons/TooltipSvg'

import { TOP_TOOLBAR_TEXT } from '../../../text/siteText'

import { topToolbarStyle } from '../../../components-style/content/top-toolbar/topToolbarStyle'

import { ClickableButton } from './items/buttons/ClickableButton'
import { FileReader, FileReaderDataProps } from './items/file-reader/FileReader'
import { ToggleButtonSingle } from './items/buttons/ToggleButtonSingle'
import { OpenSettingsButton } from './items/buttons/OpenSettingsButton'
import { ColorButton } from './items/buttons/ColorButton'

export interface TopToolbarProps extends FileReaderDataProps {
  openDrawer: () => void
  isToolsDisabled: boolean

  isDetailsVisible: boolean
  setIsDetailsVisible: Dispatch<SetStateAction<boolean>>
  isBrushingOnEndOfMove: boolean
  setIsBrushingOnEndOfMove: (newIsBrushingOnEndOfMove: boolean) => void

  isBrushingActive: boolean
  clearBrushes: () => void

  setIsLayoutDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsAddViewDialogOpen: Dispatch<SetStateAction<boolean>>
  removeLayout: () => void

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
  setIsLayoutDialogOpen,
  removeLayout,
  brushColor,
  setBrushColor,
}) => (
  <Box sx={topToolbarStyle.toolbar}>
    <Box sx={topToolbarStyle.left}>
      <ClickableButton
        icon={<AddCircle />}
        onClick={() => setIsAddViewDialogOpen(true)}
        disabled={isToolsDisabled}
        label={TOP_TOOLBAR_TEXT.addView}
      />
      <ClickableButton
        onClick={() => {
          setIsLayoutDialogOpen(true)
          removeLayout()
        }}
        icon={<Dashboard />}
        disabled={isToolsDisabled}
        label={TOP_TOOLBAR_TEXT.layout}
      />
      <Box sx={topToolbarStyle.separator} />
      <ToggleButtonSingle
        icon={<TooltipSvg />}
        value={isDetailsVisible}
        setValue={setIsDetailsVisible}
        disabled={isToolsDisabled}
        label={TOP_TOOLBAR_TEXT.detailsVisible}
      />
      <ToggleButtonSingle
        icon={<SkipNext />}
        value={isBrushingOnEndOfMove}
        setValue={setIsBrushingOnEndOfMove}
        disabled={isToolsDisabled}
        label={TOP_TOOLBAR_TEXT.brushingOnEOM}
      />
    </Box>
    <Box sx={topToolbarStyle.middle}>
      <ColorButton
        color={brushColor}
        handleSetColor={(color) => setBrushColor(color)}
        icon={<Brush />}
        disabled={isToolsDisabled}
        tooltip={TOP_TOOLBAR_TEXT.brushColor}
      />
      <Box sx={topToolbarStyle.separator} />
      <ClickableButton
        icon={<BrushOffSvg />}
        onClick={clearBrushes}
        disabled={!isBrushingActive}
        label={TOP_TOOLBAR_TEXT.clearBrushes}
      />
    </Box>
    <Box sx={topToolbarStyle.right}>
      <FileReader setDataset={setDataset} setDataLoadState={setDataLoadState} isHighlighted={isToolsDisabled} />
      <OpenSettingsButton open={openDrawer} disabled={isToolsDisabled} />
    </Box>
  </Box>
)
