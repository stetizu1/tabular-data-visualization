import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import { useDialogStyle } from '../../../../../components-style/content/top-toolbar/items/dialogs/useDialogStyle'

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
}

export const SelectionDialog = <T,>({
  isOpen,
  onClose,
  title,
  options,
  handleListItemClick,
}: SelectionDialogProps<T>): JSX.Element => {
  const classes = useDialogStyle()
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <List className={classes.list}>
        {options.map((option) => (
          <ListItem button onClick={() => handleListItemClick(option.key)} key={String(option.key)}>
            <ListItemAvatar>
              <Avatar>{option.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={option.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
