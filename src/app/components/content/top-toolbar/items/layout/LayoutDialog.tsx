import { Dispatch, SetStateAction, VoidFunctionComponent } from 'react'
import { Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'

import { GridLayoutItem } from '../../../../../types/views/Grid'

import { LAYOUT_IMAGES, LAYOUT_OPTIONS } from '../../../../../constants/views/common'

import { LAYOUT_DIALOG_TEXT } from '../../../../../text/siteText'

import { dialogStyle } from '../../../../../components-style/content/common/dialogStyle'
import { otherCasesToWhitespaces } from '../../../../../helpers/data/formatText'

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
      <DialogTitle>{LAYOUT_DIALOG_TEXT.title}</DialogTitle>
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
              component="img"
              sx={dialogStyle.image}
              image={LAYOUT_IMAGES[idx]}
              alt={LAYOUT_DIALOG_TEXT.alt + idx}
            />
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  )
}
