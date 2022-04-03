import { SelectableDataType } from '../../types/data/data'

const getDatasetSample = (dataset: SelectableDataType[]) => dataset[0]

export const getDefaultQuantitativeAttributes = (dataset: SelectableDataType[]): Array<keyof SelectableDataType> => {
  const sample = getDatasetSample(dataset)
  return Object
    .keys(sample)
    .filter((key) => typeof dataset[0][key] === `number`)
}
