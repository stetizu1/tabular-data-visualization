/**
 * Page content before selecting a dataset.
 */
import { useState, VoidFunctionComponent } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material'
import { AddCircle, AutoGraph, Brush, Dashboard, Help, Settings, SkipNext, UploadFile } from '@mui/icons-material'

import { TooltipSvg } from '../../../../icons/TooltipSvg'
import { BrushOffSvg } from '../../../../icons/BrushOffSvg'

import { EMPTY_DATA_TEXT } from '../../../text/siteText'

import { BUTTON_VARIANT, DIALOG_MAX_WIDTH } from '../../../constants/mui'

import { emptyDataStyle } from '../../../components-style/content/no-data/emptyDataStyle'
import { helpDialogStyle } from '../../../components-style/content/common/helpDialogStyle'

export const EmptyData: VoidFunctionComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        sx={helpDialogStyle.dialog}
        fullWidth
        maxWidth={DIALOG_MAX_WIDTH.m}
      >
        <DialogTitle>{EMPTY_DATA_TEXT.helpDialog.header}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={helpDialogStyle.topText}>{EMPTY_DATA_TEXT.helpDialog.description}</DialogContentText>
          <DialogContentText sx={helpDialogStyle.topText}>
            <AutoGraph sx={helpDialogStyle.inlineIcon} />
            {EMPTY_DATA_TEXT.helpDialog.sample}
          </DialogContentText>
          <DialogContentText sx={helpDialogStyle.topText}>
            <UploadFile sx={helpDialogStyle.inlineIcon} />
            {EMPTY_DATA_TEXT.helpDialog.file}
          </DialogContentText>
          <DialogContentText sx={helpDialogStyle.topText}>
            <Help sx={helpDialogStyle.inlineIcon} />
            {EMPTY_DATA_TEXT.helpDialog.viewsHelp}
          </DialogContentText>

          <Typography sx={helpDialogStyle.header}>{EMPTY_DATA_TEXT.helpDialog.subHeader}</Typography>
          <Divider />

          <Box sx={helpDialogStyle.iconTextBox}>
            <AddCircle />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.add}</DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconTextBox}>
            <Dashboard />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.layout}</DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconTextBox}>
            <TooltipSvg />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.tooltip}</DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconTextBox}>
            <SkipNext />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.skip}</DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconTextBox}>
            <Brush />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.brush}</DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconTextBox}>
            <BrushOffSvg />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.brushOff}</DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconTextBox}>
            <Settings />
            <DialogContentText sx={helpDialogStyle.text}>{EMPTY_DATA_TEXT.helpDialog.settings}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} variant={BUTTON_VARIANT.contained} autoFocus>
            {EMPTY_DATA_TEXT.helpDialog.close}
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={emptyDataStyle.content}>
        <Box sx={emptyDataStyle.text}>{EMPTY_DATA_TEXT.content}</Box>
        <Button variant={BUTTON_VARIANT.outlined} sx={emptyDataStyle.button} onClick={() => setIsDialogOpen(true)}>
          <Help sx={emptyDataStyle.icon} />
          {EMPTY_DATA_TEXT.firstTime}
        </Button>
      </Box>
    </>
  )
}
