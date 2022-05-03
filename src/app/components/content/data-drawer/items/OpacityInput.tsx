import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { TextField, Typography } from '@mui/material'

import { Opacity } from '../../../../types/styling/Opacity'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { OPACITY_MENU_TEXT } from '../../../../text/views-and-menus/common'

import { useNumberInputStyles } from '../../../../components-style/content/data-drawer/items/useNumberInputStyles'

import { Settings } from '../../views/Settings'

export interface OpacityInputProps {
  header: string
  opacity: Opacity
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
}

export const OpacityInput: VoidFunctionComponent<OpacityInputProps> = ({ header, opacity, setSettings, viewType }) => {
  const classes = useNumberInputStyles()
  const handleOpacityChange = (newOpacity: number, idx: number) => {
    const newOpacities = [...opacity]
    newOpacities[idx] = newOpacity

    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          opacity: newOpacities,
        },
      }
    })
  }
  return (
    <div className={classes.vertical}>
      <Typography className={classes.text}>{header}</Typography>
      <TextField
        label={OPACITY_MENU_TEXT.all}
        type="number"
        defaultValue={opacity[0]}
        className={classes.textField}
        inputProps={{ min: 0, max: 100 }}
        onChange={(e) => handleOpacityChange(Number(e.target.value), 0)}
      />
      <div className={classes.horizontal}>
        <TextField
          label={OPACITY_MENU_TEXT.selected}
          type="number"
          defaultValue={opacity[1]}
          className={classes.textField}
          inputProps={{ min: 0, max: 100 }}
          onChange={(e) => handleOpacityChange(Number(e.target.value), 1)}
        />
        <TextField
          label={OPACITY_MENU_TEXT.notSelected}
          type="number"
          defaultValue={opacity[2]}
          className={classes.textField}
          inputProps={{ min: 0, max: 100 }}
          onChange={(e) => handleOpacityChange(Number(e.target.value), 2)}
        />
      </div>
    </div>
  )
}
