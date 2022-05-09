import { SankeyLink, SankeyNode } from '../../lib/d3-sankey'
import { NominalValueProperties } from './data/data'

export type DataLink = {
  source: number
  target: number
  selected: number
  names: Array<string>
  value: number
}

export type NodeDataPoint = SankeyNode<NominalValueProperties, DataLink>

export type LinkDataPoint = SankeyLink<NominalValueProperties, DataLink>

export type NodeData = SankeyNode<NominalValueProperties, DataLink>

export type SankeyGraph = {
  nodes: Array<NodeDataPoint>
  links: Array<LinkDataPoint>
}
