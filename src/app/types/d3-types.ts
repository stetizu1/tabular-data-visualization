/**
 * Types to work with d3.js
 */
import { MouseEvent } from 'react'
import { BaseType, D3BrushEvent, ValueFn } from 'd3'

/**
 * For each on data group element.
 */
export type DataEachG<T, Return = void> = ValueFn<SVGGElement, T, Return>

/**
 * For each on data circle element.
 */
export type DataEachC<T, Return = void> = ValueFn<SVGCircleElement, T, Return>

/**
 * For each on data path element.
 */
export type DataEachP<T, Return = void> = ValueFn<SVGPathElement, T, Return>

/**
 * For each on data and given element.
 */
export type DataEach<T, Element extends BaseType, Return = void> = ValueFn<Element, T, Return>

/**
 * Mouse event reaction
 */
export type OnMouseEvent<T> = (event: MouseEvent, data: T) => void

/**
 * Brush event reaction
 */
export type OnBrushEvent<T, K = unknown> = (event: D3BrushEvent<T>, key: K) => void

/**
 * Extent
 * [xFrom, yFrom], [xTo, yTo]
 */
export type Extent = [[number, number], [number, number]]
