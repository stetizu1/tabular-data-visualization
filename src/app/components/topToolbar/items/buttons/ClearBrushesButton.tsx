import React, { FunctionComponent } from 'react'
import { Button } from '@material-ui/core'
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset'
import { useClearBrushesButton } from './useClearBrushesButton'

export interface ClearBrushesButtonDataProps {
  clearBrushes: () => void
  brushingActive: boolean
}

export type ClearBrushesButtonProps = ClearBrushesButtonDataProps

export const ClearBrushesButton: FunctionComponent<ClearBrushesButtonProps> = ({ clearBrushes, brushingActive }) => {
  const classes = useClearBrushesButton()
  return <>
    <Button variant="contained" onClick={() => clearBrushes()} className={classes.button} disabled={!brushingActive}>
      <FormatColorResetIcon />
    </Button>
  </>
}
