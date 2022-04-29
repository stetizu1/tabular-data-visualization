import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { TextField } from '@mui/material'

import { MarginArray } from '../../../../types/styling/Margin'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { useMarginInputStyles } from '../../../../components-style/content/data-drawer/items/useMarginInputStyles'

import { Settings } from '../../views/Settings'

export interface MarginInputProps {
  margins: MarginArray
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
}

export const MarginInput: FunctionComponent<MarginInputProps> = ({ margins, setSettings, viewType }) => {
  const classes = useMarginInputStyles()
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
      <div className={classes.horizontal}>
        <TextField
          label={`Top`}
          type="number"
          defaultValue={margins[0]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, pattern: `[0-9]*`, min: 0, max: 1000 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 0)}
        />
        <TextField
          label={`Right`}
          type="number"
          defaultValue={margins[1]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, pattern: `[0-9]*`, min: 0, max: 1000 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 1)}
        />
      </div>
      <div className={classes.horizontal}>
        <TextField
          label={`Bottom`}
          type="number"
          defaultValue={margins[2]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, pattern: `[0-9]*`, min: 0, max: 1000 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 2)}
        />
        <TextField
          label={`Left`}
          type="number"
          defaultValue={margins[3]}
          className={classes.textField}
          inputProps={{ inputMode: `numeric`, pattern: `[0-9]*`, min: 0, max: 1000 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 3)}
        />
      </div>
    </div>
  )
}
