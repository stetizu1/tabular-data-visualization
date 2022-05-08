import { useCallback, useEffect, useMemo, useRef, VoidFunctionComponent } from 'react'
import { scaleOrdinal, select, selectAll } from 'd3'
import { Box } from '@mui/material'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ParallelSetsBundledSettings } from '../../../../types/views/settings/ParallelSetsBundledSettings'
import { SelectableDataType } from '../../../../types/data/data'
import { Margin } from '../../../../types/styling/Margin'

import { TOGGLE_TEXT_Y_SHIFT } from '../../../../helpers/d3/attributeGetters'
import { getClass, getEverything, getTranslate } from '../../../../helpers/d3/stringGetters'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'
import { MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelSetsBundled'

import { PARALLEL_SETS_BUNDLED_TEXT } from '../../../../text/views-and-menus/parallelSetsBundled'

import { PLOT_FONT_BOX_SIZE } from '../../../../styles/font'

import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'
import { getParallelSetsBundledStyle } from '../../../../components-style/content/views/parallel-sets-bundled/parallelSetsBundledStyle'

export interface ParallelSetsBundledProps extends VisualizationView, Brushable, ParallelSetsBundledSettings {}

export const PARALLEL_SETS_BUNDLED_CLASS = `parallelSetsBundled`
export const SELECTED_CLASS = `parallelSetsBundledSelected`

export const ParallelSetsBundled: VoidFunctionComponent<ParallelSetsBundledProps> = ({
  width,
  height,
  dataset,
  displayAttributes,
  categoryAttribute,
  refreshViews,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  isBrushingOnEndOfMove,
  colorCategory,
  margins,
  opacity,
  brushColor,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)
  const upperPadding = TOGGLE_TEXT_Y_SHIFT + PLOT_FONT_BOX_SIZE
  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height - upperPadding]

  // selected coloring todo
  selectAll(getClass(PARALLEL_SETS_BUNDLED_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)

  const createParallelSetsBundled = useCallback(() => {
    const node = component.current
    if (!node) return
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear
  }, [])

  useEffect(
    () => createParallelSetsBundled(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayAttributes, categoryAttribute, innerWidth, innerHeight, colorCategory],
  )

  if (innerWidth < 0 || innerHeight < 0) return <Box />
  if (displayAttributes.length >= MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT) {
    return (
      <Box
        sx={getParallelSetsBundledStyle(opacity, isBrushingActive, brushColor)}
        id={CONTAINER_SAVE_ID[ViewType.ParallelSetsBundled]}
      >
        <svg width={width} height={height} id={SAVE_ID[ViewType.ParallelSetsBundled]}>
          <g
            ref={component}
            width={innerWidth}
            height={innerHeight}
            transform={getTranslate([margin.left, margin.top + upperPadding])}
          />
        </svg>
      </Box>
    )
  }
  return <Box sx={getViewsNotDisplayStyle(width, height, margin)}>{PARALLEL_SETS_BUNDLED_TEXT.unavailable}</Box>
}
