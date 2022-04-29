import { FunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useDialogStyle } from '../../../../../components-style/content/top-toolbar/items/dialogs/useDialogStyle'

export interface InformationDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  confirmText: string
  alert?: boolean
}

export const InformationDialog: FunctionComponent<InformationDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  alert = false,
}) => {
  const classes = useDialogStyle()
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText className={alert ? classes.alert : ``}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
