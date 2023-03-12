import { Close } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { FC, useCallback, useState } from 'react'

import { VIEW_TOP_TEXT } from '@/text/viewTopText'

import { inlineButtonStyles } from '@/components-style/content/common/inlineButtonStyles'

import { ConfirmationDialog } from '../../common/dialogs/ConfirmationDialog'

interface ViewCloseButtonProps {
  onRemove: () => void
}

export const ViewCloseButton: FC<ViewCloseButtonProps> = ({ onRemove }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const onConfirm = useCallback(() => {
    onRemove()
    setIsDialogOpen(false)
  }, [onRemove])

  return (
    <>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title={VIEW_TOP_TEXT.closeDialog.header}
        description={VIEW_TOP_TEXT.closeDialog.description}
        onConfirm={onConfirm}
        onClose={() => setIsDialogOpen(false)}
        confirmText={VIEW_TOP_TEXT.closeDialog.confirm}
        cancelText={VIEW_TOP_TEXT.closeDialog.cancel}
      />
      <Button onClick={() => setIsDialogOpen(true)} sx={inlineButtonStyles.buttonClose}>
        <Tooltip title={VIEW_TOP_TEXT.close}>
          <Close />
        </Tooltip>
      </Button>
    </>
  )
}
