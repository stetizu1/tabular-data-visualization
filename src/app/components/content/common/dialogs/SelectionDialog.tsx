import {
  Avatar,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'

import { dialogStyle } from '../../../../components-style/content/common/dialogStyle'

export interface Option<T> {
  key: T
  label: string
  icon: JSX.Element
}

export interface SelectionDialogProps<T> {
  isOpen: boolean
  onClose: () => void
  title: string
  options: Array<Option<T>>
  handleListItemClick: (optionKey: T) => void
  noOptionText?: string
}

export const SelectionDialog = <T,>({
  isOpen,
  onClose,
  title,
  options,
  handleListItemClick,
  noOptionText,
}: SelectionDialogProps<T>): JSX.Element => (
  <Dialog onClose={onClose} open={isOpen} sx={dialogStyle.dialog}>
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <List>
      {options.map((option) => (
        <ListItem button onClick={() => handleListItemClick(option.key)} key={String(option.key)}>
          <ListItemAvatar>
            <Avatar>{option.icon}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={option.label} />
        </ListItem>
      ))}
      {!options.length && <Typography sx={dialogStyle.text}>{noOptionText}</Typography>}
    </List>
  </Dialog>
)
