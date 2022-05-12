import { Dispatch, SetStateAction, VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { FilterList } from '@mui/icons-material'

import { BUTTON_VARIANT } from '../../../../constants/mui'

import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'
import { VIEW_TOP_TEXT } from '../../../../text/viewTopText'

export interface DataFilterButtonProps {
  showFilter?: boolean
  setShowFilter: Dispatch<SetStateAction<boolean | undefined>>
}

export const DataFilterButton: VoidFunctionComponent<DataFilterButtonProps> = ({ showFilter, setShowFilter }) => (
  <Button variant={BUTTON_VARIANT.text} onClick={() => setShowFilter(!showFilter)} sx={inlineButtonStyles.button}>
    <Tooltip title={VIEW_TOP_TEXT.filter}>
      <FilterList sx={showFilter ? inlineButtonStyles.buttonActive : {}} />
    </Tooltip>
  </Button>
)
