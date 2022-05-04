import { Dispatch, VoidFunctionComponent, MouseEvent, SetStateAction } from 'react'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'

import { topToolbarButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/topToolbarButtonStyle'

type SetValue = Dispatch<SetStateAction<boolean>> | ((newValue: boolean) => void)

export interface ToggleButtonProps {
  value: boolean
  setValue: SetValue
  icon: JSX.Element
  label: string
  disabled?: boolean
}

export const ToggleButtonSingle: VoidFunctionComponent<ToggleButtonProps> = ({
  icon,
  value,
  setValue,
  label,
  disabled,
}) => {
  const handleChange = (event: MouseEvent<HTMLElement>, checked: string[]) => {
    if (checked.length && checked[0] === onValue) {
      return setValue(true)
    }
    return setValue(false)
  }
  const onValue = `on`
  return (
    <ToggleButtonGroup value={value ? [onValue] : []} onChange={handleChange}>
      <ToggleButton sx={topToolbarButtonStyle.button} value={onValue} aria-label={label} disabled={disabled}>
        <Tooltip title={label}>{icon}</Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
