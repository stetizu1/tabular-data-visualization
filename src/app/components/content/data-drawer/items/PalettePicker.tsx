import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Typography } from '@mui/material'
import clsx from 'clsx'

import { ColorArray } from '../../../../types/styling/ColorArray'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { PALETTE_PICKER } from '../../../../text/views-and-menus/common'

import { usePalettePickerStyle } from '../../../../components-style/content/data-drawer/items/usePalettePickerStyle'

import { Settings } from '../../views/Settings'

export interface PalettePickerProps {
  viewType: ViewType
  colors: ColorArray
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const PalettePicker: FunctionComponent<PalettePickerProps> = ({ colors, setSettings, viewType }) => {
  const classes = usePalettePickerStyle({ colors })
  const handleSetColor = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newColor = event.target.value
    if (newColor) {
      const newColors = [...colors]
      newColors[idx] = newColor
      setSettings((prev) => {
        const prevSettings = prev[viewType]!
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            colorCategory: newColors,
          },
        }
      })
    }
  }
  const getInput = (idx: number, className: string) => (
    <div className={classes.col}>
      <label>{PALETTE_PICKER.categoriesLabel[idx]}</label>
      <div className={clsx(classes.c, className)}>
        <input type="color" value={colors[idx]} onChange={(e) => handleSetColor(e, idx)} />
      </div>
    </div>
  )
  return (
    <div className={classes.picker}>
      <Typography className={classes.text}>{PALETTE_PICKER.header}</Typography>
      <div className={classes.row}>
        {getInput(0, classes.c0)}
        {getInput(1, classes.c1)}
        {getInput(2, classes.c2)}
        {getInput(3, classes.c3)}
        {getInput(4, classes.c4)}
      </div>
      <div className={classes.row}>
        {getInput(5, classes.c5)}
        {getInput(6, classes.c6)}
        {getInput(7, classes.c7)}
        {getInput(8, classes.c8)}
        {getInput(9, classes.c9)}
      </div>
    </div>
  )
}
