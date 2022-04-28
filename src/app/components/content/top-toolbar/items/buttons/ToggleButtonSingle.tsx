import { Dispatch, FunctionComponent, MouseEvent, SetStateAction } from 'react'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'

import { useButton } from '../../../../../components-style/content/top-toolbar/items/buttons/useButton'

export interface ToggleButtonProps {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  icon: JSX.Element
  label: string
}

export const ToggleButtonSingle: FunctionComponent<ToggleButtonProps> = ({ icon, value, setValue, label }) => {
  const classes = useButton()
  const handleChange = (event: MouseEvent<HTMLElement>, checked: string[]) => {
    if (checked.length && checked[0] === onValue) {
      return setValue(true)
    }
    return setValue(false)
  }
  const onValue = `on`
  return (
    <ToggleButtonGroup value={value ? [onValue] : []} onChange={handleChange}>
      <ToggleButton className={classes.button} value={onValue} aria-label={label}>
        <Tooltip title={label}>{icon}</Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
