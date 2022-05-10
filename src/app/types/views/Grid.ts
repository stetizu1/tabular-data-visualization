import { ComponentProps } from 'react'
import GridLayout from 'react-grid-layout'
import { ViewType } from '../../constants/views-general/ViewType'

/**
 * Typings for react-grid-layout
 */

type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

export type LayoutArray = ComponentProps<typeof GridLayout>[`layout`]

export type GridLayoutItem = ArrayElement<LayoutArray> & {
  i: ViewType
}
