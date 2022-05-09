import { useCallback, useEffect, useState, VoidFunctionComponent } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'

import { SelectableDataType } from '../../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../../helpers/data/formatText'

import { OPTION_TYPES, OptionType } from '../../../../../constants/data/data'

import { FILE_READER_TEXT } from '../../../../../text/SiteText'

import { dialogStyle } from '../../../../../components-style/content/common/dialogStyle'

export interface NullDialogProps {
  isOpen: boolean
  onClose: () => void
  nullContainingAttributes: Array<keyof SelectableDataType>
  dataset: Array<SelectableDataType>
  setDataset: (dataset: Array<SelectableDataType>) => void
}

export const NullDialog: VoidFunctionComponent<NullDialogProps> = ({
  isOpen,
  onClose,
  nullContainingAttributes,
  dataset,
  setDataset,
}) => {
  const [optionsChosen, setOptionsChosen] = useState<Record<keyof SelectableDataType, OptionType>>(
    Object.fromEntries(nullContainingAttributes.map((att) => [att, OptionType.leave])),
  )
  const [replaceValue, setReplaceValue] = useState<Record<keyof SelectableDataType, string>>(
    Object.fromEntries(nullContainingAttributes.map((att) => [att, ``])),
  )

  useEffect(() => {
    setOptionsChosen(Object.fromEntries(nullContainingAttributes.map((att) => [att, OptionType.leave])))
    setReplaceValue(Object.fromEntries(nullContainingAttributes.map((att) => [att, ``])))
  }, [nullContainingAttributes])

  const getFixedDataset = useCallback(
    (dataset: SelectableDataType[], attribute: keyof SelectableDataType) => {
      switch (optionsChosen[attribute]) {
        case OptionType.filter:
          return dataset.filter((data) => data[attribute] !== null)
        case OptionType.change: {
          const newValue = !isNaN(Number(replaceValue[attribute]))
            ? Number(replaceValue[attribute])
            : replaceValue[attribute]
          return dataset.map((data) => ({
            ...data,
            [attribute]: data[attribute] === null ? newValue : data[attribute],
          }))
        }
        case OptionType.leave:
          return dataset
      }
    },
    [optionsChosen, replaceValue],
  )

  const handleNullDialogConfirm = useCallback(() => {
    let datasetFixed: SelectableDataType[] = dataset
    nullContainingAttributes.forEach((attribute) => {
      datasetFixed = getFixedDataset(datasetFixed, attribute)
    })
    setDataset(datasetFixed)
  }, [dataset, getFixedDataset, nullContainingAttributes, setDataset])

  const handleToggleChange = useCallback(
    (value: OptionType, attribute: keyof SelectableDataType) =>
      setOptionsChosen((prev) => ({
        ...prev,
        [attribute]: value,
      })),
    [],
  )
  const handleReplaceChange = useCallback(
    (value: string, attribute: keyof SelectableDataType) =>
      setReplaceValue((prev) => ({
        ...prev,
        [attribute]: value,
      })),
    [],
  )

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{FILE_READER_TEXT.nullDialog.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText sx={dialogStyle.description}>{FILE_READER_TEXT.nullDialog.description}</DialogContentText>
        {nullContainingAttributes.map((attribute) => {
          const option = optionsChosen[attribute]
          return (
            <Box key={attribute} sx={dialogStyle.innerContent}>
              <Typography sx={dialogStyle.attHeader}>{`${
                FILE_READER_TEXT.nullDialog.attribute
              } ${otherCasesToWhitespaces(attribute)}`}</Typography>
              <ToggleButtonGroup
                sx={dialogStyle.toggleDialogGroup}
                value={option}
                exclusive
                onChange={(e, value) => handleToggleChange(value, attribute)}
              >
                {OPTION_TYPES.map((optType, idx) => (
                  <ToggleButton sx={dialogStyle.toggleDialogButton} value={optType} key={idx}>
                    {FILE_READER_TEXT.nullDialog.optionsText[optType]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Box sx={dialogStyle.contentBox}>
                <Typography sx={dialogStyle.text}>{FILE_READER_TEXT.nullDialog.optionsDescription[option]}</Typography>
                {option === OptionType.change && (
                  <TextField
                    label={FILE_READER_TEXT.nullDialog.changeTo}
                    sx={dialogStyle.textInput}
                    defaultValue={replaceValue[attribute]}
                    onChange={(e) => handleReplaceChange(e.target.value, attribute)}
                  />
                )}
              </Box>
            </Box>
          )
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleNullDialogConfirm} sx={dialogStyle.button} autoFocus>
          {FILE_READER_TEXT.nullDialog.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
