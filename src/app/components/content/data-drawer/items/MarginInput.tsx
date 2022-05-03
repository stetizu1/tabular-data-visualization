import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { TextField, Typography } from '@mui/material'

import { MarginArray } from '../../../../types/styling/Margin'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { MARGIN_MENU_TEXT } from '../../../../text/views-and-menus/common'

import { useNumberInputStyles } from '../../../../components-style/content/data-drawer/items/useNumberInputStyles'

import { Settings } from '../../views/Settings'

export interface MarginInputProps {
  margins: MarginArray
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
}

export const MarginInput: VoidFunctionComponent<MarginInputProps> = ({ margins, setSettings, viewType }) => {
  const classes = useNumberInputStyles()
  const handleMarginChange = (newMargin: number, idx: number) => {
    const newMargins = [...margins]
    newMargins[idx] = newMargin

    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          margins: newMargins,
        },
      }
    })
  }
  return (
    <div className={classes.vertical}>
      <Typography className={classes.text}>{MARGIN_MENU_TEXT.header}</Typography>
      <div className={classes.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.top}
          type="number"
          defaultValue={margins[0]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 0)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.right}
          type="number"
          defaultValue={margins[1]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 1)}
        />
      </div>
      <div className={classes.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.bottom}
          type="number"
          defaultValue={margins[2]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 2)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.left}
          type="number"
          defaultValue={margins[3]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 3)}
        />
      </div>
    </div>
  )
}
