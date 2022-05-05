import { useEffect, useState, VoidFunctionComponent } from 'react'
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

import { OptionType } from '../../../../../constants/data/data'

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
  const [optionsChosen, setOptionsChosen] = useState<Array<OptionType>>([])
  const [replaceValue, setReplaceValue] = useState<Array<number>>([])

  useEffect(() => {
    setOptionsChosen(Array(nullContainingAttributes.length).fill(OptionType.leave))
    setReplaceValue(Array(nullContainingAttributes.length).fill(0))
  }, [nullContainingAttributes])

  const handleNullDialogConfirm = () => {
    optionsChosen.forEach((option, idx) => {
      switch (option) {
        case OptionType.filter:
          dataset = dataset.filter((data) => data[nullContainingAttributes[idx]] !== null)
          break
        case OptionType.change:
          dataset = dataset.map((data) => {
            const att = nullContainingAttributes[idx]
            return {
              ...data,
              [att]: data[att] === null ? Number(replaceValue[idx]) : data[att],
            }
          })
          break
        case OptionType.leave:
          break
      }
    })
    setDataset(dataset)
  }

  const handleToggleChange = (val: OptionType, idx: number) => {
    setOptionsChosen((prev) => {
      const newOpts = [...prev]
      newOpts[idx] = val
      return newOpts
    })
  }
  const handleNumberChange = (val: number, idx: number) => {
    setReplaceValue((prev) => {
      const newVals = [...prev]
      newVals[idx] = val
      return newVals
    })
  }
  const options = Object.values(OptionType)
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{FILE_READER_TEXT.nullDialog.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText sx={dialogStyle.description}>{FILE_READER_TEXT.nullDialog.description}</DialogContentText>
        {nullContainingAttributes.map((attribute, idx) => {
          const option = optionsChosen[idx]
          return (
            <Box key={attribute} sx={dialogStyle.innerContent}>
              <Typography sx={dialogStyle.attHeader}>{`${
                FILE_READER_TEXT.nullDialog.attribute
              } ${otherCasesToWhitespaces(attribute)}`}</Typography>
              <ToggleButtonGroup
                sx={dialogStyle.toggleDialogGroup}
                value={option}
                exclusive
                onChange={(e, value) => handleToggleChange(value, idx)}
              >
                {options.map((opt, idx) => (
                  <ToggleButton sx={dialogStyle.toggleDialogButton} value={opt} key={idx}>
                    {FILE_READER_TEXT.nullDialog.optionsText[opt]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Box sx={dialogStyle.contentBox}>
                <Typography sx={dialogStyle.text}>{FILE_READER_TEXT.nullDialog.optionsDescription[option]}</Typography>
                {option === OptionType.change && (
                  <TextField
                    label={FILE_READER_TEXT.nullDialog.changeTo}
                    type="number"
                    sx={dialogStyle.numInput}
                    defaultValue={replaceValue[idx]}
                    onChange={(e) => handleNumberChange(Number(e.target.value), idx)}
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
