import { Dispatch, FunctionComponent, MouseEvent, SetStateAction } from 'react'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'

import { useTopToolbarButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/useTopToolbarButtonStyle'

type SetValue = Dispatch<SetStateAction<boolean>> | ((newValue: boolean) => void)

export interface ToggleButtonProps {
  value: boolean
  setValue: SetValue
  icon: JSX.Element
  label: string
  disabled?: boolean
}

export const ToggleButtonSingle: FunctionComponent<ToggleButtonProps> = ({
  icon,
  value,
  setValue,
  label,
  disabled,
}) => {
  const classes = useTopToolbarButtonStyle()
  const handleChange = (event: MouseEvent<HTMLElement>, checked: string[]) => {
    if (checked.length && checked[0] === onValue) {
      return setValue(true)
    }
    return setValue(false)
  }
  const onValue = `on`
  return (
    <ToggleButtonGroup value={value ? [onValue] : []} onChange={handleChange}>
      <ToggleButton className={classes.button} value={onValue} aria-label={label} disabled={disabled}>
        <Tooltip title={label}>{icon}</Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
