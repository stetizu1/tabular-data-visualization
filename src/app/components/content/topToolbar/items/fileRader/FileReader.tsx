import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { DataType, SelectableDataType } from '../../../../../types/data/data'
import { DataLoadState } from '../../../../../types/data/dataLoadState'

import { useFileReaderStyle } from './useFileReaderStyle'

export interface FileReaderDataProps {
  setData: (data: ReadonlyArray<SelectableDataType> | null) => void
  setDataLoadState: Dispatch<SetStateAction<DataLoadState>>
}

export type FileReaderProps = FileReaderDataProps

export const addSelected = (data: ReadonlyArray<DataType>): ReadonlyArray<SelectableDataType> =>
  data.map((d) => ({ ...d, selected: false }))

export const FileReader: FunctionComponent<FileReaderProps> = ({ setData, setDataLoadState }) => (
  <input
    className={useFileReaderStyle().input}
    type="file"
    onChange={async (e) => {
      if (e.target.files?.length) {
        const selectedFile = e.target.files[0]
        setDataLoadState(DataLoadState.Loading)
        setData(null)
        const text = await selectedFile.text()
        const data = JSON.parse(text) as ReadonlyArray<DataType>
        setData(addSelected(data))
        setDataLoadState(DataLoadState.Loaded)
      }
    }}
  />
)
