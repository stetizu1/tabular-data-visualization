import { useCallback, useState, VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Save } from '@mui/icons-material'

import { ViewType } from '../../../constants/views/ViewType'

import { getSaveIsDisabled, saveSvg } from '../../../helpers/d3/saveSvg'

import { TOP_TOOLBAR_TEXT } from '../../../text/siteText'

import { inlineButtonStyles } from '../../../components-style/content/common/inlineButtonStyles'

import { ConfirmationDialog } from './dialogs/ConfirmationDialog'

export interface DataSaveButtonProps {
  viewType: ViewType
}

export const DataSaveButton: VoidFunctionComponent<DataSaveButtonProps> = ({ viewType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const openDialog = useCallback(() => setIsDialogOpen(true), [])
  const closeDialog = useCallback(() => setIsDialogOpen(false), [])

  const onConfirm = useCallback(() => {
    saveSvg(viewType)
    setIsDialogOpen(false)
  }, [viewType])

  return (
    <>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title={TOP_TOOLBAR_TEXT.saveText.header}
        description={TOP_TOOLBAR_TEXT.saveText.description}
        onConfirm={onConfirm}
        onClose={closeDialog}
        confirmText={TOP_TOOLBAR_TEXT.saveText.confirm}
        cancelText={TOP_TOOLBAR_TEXT.saveText.cancel}
      />
      <Button
        variant="text"
        onClick={openDialog}
        disabled={getSaveIsDisabled(viewType)}
        sx={inlineButtonStyles.button}
        aria-label={TOP_TOOLBAR_TEXT.saveText.save}
      >
        <Tooltip title={TOP_TOOLBAR_TEXT.saveText.save}>
          <Save />
        </Tooltip>
      </Button>
    </>
  )
}