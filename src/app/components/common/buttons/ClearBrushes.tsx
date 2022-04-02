import React, { FunctionComponent } from 'react'
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

interface ClearBrushesProps {
  clearBrushes: () => void
}

export const ClearBrushes: FunctionComponent<ClearBrushesProps> = ({ clearBrushes }) => {
  return <>
    <button onClick={() => clearBrushes()} style={{ margin: 20 }}>
      <BrushOutlinedIcon />
      <CancelOutlinedIcon />
    </button>
  </>
}
