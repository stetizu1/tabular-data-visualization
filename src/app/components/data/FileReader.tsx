import React, { FunctionComponent } from 'react'
import { DataType, SelectableDataType } from '../../types/data/data'

export interface FileReaderProps {
  setData: (data: SelectableDataType[]) => void
}

export const addSelected = (data: DataType[]): SelectableDataType[] => data.map((d) => ({ ...d, selected: false }))


export const FileReader: FunctionComponent<FileReaderProps> = ({ setData }) =>
  <input
    type="file"
    onChange={async (e) => {
      if (e.target.files?.length) {
        const selectedFile = e.target.files[0]
        const text = await selectedFile.text()
        const data = JSON.parse(text) as DataType[]
        setData(addSelected(data))
      }
    }}
  />

