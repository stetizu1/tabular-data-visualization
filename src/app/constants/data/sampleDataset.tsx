import { Air, AirportShuttle, DirectionsBoat, DirectionsCar, LocalFlorist } from '@mui/icons-material'

import flowerJson from '../../../test-data/flowerData.json'
import birdJson from '../../../test-data/birdData.json'
import carJson from '../../../test-data/carData.json'
import titanicJson from '../../../test-data/titanicData.json'
import parallelCarsJson from '../../../test-data/parallelCarsData.json'

import { DataType } from '../../types/data/data'

export enum SampleDataset {
  flowers = `flower`,
  birds = `bird`,
  cars = `car`,
  titanic = `titanic`,
  parallelCars = `parallelCars`,
}

export const SAMPLE_DATASET_OPTIONS = Object.values(SampleDataset)

export const sampleDatasetFiles: Record<SampleDataset, string> = {
  [SampleDataset.flowers]: `flowerData.json`,
  [SampleDataset.birds]: `birdData.json`,
  [SampleDataset.cars]: `carData.json`,
  [SampleDataset.titanic]: `titanicData.json`,
  [SampleDataset.parallelCars]: `parallelCarsData.json`,
}

export const sampleDatasetIcons: Record<SampleDataset, JSX.Element> = {
  [SampleDataset.flowers]: <LocalFlorist />,
  [SampleDataset.birds]: <Air />,
  [SampleDataset.cars]: <DirectionsCar />,
  [SampleDataset.titanic]: <DirectionsBoat />,
  [SampleDataset.parallelCars]: <AirportShuttle />,
}

export const sampleDatasets: Record<SampleDataset, DataType[]> = {
  [SampleDataset.flowers]: flowerJson,
  [SampleDataset.birds]: birdJson,
  [SampleDataset.cars]: carJson,
  [SampleDataset.titanic]: titanicJson,
  [SampleDataset.parallelCars]: parallelCarsJson,
}
