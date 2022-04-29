import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { AutoGraph } from '@mui/icons-material'

import { DataType, SelectableDataType } from '../../../../../types/data/data'

import { CsvParse, isArrayOfDataType } from '../../../../../helpers/data/dataConvertors'

import { DataLoadError, DataLoadState } from '../../../../../constants/data/dataLoadState'
import { SampleDataset, sampleDatasetIcons, sampleDatasets } from '../../../../../constants/data/sampleDataset'

import { TOP_TOOLBAR_TEXT } from '../../../../../text/SiteText'

import { useFileReaderStyle } from '../../../../../components-style/content/top-toolbar/items/file-reader/useFileReaderStyle'

import { ClickableButton } from '../buttons/ClickableButton'
import { SelectionDialog } from '../dialogs/SelectionDialog'
import { InformationDialog } from '../dialogs/InformationDialog'

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
  const [isSampleDataDialogOpen, setIsSampleDataDialogOpen] = useState(false)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [alertDialogText, setAlertDialogText] = useState<{ title: string; description: string } | null>(null)

  const text = TOP_TOOLBAR_TEXT.fileReader
  const optionsKeys = Object.values(SampleDataset)
  const handleMagicClick = () => {
    setDataLoadState(DataLoadState.NoData)
    setDataset(null)
    setIsSampleDataDialogOpen(true)
  }
  const handleListItemClick = (optionKey: SampleDataset) => {
    setDataLoadState(DataLoadState.Loading)
    setIsSampleDataDialogOpen(false)
    const dataset = sampleDatasets[optionKey]
    setDataset(addSelected(dataset))
    setDataLoadState(DataLoadState.Loaded)
  }

  return (
    <>
      <SelectionDialog
        isOpen={isSampleDataDialogOpen}
        onClose={() => setIsSampleDataDialogOpen(false)}
        title={text.sampleDataDialogTitle}
        options={optionsKeys.map((key) => ({
          key,
          label: text.sampleDataDialogText[key],
          icon: sampleDatasetIcons[key],
        }))}
        handleListItemClick={handleListItemClick}
      />
      <InformationDialog
        isOpen={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
        title={alertDialogText?.title}
        description={alertDialogText?.description}
        confirmText={text.alertDialog.confirm}
        alert={true}
      />
      <ClickableButton onClick={handleMagicClick} icon={<AutoGraph />} label={text.sampleDataLabel} />
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
                setAlertDialogText(text.alertDialog[DataLoadError.unsupportedFile])
                setIsAlertDialogOpen(true)
                return
              }
            }
            if (!isArrayOfDataType(dataset)) {
              setDataLoadState(DataLoadState.NoData)
              setAlertDialogText(text.alertDialog[DataLoadError.unsupportedFileFormat])
              setIsAlertDialogOpen(true)
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
