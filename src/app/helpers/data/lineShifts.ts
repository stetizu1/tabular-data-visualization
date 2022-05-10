import { LinkDataPoint } from '../../types/d3-sankey'

const getCurrentWidth = (currentCount: number, all: number, width: number | undefined) => {
  if (!width || !currentCount) return 0
  const fraction = currentCount / all
  return width * fraction
}

const getSelectionWidth = (all: number, selected: number, width: number, isBrush: boolean) => {
  if (width === 0) return 0
  const selectedFraction = selected / all
  return width * (isBrush ? selectedFraction : 1 - selectedFraction)
}

const getYCatShiftAndCurrentWidth = (
  currentCount: number,
  selected: number,
  all: number,
  width: number,
  attributesCount: number[] | undefined,
  idx: number,
  isBrush: boolean,
  isOverlay: boolean,
): number => {
  if (!attributesCount) return 0

  const currentWidth = getCurrentWidth(currentCount, all, width)

  const formerCount = attributesCount.slice(0, idx).reduce((sum, curr) => sum + curr, 0)
  const formerFraction = formerCount / all
  const yFormerShift = width * formerFraction
  const yCatShift = -width / 2 + yFormerShift + currentWidth / 2

  if (isOverlay) {
    return yCatShift
  }
  const selectedFraction = selected / currentCount
  const yBrushShift = (currentWidth * (isBrush ? -1 * (1 - selectedFraction) : selectedFraction)) / 2
  return yCatShift + yBrushShift
}

export const getStrokeWidth = (d: LinkDataPoint, idx: number, isBrush: boolean, isOverlay?: boolean): number => {
  const currentCount = d.catAttributesCounts ? d.catAttributesCounts[idx] : d.value
  const currentWidth = getCurrentWidth(currentCount, d.value, d.width)

  if (!isBrush && isOverlay) return currentWidth
  return getSelectionWidth(currentCount, d.selected[idx], currentWidth, isBrush)
}

export const getYShift = (d: LinkDataPoint, idx: number, isBrush: boolean, isOverlay: boolean): number => {
  const currentCount = d.catAttributesCounts ? d.catAttributesCounts[idx] : d.value
  if (!d.width) return 0

  return getYCatShiftAndCurrentWidth(
    currentCount,
    d.selected[idx],
    d.value,
    d.width,
    d.catAttributesCounts,
    idx,
    isBrush,
    isOverlay,
  )
}
