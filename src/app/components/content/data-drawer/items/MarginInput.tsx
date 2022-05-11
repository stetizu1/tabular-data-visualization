import { Dispatch, VoidFunctionComponent, SetStateAction, useCallback, useState, useEffect } from 'react'
import { Box, TextField, Typography } from '@mui/material'

import { MarginArray } from '../../../../types/styling/Margin'
import { Settings } from '../../../../types/views/settings/Settings'

import { useDebounce } from '../../../../helpers/react/useDebounce'

import { ViewType } from '../../../../constants/views-general/ViewType'
import { TEXT_INPUT_DEBOUNCE } from '../../../../constants/debounce/debounce'
import { INPUT_PROPS, INPUT_TYPE } from '../../../../constants/others'

import { MARGIN_MENU_TEXT } from '../../../../text/views-and-settings/common'

import { numberInputStyles } from '../../../../components-style/content/data-drawer/items/numberInputStyles'
import { settingsTextStyle } from '../../../../components-style/content/data-drawer/items/settingsTextStyle'

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
      <Typography sx={settingsTextStyle.text}>{MARGIN_MENU_TEXT.header}</Typography>
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.top}
          type={INPUT_TYPE.number}
          defaultValue={margins[0]}
          sx={numberInputStyles.textField}
          inputProps={INPUT_PROPS.positiveNumber}
          onChange={(e) => handleMarginChange(Number(e.target.value), 0)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.right}
          type={INPUT_TYPE.number}
          defaultValue={margins[1]}
          sx={numberInputStyles.textField}
          inputProps={INPUT_PROPS.positiveNumber}
          onChange={(e) => handleMarginChange(Number(e.target.value), 1)}
        />
      </Box>
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.bottom}
          type={INPUT_TYPE.number}
          defaultValue={margins[2]}
          sx={numberInputStyles.textField}
          inputProps={INPUT_PROPS.positiveNumber}
          onChange={(e) => handleMarginChange(Number(e.target.value), 2)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.left}
          type={INPUT_TYPE.number}
          defaultValue={margins[3]}
          sx={numberInputStyles.textField}
          inputProps={INPUT_PROPS.positiveNumber}
          onChange={(e) => handleMarginChange(Number(e.target.value), 3)}
        />
      </Box>
    </Box>
  )
}
