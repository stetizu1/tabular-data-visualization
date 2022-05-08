import { SankeyLink, SankeyNode } from '../../lib/d3-sankey'
import { NominalValueProperties } from './data/data'

export type SankeyDataLink = {
  source: number
  target: number
  names: Array<string>
  value: number
}

export type NodeDataPoint = SankeyNode<NominalValueProperties, SankeyDataLink>

export type LinkDataPoint = SankeyLink<NominalValueProperties, SankeyDataLink>

export type NodeData = SankeyNode<NominalValueProperties, SankeyDataLink>

export type SankeyGraph = {
  nodes: Array<NodeDataPoint>
  links: Array<LinkDataPoint>
}
