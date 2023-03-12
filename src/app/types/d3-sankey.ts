/**
 * Custom types to work with d3-sankey library
 */
import { SankeyLink, SankeyNode } from '@d3-sankey'
import { DataLink, NominalValueProperties } from './data/data'

/**
 * Sankey node data point
 */
export type NodeDataPoint = SankeyNode<NominalValueProperties, DataLink>

/**
 * Sankey link data point
 */
export type LinkDataPoint = SankeyLink<NominalValueProperties, DataLink>

/**
 * Sankey graph
 */
export type SankeyGraph = {
  /**
   * Graph nodes
   */
  nodes: Array<NodeDataPoint>
  /**
   * Graph links
   */
  links: Array<LinkDataPoint>
}
