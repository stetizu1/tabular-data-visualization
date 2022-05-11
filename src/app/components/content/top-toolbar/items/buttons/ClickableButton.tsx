import { VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'

import { BUTTON_VARIANT } from '../../../../../constants/mui'

import { topToolbarButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/topToolbarButtonStyle'

export interface ClickableButtonDataProps {
  onClick: () => void
  disabled?: boolean
  icon: JSX.Element
  label: string
}

export type ButtonProps = ClickableButtonDataProps

export const ClickableButton: VoidFunctionComponent<ButtonProps> = ({ icon, onClick, disabled, label }) => (
  <Tooltip title={label}>
    <Button variant={BUTTON_VARIANT.contained} onClick={onClick} sx={topToolbarButtonStyle.button} disabled={disabled}>
      {icon}
    </Button>
  </Tooltip>
)
