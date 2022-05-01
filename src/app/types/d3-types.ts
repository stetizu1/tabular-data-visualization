import { ValueFn } from 'd3'

/**
 * For each on data group element
 */
export type DataEachG<T, Return = void> = ValueFn<SVGGElement, T, Return>

/**
 * For each on data circle element
 */
export type DataEachCircle<T, Return = void> = ValueFn<SVGCircleElement, T, Return>
