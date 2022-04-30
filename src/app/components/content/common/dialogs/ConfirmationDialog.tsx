import { FunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export interface InformationDialogProps {
  isOpen: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onClose: () => void
  confirmText: string
  cancelText: string
}

export const ConfirmationDialog: FunctionComponent<InformationDialogProps> = ({
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
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirm} variant="contained" autoFocus>
        {confirmText}
      </Button>
      <Button onClick={onClose} variant="outlined">
        {cancelText}
      </Button>
    </DialogActions>
  </Dialog>
)
