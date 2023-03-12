/**
 * Component reading the file data
 */
import { AutoGraph, UploadFile } from '@mui/icons-material'
import { Box, Button, Tooltip } from '@mui/material'
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import { DataType, SelectableDataType } from '@/types/data/data'

import { getAttributeKeys } from '@/helpers/data/data'
import { isArrayOfDataType } from '@/helpers/data/dataCheckers'
import { CsvParse } from '@/helpers/data/dataParsers'

import { AcceptableFileTypes } from '@/constants/data/data'
import { DataLoadError } from '@/constants/data/DataLoadError'
import { DataLoadState } from '@/constants/data/DataLoadState'
import {
  SampleDataset,
  sampleDatasetIcons,
  sampleDatasets,
  SAMPLE_DATASET_OPTIONS,
} from '@/constants/data/sampleDataset'
import { BUTTON_VARIANT, COMPONENT_TYPE } from '@/constants/mui'
import { INPUT_TYPE } from '@/constants/others'

import { FILE_READER_TEXT } from '@/text/siteText'

import {
  fileReaderStyle,
  getFileReaderBoxStyle,
} from '@/components-style/content/top-toolbar/items/file-reader/fileReaderStyle'

import { InformationDialog } from '../../../common/dialogs/InformationDialog'
import { SelectionDialog } from '../../../common/dialogs/SelectionDialog'

import { ClickableButton } from '../buttons/ClickableButton'
import { NullDialog } from './NullDialog'

export interface FileReaderDataProps {
  setDataset: (dataset: ReadonlyArray<SelectableDataType> | null) => void
  setDataLoadState: Dispatch<SetStateAction<DataLoadState>>
}

export interface FileReaderProps extends FileReaderDataProps {
  isHighlighted: boolean
}

export const addSelected = (data: Array<DataType>): Array<SelectableDataType> =>
  data.map((d) => ({ ...d, selected: false }))

const FILE_INPUT_ID = `FILE_INPUT`

export const FileReader: FC<FileReaderProps> = ({ setDataset, setDataLoadState, isHighlighted }) => {
  const [isSampleDataDialogOpen, setIsSampleDataDialogOpen] = useState(false)

  const [isNullDialogOpen, setIsNullDialogOpen] = useState(false)
  const [nullContainingAttributes, setNullContainingAttributes] = useState<Array<keyof SelectableDataType>>([])
  const [rawDataset, setRawDataset] = useState<Array<SelectableDataType>>([])

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [alertDialogText, setAlertDialogText] = useState<{ title: string; description: string } | null>(null)

  const handleListItemClick = useCallback(
    (optionKey: SampleDataset) => {
      setIsSampleDataDialogOpen(false)
      const dataset = sampleDatasets[optionKey]
      setDataset(addSelected(dataset))
      setDataLoadState(DataLoadState.Loaded)
    },
    [setDataLoadState, setDataset],
  )

  const closeDialog = useCallback(() => {
    setIsNullDialogOpen(false)
    setRawDataset([])
    setNullContainingAttributes([])
  }, [])

  const getDatasetFromFile = useCallback(
    async (fileType: AcceptableFileTypes | string, selectedFile: File): Promise<DataType[] | null> => {
      switch (fileType) {
        case AcceptableFileTypes.json: {
          const text = await selectedFile.text()
          return JSON.parse(text)
        }
        case AcceptableFileTypes.csv: {
          const textCsv = await selectedFile.text()
          return CsvParse(textCsv)
        }
        default: {
          return null
        }
      }
    },
    [],
  )

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        setDataLoadState(DataLoadState.Loading)
        const selectedFile = e.target.files[0]
        const fileType = selectedFile.type
        const dataset = await getDatasetFromFile(fileType, selectedFile)

        if (dataset === null || !isArrayOfDataType(dataset)) {
          const dataLoadErrorType = dataset === null ? DataLoadError.unsupportedFile : DataLoadError.unsupportedFormat
          setDataLoadState(DataLoadState.NoData)
          setAlertDialogText(FILE_READER_TEXT.alertDialog[dataLoadErrorType])
          setIsAlertDialogOpen(true)
          setDataset(null)
          return
        }

        const selectableDataset = addSelected(dataset)
        const nullContainingAttributes = getAttributeKeys(selectableDataset).filter((att) =>
          dataset.some((data) => data[att] === null),
        )
        if (nullContainingAttributes.length) {
          setNullContainingAttributes(nullContainingAttributes)
          setRawDataset(selectableDataset)
          setIsNullDialogOpen(true)
          const fileEl = document.getElementById(FILE_INPUT_ID) as unknown as { value: null }
          fileEl.value = null
          return
        }
        setDataset(selectableDataset)
        setDataLoadState(DataLoadState.Loaded)
      }
    },
    [getDatasetFromFile, setDataLoadState, setDataset],
  )

  return (
    <>
      <SelectionDialog
        isOpen={isSampleDataDialogOpen}
        onClose={() => setIsSampleDataDialogOpen(false)}
        title={FILE_READER_TEXT.sampleDataDialogTitle}
        options={SAMPLE_DATASET_OPTIONS.map((key) => ({
          key,
          label: FILE_READER_TEXT.sampleDataDialogText[key],
          icon: sampleDatasetIcons[key],
        }))}
        handleListItemClick={handleListItemClick}
      />
      <InformationDialog
        isOpen={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
        title={alertDialogText?.title}
        description={alertDialogText?.description}
        confirmText={FILE_READER_TEXT.alertDialog.confirm}
        alert={true}
      />
      <NullDialog
        isOpen={isNullDialogOpen}
        onClose={() => {
          setDataLoadState(DataLoadState.NoData)
          closeDialog()
        }}
        nullContainingAttributes={nullContainingAttributes}
        dataset={rawDataset}
        setDataset={(dataset) => {
          setDataset(dataset)
          setDataLoadState(DataLoadState.Loaded)
          closeDialog()
        }}
      />
      <Box sx={getFileReaderBoxStyle(isHighlighted)}>
        <ClickableButton
          onClick={() => setIsSampleDataDialogOpen(true)}
          icon={<AutoGraph />}
          label={FILE_READER_TEXT.sampleDataLabel}
        />
        <Button sx={fileReaderStyle.button} variant={BUTTON_VARIANT.contained} component={COMPONENT_TYPE.label}>
          <Tooltip title={FILE_READER_TEXT.button}>
            <UploadFile />
          </Tooltip>
          <span>{FILE_READER_TEXT.button}</span>
          <input type={INPUT_TYPE.file} hidden id={FILE_INPUT_ID} onChange={handleFileChange} />
        </Button>
      </Box>
    </>
  )
}
