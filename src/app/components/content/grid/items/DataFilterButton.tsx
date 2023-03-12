import { FilterList } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { Dispatch, FC, SetStateAction } from 'react'

import { BUTTON_VARIANT } from '@/constants/mui'

import { inlineButtonStyles } from '@/components-style/content/common/inlineButtonStyles'
import { VIEW_TOP_TEXT } from '@/text/viewTopText'

export interface DataFilterButtonProps {
  showFilter?: boolean
  setShowFilter: Dispatch<SetStateAction<boolean | undefined>>
}

export const DataFilterButton: FC<DataFilterButtonProps> = ({ showFilter, setShowFilter }) => (
  <Button variant={BUTTON_VARIANT.text} onClick={() => setShowFilter(!showFilter)} sx={inlineButtonStyles.button}>
    <Tooltip title={VIEW_TOP_TEXT.filter}>
      <FilterList sx={showFilter ? inlineButtonStyles.buttonActive : {}} />
    </Tooltip>
  </Button>
)
