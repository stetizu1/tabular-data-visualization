import { Brush, Help, Settings } from '@mui/icons-material'
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'

import { BUTTON_VARIANT, COMPONENT_TYPE, DIALOG_MAX_WIDTH } from '@/constants/mui'
import { BRUSHING_IMAGES } from '@/constants/public-path'
import { ViewType } from '@/constants/views-general/ViewType'

import { VIEWS_NAMES } from '@/text/viewsNames'

import { helpDialogStyle } from '@/components-style/content/common/helpDialogStyle'
import { inlineButtonStyles } from '@/components-style/content/common/inlineButtonStyles'
import { INFO_DIALOG_TEXT, VIEW_TOP_TEXT } from '@/text/viewTopText'

export interface ViewHelpButtonProps {
  viewType: ViewType
}

export const ViewHelpButton: FC<ViewHelpButtonProps> = ({ viewType }) => {
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
        <DialogTitle>{VIEWS_NAMES[viewType]}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={helpDialogStyle.text}>{INFO_DIALOG_TEXT[viewType].description}</DialogContentText>
          <Box sx={helpDialogStyle.iconedHeaderBox}>
            <Typography sx={helpDialogStyle.header}>{VIEW_TOP_TEXT.infoDialog.brushing}</Typography>
            <Brush />
          </Box>
          <Divider />
          <Box sx={helpDialogStyle.brushContainer}>
            <CardMedia
              component={COMPONENT_TYPE.image}
              sx={helpDialogStyle.image}
              image={BRUSHING_IMAGES[viewType]}
              alt={viewType}
            />
            <DialogContentText sx={helpDialogStyle.text}>
              {INFO_DIALOG_TEXT[viewType].descriptionBrushing}
            </DialogContentText>
          </Box>
          <Box sx={helpDialogStyle.iconedHeaderBox}>
            <Typography sx={helpDialogStyle.header}>{VIEW_TOP_TEXT.infoDialog.settings}</Typography>
            <Settings />
          </Box>
          <Divider />
          <DialogContentText sx={helpDialogStyle.text}>
            {INFO_DIALOG_TEXT[viewType].descriptionSettings}
          </DialogContentText>
          <DialogContentText sx={helpDialogStyle.text}>
            {INFO_DIALOG_TEXT[viewType].descriptionSettingsMore}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} variant={BUTTON_VARIANT.contained} autoFocus>
            {VIEW_TOP_TEXT.infoDialog.close}
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setIsDialogOpen(true)} sx={inlineButtonStyles.button}>
        <Tooltip title={VIEW_TOP_TEXT.info}>
          <Help />
        </Tooltip>
      </Button>
    </>
  )
}
