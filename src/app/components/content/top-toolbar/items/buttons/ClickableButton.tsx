import { FunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'

import { useButton } from '../../../../../components-style/content/top-toolbar/items/buttons/useButton'

export interface ClickableButtonDataProps {
  onClick: () => void
  disabled: boolean
  icon: JSX.Element
  label: string
}

export type ButtonProps = ClickableButtonDataProps

export const ClickableButton: FunctionComponent<ButtonProps> = ({ icon, onClick, disabled, label }) => {
  const classes = useButton()
  return (
    <Button variant="contained" onClick={onClick} className={classes.button} disabled={disabled} aria-label={label}>
      <Tooltip title={label}>{icon}</Tooltip>
    </Button>
  )
}
