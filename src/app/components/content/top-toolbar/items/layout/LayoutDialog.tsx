/**
 * Dialog with default layout options.
 */
import { Dispatch, SetStateAction, VoidFunctionComponent } from 'react'
import { Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'

import { GridLayoutItem } from '../../../../../types/views/Grid'

import { otherCasesToWhitespaces } from '../../../../../helpers/data/formatText'

import { LAYOUT_OPTIONS } from '../../../../../constants/layout/layout'
import { LAYOUT_IMAGES } from '../../../../../constants/public-path'
import { COMPONENT_TYPE } from '../../../../../constants/mui'

import { TOP_TOOLBAR_TEXT } from '../../../../../text/siteText'

import { dialogStyle } from '../../../../../components-style/content/common/dialogStyle'

export interface LayoutDialogProps {
  isOpen: boolean
  setLayout: Dispatch<SetStateAction<GridLayoutItem[] | null>>
  onClose: () => void
  lastLayout: GridLayoutItem[] | null
}

export const LayoutDialog: VoidFunctionComponent<LayoutDialogProps> = ({ isOpen, onClose, setLayout, lastLayout }) => {
  const handleClose = () => {
    setLayout(lastLayout)
    onClose()
  }
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>{TOP_TOOLBAR_TEXT.layoutDialog.title}</DialogTitle>
      <Divider />
      <DialogContent>
        {LAYOUT_OPTIONS.map((layoutItems, idx) => (
          <Card
            key={idx}
            onClick={() => {
              setLayout(layoutItems)
              onClose()
            }}
            sx={dialogStyle.card}
          >
            <CardContent sx={dialogStyle.cardContent}>
              {layoutItems.map((item) => (
                <Typography sx={dialogStyle.itemText} key={item.i}>
                  {otherCasesToWhitespaces(item.i)}
                </Typography>
              ))}
            </CardContent>
            <CardMedia
              component={COMPONENT_TYPE.image}
              sx={dialogStyle.image}
              image={LAYOUT_IMAGES[idx]}
              alt={TOP_TOOLBAR_TEXT.layoutDialog.alt + idx}
            />
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  )
}
