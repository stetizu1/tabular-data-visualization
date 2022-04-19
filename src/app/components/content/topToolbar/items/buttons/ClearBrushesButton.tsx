import { FunctionComponent } from 'react'
import { Button } from '@mui/material'
import { FormatColorReset } from '@mui/icons-material'

import { useClearBrushesButton } from './useClearBrushesButton'

export interface ClearBrushesButtonDataProps {
  clearBrushes: () => void
  brushingActive: boolean
}

export type ClearBrushesButtonProps = ClearBrushesButtonDataProps

export const ClearBrushesButton: FunctionComponent<ClearBrushesButtonProps> = ({ clearBrushes, brushingActive }) => {
  const classes = useClearBrushesButton()
  return (
    <>
      <Button variant="contained" onClick={() => clearBrushes()} className={classes.button} disabled={!brushingActive}>
        <FormatColorReset />
      </Button>
    </>
  )
}
