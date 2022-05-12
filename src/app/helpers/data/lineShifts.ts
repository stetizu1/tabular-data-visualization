/**
 * Functions to compute line shifts for sankey graph in parallel sets
 */
import { LinkDataPoint } from '../../types/d3-sankey'

/**
 * Get width with the selection
 * @param all - count of all
 * @param selected - count of selected
 * @param width - total width of all-values line
 * @param isBrush - true if this is the selection, false if it is the other part
 */
const getSelectionWidth = (all: number, selected: number, width: number, isBrush: boolean) => {
  if (width === 0) return 0
  const selectedFraction = selected / all
  return width * (isBrush ? selectedFraction : 1 - selectedFraction)
}

/**
 Get a shift of previously processed values
 * @param valuesCount - list of values counts or undefined, if there is no color category selected
 * @param all - count of all values
 * @param width - total width of all-values line
 * @param idx - index of current value
 */
const getYFormerShift = (valuesCount: number[] | undefined, all: number, width: number, idx: number) => {
  if (!valuesCount) return 0
  const formerCount = valuesCount.slice(0, idx).reduce((sum, curr) => sum + curr, 0)
  const formerFraction = formerCount / all
  return width * formerFraction
}

/**
 * Get width for the given count
 * @param currentCount - count given
 * @param all - count of all
 * @param width - total width of all-values line
 */
const getCurrentWidth = (currentCount: number, all: number, width: number | undefined) => {
  if (!width || !currentCount) return 0
  const fraction = currentCount / all
  return width * fraction
}

/**
 * Get shift for current count and brush
 * @param currentCount - count given
 * @param selected - count of selected
 * @param all - count of all
 * @param width - total width of all-values line
 * @param valuesCounts - counts of values of given category attribute to color with due to this line
 * @param idx - index of the value processed
 * @param isBrush - true if this is the selection, false if it is the other part
 * @param isOverlay - true if brushing is in overlay mode, false if it is on top
 */
const getShift = (
  currentCount: number,
  selected: number,
  all: number,
  width: number,
  valuesCounts: number[] | undefined,
  idx: number,
  isBrush: boolean,
  isOverlay: boolean,
): number => {
  if (!currentCount) return 0

  const currentWidth = getCurrentWidth(currentCount, all, width)

  const yFormerShift = getYFormerShift(valuesCounts, all, width, idx)
  const yCatShift = -width / 2 + yFormerShift + currentWidth / 2

  if (isOverlay) {
    return yCatShift
  }
  const selectedFraction = selected / currentCount
  const yBrushShift = (currentWidth * (isBrush ? -1 * (1 - selectedFraction) : selectedFraction)) / 2
  return yCatShift + yBrushShift
}

export const getStrokeWidth = (d: LinkDataPoint, idx: number, isBrush: boolean, isOverlay?: boolean): number => {
  const currentCount = d.catAttributeValuesCounts ? d.catAttributeValuesCounts[idx] : d.value
  const currentWidth = getCurrentWidth(currentCount, d.value, d.width)

  if (!isBrush && isOverlay) return currentWidth
  return getSelectionWidth(currentCount, d.selected[idx], currentWidth, isBrush)
}

export const getYShift = (d: LinkDataPoint, idx: number, isBrush: boolean, isOverlay: boolean): number => {
  const currentCount = d.catAttributeValuesCounts ? d.catAttributeValuesCounts[idx] : d.value
  if (!d.width) return 0

  return getShift(currentCount, d.selected[idx], d.value, d.width, d.catAttributeValuesCounts, idx, isBrush, isOverlay)
}
