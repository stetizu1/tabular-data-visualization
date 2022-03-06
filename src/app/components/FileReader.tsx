import React, { FunctionComponent } from 'react'
import { DataType } from '../helpers/data'

export interface FileReaderProps {
  setData: (data: DataType[]) => void
}

export const FileReader: FunctionComponent<FileReaderProps> = ({ setData }) => {
  return (
    <div className="App">
      <form>
        <input
          type="file"
          onChange={async (e) => {
            if (e.target.files && e.target.files.length > 0) {
              const selectedFile = e.target.files[0]
              const text = await selectedFile.text()
              const data = JSON.parse(text) as unknown as DataType[]
              setData(data)
            }
          }}
        />
      </form>
    </div>
  )
}
