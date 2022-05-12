import { useCallback, useState, VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Save } from '@mui/icons-material'

import { getSaveIsDisabled, saveSvg } from '../../../../helpers/d3/saveSvg'

import { ViewType } from '../../../../constants/views-general/ViewType'

import { SAVE_TEXT } from '../../../../text/siteText'

import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'

import { ConfirmationDialog } from '../../common/dialogs/ConfirmationDialog'

export interface ViewSaveButtonProps {
  viewType: ViewType
}

export const ViewSaveButton: VoidFunctionComponent<ViewSaveButtonProps> = ({ viewType }) => {
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
        title={SAVE_TEXT.header}
        description={SAVE_TEXT.description}
        onConfirm={onConfirm}
        onClose={closeDialog}
        confirmText={SAVE_TEXT.confirm}
        cancelText={SAVE_TEXT.cancel}
      />
      <Button onClick={openDialog} disabled={getSaveIsDisabled(viewType)} sx={inlineButtonStyles.button}>
        <Tooltip title={SAVE_TEXT.save}>
          <Save />
        </Tooltip>
      </Button>
    </>
  )
}
