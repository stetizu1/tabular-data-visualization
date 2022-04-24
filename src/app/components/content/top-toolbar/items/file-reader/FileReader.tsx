import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { DataType, SelectableDataType } from '../../../../../types/data/data'

import { CsvParse, isArrayOfDataType } from '../../../../../helpers/data/dataConvertors'

import { DataLoadState } from '../../../../../constants/data/dataLoadState'

import { FILE_READER_ERROR_TEXT } from '../../../../../text/errorText'

import { useFileReaderStyle } from '../../../../../components-style/content/top-toolbar/items/file-reader/useFileReaderStyle'

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

export const FileReader: FunctionComponent<FileReaderProps> = ({ setDataset, setDataLoadState }) => (
  <input
    className={useFileReaderStyle().input}
    type="file"
    onChange={async (e) => {
      if (e.target.files?.length) {
        setDataLoadState(DataLoadState.Loading)
        setDataset(null)

        const selectedFile = e.target.files[0]
        const fileType = selectedFile.type
        let data: DataType[] = []

        switch (fileType) {
          case AcceptableFileTypes.json: {
            const text = await selectedFile.text()
            data = JSON.parse(text)
            break
          }
          case AcceptableFileTypes.csv: {
            const textCsv = await selectedFile.text()
            data = CsvParse(textCsv)
            break
          }
          default: {
            setDataLoadState(DataLoadState.NoData)
            alert(FILE_READER_ERROR_TEXT.unsupportedFile)
            return
          }
        }
        if (!isArrayOfDataType(data)) {
          setDataLoadState(DataLoadState.NoData)
          alert(FILE_READER_ERROR_TEXT.unsupportedFileFormat)
          return
        }
        setDataset(addSelected(data))
        setDataLoadState(DataLoadState.Loaded)
      }
    }}
  />
)
