/**
 * Types of views that can be visualized
 */
export enum ViewType {
  ParallelCoordinates = `parallelCoordinates`,
  ScatterPlotMatrix = `scatterPlotMatrix`,
  Glyphs = `glyphs`,
  ScatterPlotGlyphs = `ScatterPlotGlyphs`,
  ParallelSetsBundled = `parallelSetsBundled`,
  DataTable = `dataTable`,
}

/**
 * Any view with brushing extents (rectangles)
 */
export type brushViewType = `brushView`
export const brushView: brushViewType = `brushView`

/**
 * Returns true if given string is a view type
 * @param viewType
 */
export const isViewType = (viewType: string): viewType is ViewType => Object.values<string>(ViewType).includes(viewType)

/**
 * True if the view have brushing with extents (rectangles)
 * @param component - component tested
 */
export const isBrushView = (component: ViewType | null): boolean =>
  component === ViewType.ScatterPlotMatrix ||
  component === ViewType.ScatterPlotGlyphs ||
  component === ViewType.ParallelCoordinates
