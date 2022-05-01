import { FunctionComponent, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Save } from '@mui/icons-material'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { saveSvg } from '../../../../helpers/d3/saveSvg'

import { TOP_TOOLBAR_TEXT } from '../../../../text/SiteText'

import { useDrawerButtonStyles } from '../../../../components-style/content/data-drawer/items/useDrawerButtonStyles'

import { ConfirmationDialog } from '../../common/dialogs/ConfirmationDialog'

export interface DataSaveButtonProps {
  viewType: ViewType
}

export const DataSaveButton: FunctionComponent<DataSaveButtonProps> = ({ viewType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const classes = useDrawerButtonStyles()
  const onConfirm = () => {
    saveSvg(viewType)
    setIsDialogOpen(false)
  }

  return (
    <>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title={TOP_TOOLBAR_TEXT.saveText.header}
        description={TOP_TOOLBAR_TEXT.saveText.description}
        onConfirm={onConfirm}
        onClose={() => setIsDialogOpen(false)}
        confirmText={TOP_TOOLBAR_TEXT.saveText.confirm}
        cancelText={TOP_TOOLBAR_TEXT.saveText.cancel}
      />
      <Button
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        className={classes.button}
        aria-label={TOP_TOOLBAR_TEXT.saveText.save}
      >
        <Tooltip title={TOP_TOOLBAR_TEXT.saveText.save}>
          <Save />
        </Tooltip>
      </Button>
    </>
  )
}
