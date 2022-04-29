import { Air, DirectionsCar, LocalFlorist } from '@mui/icons-material'

import flowerJson from '../../../test-data/flowerData.json'
import birdJson from '../../../test-data/birdData.json'
import carJson from '../../../test-data/carData.json'
import { DataType } from '../../types/data/data'

export enum SampleDataset {
  flower = `flower`,
  bird = `bird`,
  car = `car`,
}

export const sampleDatasetFiles: Record<SampleDataset, string> = {
  [SampleDataset.flower]: `flowerData.json`,
  [SampleDataset.bird]: `birdData.json`,
  [SampleDataset.car]: `carData.json`,
}

export const sampleDatasetIcons: Record<SampleDataset, JSX.Element> = {
  [SampleDataset.flower]: <LocalFlorist />,
  [SampleDataset.bird]: <Air />,
  [SampleDataset.car]: <DirectionsCar />,
}

export const sampleDatasets: Record<SampleDataset, DataType[]> = {
  [SampleDataset.flower]: flowerJson,
  [SampleDataset.bird]: birdJson,
  [SampleDataset.car]: carJson,
}
