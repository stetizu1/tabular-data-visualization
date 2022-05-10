import { VoidFunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material'

import { BUTTON_VARIANT } from '../../../../constants/mui'

export interface InformationDialogProps {
  isOpen: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onClose: () => void
  confirmText: string
  cancelText: string
}

export const ConfirmationDialog: VoidFunctionComponent<InformationDialogProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onClose,
  confirmText,
  cancelText,
}) => (
  <Dialog onClose={onClose} open={isOpen}>
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirm} variant={BUTTON_VARIANT.contained} autoFocus>
        {confirmText}
      </Button>
      <Button onClick={onClose} variant={BUTTON_VARIANT.outlined}>
        {cancelText}
      </Button>
    </DialogActions>
  </Dialog>
)
