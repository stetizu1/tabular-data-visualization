import { VoidFunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material'

import { dialogStyle } from '../../../../components-style/content/top-toolbar/items/dialogs/dialogStyle'

export interface InformationDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  confirmText: string
  alert?: boolean
}

export const InformationDialog: VoidFunctionComponent<InformationDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  alert = false,
}) => (
  <Dialog onClose={onClose} open={isOpen}>
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>
      <DialogContentText sx={alert ? dialogStyle.alert : {}}>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} autoFocus>
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
)
