import { FunctionComponent } from 'react'

import { DataType, SelectableDataType } from '../../../../../types/data/data'

import { useFileReaderStyle } from './useFileReaderStyle'

export interface FileReaderDataProps {
  setData: (data: SelectableDataType[] | null) => void
}

export type FileReaderProps = FileReaderDataProps

export const addSelected = (data: DataType[]): SelectableDataType[] => data.map((d) => ({ ...d, selected: false }))

export const FileReader: FunctionComponent<FileReaderProps> = ({ setData }) => (
  <input
    className={useFileReaderStyle().input}
    type="file"
    onChange={async (e) => {
      if (e.target.files?.length) {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
          setData(null)
          const text = await selectedFile.text()
          const data = JSON.parse(text) as DataType[]
          setData(addSelected(data))
        }
      }
    }}
  />
)
