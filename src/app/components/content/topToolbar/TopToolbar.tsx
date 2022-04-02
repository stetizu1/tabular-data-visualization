import React, { FunctionComponent } from 'react'
import { useTopToolbar } from './useTopToolbar'
import { ClearBrushesButton, ClearBrushesButtonDataProps } from './items/buttons/ClearBrushesButton'
import { FileReader, FileReaderDataProps } from './items/fileRader/FileReader'

export type TopToolbarProps = ClearBrushesButtonDataProps & FileReaderDataProps

export const TopToolbar: FunctionComponent<TopToolbarProps> = ({ clearBrushes, setData, brushingActive }) => {
  const classes = useTopToolbar()
  return (
    <div className={classes.toolbar}>
      <div>
        <ClearBrushesButton clearBrushes={clearBrushes} brushingActive={brushingActive}/>
      </div>
      <FileReader setData={setData} />
    </div>
  )
}
