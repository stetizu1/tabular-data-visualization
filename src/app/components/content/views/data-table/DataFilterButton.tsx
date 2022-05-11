import { Dispatch, SetStateAction, VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { FilterList } from '@mui/icons-material'

import { BUTTON_VARIANT } from '../../../../constants/mui'

import { TOP_TOOLBAR_TEXT } from '../../../../text/siteText'

import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'

export interface DataSaveButtonProps {
  showFilter?: boolean
  setShowFilter: Dispatch<SetStateAction<boolean | undefined>>
}

export const DataFilterButton: VoidFunctionComponent<DataSaveButtonProps> = ({ showFilter, setShowFilter }) => (
  <Tooltip title={TOP_TOOLBAR_TEXT.filter}>
    <Button variant={BUTTON_VARIANT.text} onClick={() => setShowFilter(!showFilter)} sx={inlineButtonStyles.button}>
      <FilterList sx={showFilter ? inlineButtonStyles.buttonActive : {}} />
    </Button>
  </Tooltip>
)
