import { AirportShuttle, DirectionsBoat, DirectionsCar, LocalFlorist, Twitter } from '@mui/icons-material'

import birdJson from '@test-data/birdData.json'
import carJson from '@test-data/carData.json'
import flowerJson from '@test-data/flowerData.json'
import parallelCarsJson from '@test-data/parallelCarsData.json'
import titanicJson from '@test-data/titanicData.json'

import { DataType } from '@/types/data/data'

/**
 * Sample datasets options
 */
export enum SampleDataset {
  flowers = `flower`,
  birds = `bird`,
  cars = `car`,
  titanic = `titanic`,
  parallelCars = `parallelCars`,
}

/**
 * All sample datasets options
 */
export const SAMPLE_DATASET_OPTIONS = Object.values(SampleDataset)

/**
 * Icons for all sample datasets
 */
export const sampleDatasetIcons: Record<SampleDataset, JSX.Element> = {
  [SampleDataset.flowers]: <LocalFlorist />,
  [SampleDataset.birds]: <Twitter />,
  [SampleDataset.cars]: <DirectionsCar />,
  [SampleDataset.titanic]: <DirectionsBoat />,
  [SampleDataset.parallelCars]: <AirportShuttle />,
}

/**
 * Sample datasets data
 */
export const sampleDatasets: Record<SampleDataset, DataType[]> = {
  [SampleDataset.flowers]: flowerJson,
  [SampleDataset.birds]: birdJson,
  [SampleDataset.cars]: carJson,
  [SampleDataset.titanic]: titanicJson,
  [SampleDataset.parallelCars]: parallelCarsJson,
}
