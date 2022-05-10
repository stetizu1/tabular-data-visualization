export enum ViewType {
  ParallelCoordinates = `parallelCoordinates`,
  ScatterPlotMatrix = `scatterPlotMatrix`,
  Glyphs = `glyphs`,
  ScatterPlotGlyphs = `ScatterPlotGlyphs`,
  ParallelSetsBundled = `parallelSetsBundled`,
  DataTable = `dataTable`,
}

export const isViewType = (viewType: string): viewType is ViewType => Object.values<string>(ViewType).includes(viewType)
