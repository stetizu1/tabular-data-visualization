import { useState, VoidFunctionComponent } from 'react'
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
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { Brush, Help, Settings } from '@mui/icons-material'

import { ViewType } from '../../../../constants/views-general/ViewType'
import { BUTTON_VARIANT, COMPONENT_TYPE } from '../../../../constants/mui'
import { BRUSHING_IMAGES } from '../../../../constants/public-path'

import { VIEW_INFO_TEXT } from '../../../../text/siteText'
import { INFO_DIALOG_TEXT, VIEW_NAMES } from '../../../../text/views-and-settings/common'

import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'
import { helpDialogStyle } from '../../../../components-style/content/common/helpDialogStyle'

export interface ViewHelpButtonProps {
  viewType: ViewType
}

export const ViewHelpButton: VoidFunctionComponent<ViewHelpButtonProps> = ({ viewType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen} sx={helpDialogStyle.dialog}>
        <DialogTitle>{VIEW_NAMES[viewType]}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={helpDialogStyle.text}>{INFO_DIALOG_TEXT[viewType].description}</DialogContentText>
          <Box sx={helpDialogStyle.iconedHeaderBox}>
            <Typography sx={helpDialogStyle.header}>{VIEW_INFO_TEXT.dialog.brushing}</Typography>
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
            <Typography sx={helpDialogStyle.header}>{VIEW_INFO_TEXT.dialog.settings}</Typography>
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
            {VIEW_INFO_TEXT.dialog.close}
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={() => setIsDialogOpen(true)} sx={inlineButtonStyles.button}>
        <Tooltip title={VIEW_INFO_TEXT.buttonLabel}>
          <Help />
        </Tooltip>
      </IconButton>
    </>
  )
}
