import { Save } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { FC, useCallback, useState } from 'react'

import { getSaveIsDisabled, saveSvg } from '@/helpers/d3/saveSvg'

import { ViewType } from '@/constants/views-general/ViewType'

import { inlineButtonStyles } from '@/components-style/content/common/inlineButtonStyles'

import { VIEW_TOP_TEXT } from '@/text/viewTopText'
import { ConfirmationDialog } from '../../common/dialogs/ConfirmationDialog'

export interface ViewSaveButtonProps {
  viewType: ViewType
}

export const ViewSaveButton: FC<ViewSaveButtonProps> = ({ viewType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onConfirm = useCallback(() => {
    saveSvg(viewType)
    setIsDialogOpen(false)
  }, [viewType])

  return (
    <>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title={VIEW_TOP_TEXT.saveDialog.header}
        description={VIEW_TOP_TEXT.saveDialog.description}
        onConfirm={onConfirm}
        onClose={() => setIsDialogOpen(false)}
        confirmText={VIEW_TOP_TEXT.saveDialog.confirm}
        cancelText={VIEW_TOP_TEXT.saveDialog.cancel}
      />
      <Button
        onClick={() => setIsDialogOpen(true)}
        disabled={getSaveIsDisabled(viewType)}
        sx={inlineButtonStyles.button}
      >
        <Tooltip title={VIEW_TOP_TEXT.save}>
          <Save />
        </Tooltip>
      </Button>
    </>
  )
}
