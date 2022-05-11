import { Dispatch, VoidFunctionComponent, MouseEvent, SetStateAction, useCallback } from 'react'
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
const ON_VALUE = `on`

export const ToggleButtonSingle: VoidFunctionComponent<ToggleButtonProps> = ({
  icon,
  value,
  setValue,
  label,
  disabled,
}) => {
  const handleChange = useCallback(
    (event: MouseEvent<HTMLElement>, checked: string[]) => {
      if (checked.length && checked[0] === ON_VALUE) {
        return setValue(true)
      }
      return setValue(false)
    },
    [setValue],
  )
  return (
    <ToggleButtonGroup value={value ? [ON_VALUE] : []} onChange={handleChange}>
      <Tooltip title={label}>
        <ToggleButton sx={topToolbarButtonStyle.button} value={ON_VALUE} disabled={disabled}>
          {icon}
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  )
}
