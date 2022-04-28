import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { AutoFixNormal } from '@mui/icons-material'
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import { DataType, SelectableDataType } from '../../../../../types/data/data'

import { CsvParse, isArrayOfDataType } from '../../../../../helpers/data/dataConvertors'

import { DataLoadState } from '../../../../../constants/data/dataLoadState'

import { TOP_TOOLBAR_TEXT } from '../../../../../text/SiteText'

import { useFileReaderStyle } from '../../../../../components-style/content/top-toolbar/items/file-reader/useFileReaderStyle'
import { ClickableButton } from '../buttons/ClickableButton'
import { SampleDataset, sampleDatasetIcons, sampleDatasets } from '../../../../../constants/data/SampleDataset'

export interface FileReaderDataProps {
  setDataset: (dataset: ReadonlyArray<SelectableDataType> | null) => void
  setDataLoadState: Dispatch<SetStateAction<DataLoadState>>
}

export type FileReaderProps = FileReaderDataProps

export const addSelected = (data: ReadonlyArray<DataType>): ReadonlyArray<SelectableDataType> =>
  data.map((d) => ({ ...d, selected: false }))

enum AcceptableFileTypes {
  json = `application/json`,
  csv = `text/csv`,
}

export const FileReader: FunctionComponent<FileReaderProps> = ({ setDataset, setDataLoadState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const text = TOP_TOOLBAR_TEXT.fileReader
  const options = Object.values(SampleDataset)
  const handleMagicClick = () => {
    setDataLoadState(DataLoadState.NoData)
    setDataset(null)
    setIsDialogOpen(true)
  }
  const handleListItemClick = (value: SampleDataset) => {
    setIsDialogOpen(false)
    const dataset = sampleDatasets[value]
    setDataset(addSelected(dataset))
    setDataLoadState(DataLoadState.Loaded)
  }

  return (
    <>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <DialogTitle>{text.dialogTitle}</DialogTitle>
        <List sx={{ pt: 0 }}>
          {options.map((option) => (
            <ListItem button onClick={() => handleListItemClick(option)} key={option}>
              <ListItemAvatar>
                <Avatar>{sampleDatasetIcons[option]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={text.dialogText[option]} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <ClickableButton onClick={handleMagicClick} icon={<AutoFixNormal />} label={text.label} />
      <input
        className={useFileReaderStyle().input}
        type="file"
        onChange={async (e) => {
          if (e.target.files?.length) {
            setDataLoadState(DataLoadState.Loading)
            setDataset(null)

            const selectedFile = e.target.files[0]
            const fileType = selectedFile.type
            let dataset: DataType[] = []

            switch (fileType) {
              case AcceptableFileTypes.json: {
                const text = await selectedFile.text()
                dataset = JSON.parse(text)
                break
              }
              case AcceptableFileTypes.csv: {
                const textCsv = await selectedFile.text()
                dataset = CsvParse(textCsv)
                break
              }
              default: {
                setDataLoadState(DataLoadState.NoData)
                alert(text.errors.unsupportedFile)
                return
              }
            }
            if (!isArrayOfDataType(dataset)) {
              setDataLoadState(DataLoadState.NoData)
              alert(text.errors.unsupportedFileFormat)
              return
            }
            setDataset(addSelected(dataset))
            setDataLoadState(DataLoadState.Loaded)
          }
        }}
      />
    </>
  )
}
