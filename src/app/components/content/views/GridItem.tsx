import React, { FunctionComponent, ComponentProps } from 'react'
import { useSize } from 'react-use'
import { IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import clsx from 'clsx'

import { DRAG_HANDLE, HEADER_HEIGHT, VIEW_DEFAULT_SIZE } from '../../../constants/views/common'

import { useGridItemStyle } from '../../../components-style/content/views/useGridItemStyle'

import { View } from './View'

type Props = Omit<ComponentProps<typeof View>, `width` | `height`> & {
  title: string
  onRemove: () => void
  isDragFinished: boolean
}

export const GridItem: FunctionComponent<Props> = ({ onRemove, title, isDragFinished, ...rest }) => {
  const classes = useGridItemStyle()
  const [sized] = useSize(
    ({ width, height }) => (
      <div className={classes.gridItem}>
        <div className={clsx(DRAG_HANDLE, classes.header)}>
          <Typography className={classes.text}>{title}</Typography>
          <IconButton onClick={onRemove}>
            <Close />
          </IconButton>
        </div>
        {isDragFinished && <View width={width} height={height - HEADER_HEIGHT} {...rest} />}
      </div>
    ),
    VIEW_DEFAULT_SIZE,
  )

  return sized
}
