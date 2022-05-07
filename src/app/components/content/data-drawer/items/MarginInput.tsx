import { Dispatch, VoidFunctionComponent, SetStateAction, useCallback, useState, useEffect } from 'react'
import { Box, TextField, Typography } from '@mui/material'

import { MarginArray } from '../../../../types/styling/Margin'
import { Settings } from '../../../../types/views/settings/Settings'

import { useDebounce } from '../../../../helpers/react/useDebounce'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { TEXT_INPUT_DEBOUNCE } from '../../../../constants/debounce/debounce'

import { MARGIN_MENU_TEXT } from '../../../../text/views-and-menus/common'

import { numberInputStyles } from '../../../../components-style/content/data-drawer/items/numberInputStyles'
import { menuTextStyle } from '../../../../components-style/content/data-drawer/items/menuTextStyle'

export interface MarginInputProps {
  margins: MarginArray
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
  handleChangeSettings?: () => void
}

export const MarginInput: VoidFunctionComponent<MarginInputProps> = ({
  margins,
  setSettings,
  viewType,
  handleChangeSettings,
}) => {
  const [currentMargins, setCurrentMargins] = useState<MarginArray>(margins)
  const debouncedMargins = useDebounce(currentMargins, TEXT_INPUT_DEBOUNCE)

  const handleMarginChange = useCallback((newMargin: number, idx: number) => {
    setCurrentMargins((oldMargins) => {
      const newMargins: MarginArray = [...oldMargins]
      newMargins[idx] = newMargin
      return newMargins
    })
  }, [])

  useEffect(() => {
    if (handleChangeSettings) handleChangeSettings()
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          margins: debouncedMargins,
        },
      }
    })
  }, [debouncedMargins, handleChangeSettings, setSettings, viewType])

  return (
    <Box sx={numberInputStyles.vertical}>
      <Typography sx={menuTextStyle.text}>{MARGIN_MENU_TEXT.header}</Typography>
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.top}
          type="number"
          defaultValue={margins[0]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 0)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.right}
          type="number"
          defaultValue={margins[1]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 1)}
        />
      </Box>
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.bottom}
          type="number"
          defaultValue={margins[2]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 2)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.left}
          type="number"
          defaultValue={margins[3]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 3)}
        />
      </Box>
    </Box>
  )
}
