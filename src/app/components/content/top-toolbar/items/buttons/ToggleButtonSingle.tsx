import { Dispatch, FunctionComponent, MouseEvent, SetStateAction } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

import { useButton } from '../../../../../components-style/content/top-toolbar/items/buttons/useButton'

export interface ToggleButtonProps {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  icon: JSX.Element
}

export const ToggleButtonSingle: FunctionComponent<ToggleButtonProps> = ({ icon, value, setValue }) => {
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
      <ToggleButton className={classes.button} value={onValue}>
        {icon}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
