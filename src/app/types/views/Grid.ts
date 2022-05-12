/**
 * Typings for react-grid-layout
 */
import { ComponentProps } from 'react'
import GridLayout from 'react-grid-layout'

import { ViewType } from '../../constants/views-general/ViewType'

type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

/**
 * Array of original layout items
 */
export type LayoutArray = ComponentProps<typeof GridLayout>[`layout`]

/**
 * Layout items with identificator set to view type
 */
export type GridLayoutItem = ArrayElement<LayoutArray> & {
  i: ViewType
}
