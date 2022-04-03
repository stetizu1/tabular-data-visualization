import { FunctionComponent } from 'react'
import { Divider, Drawer, IconButton } from '@material-ui/core'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { useDataDrawerStyle } from './useDataDrawerStyle'

export interface DataDrawerProps {
  isOpen: boolean
  close: SideEffectVoid
}

export const DataDrawer: FunctionComponent<DataDrawerProps> = ({ isOpen, close }) => {
  const classes = useDataDrawerStyle()
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
      className={classes.drawer}
    >
      <div className={classes.header}>
        <IconButton onClick={close}>
          <ChevronRight />
        </IconButton>
      </div>
      <Divider />
    </Drawer>
  )
}
