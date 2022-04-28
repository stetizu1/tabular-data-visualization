import { SampleDataset } from '../constants/data/SampleDataset'

export const EMPTY_DATA_TEXT = {
  content: `To allow visualization, first load a dataset from a JSON or CSV file. You can also try this application with the sample data.`,
}

export const TOP_TOOLBAR_TEXT = {
  labelDetailsVisible: `Display details`,
  labelClearBrushes: `Clear brushes`,
  fileReader: {
    label: `Try it on the sample data`,
    dialogTitle: `Select sample dataset`,
    dialogText: {
      [SampleDataset.flower]: `Flower dataset`,
      [SampleDataset.bird]: `Bird dataset`,
      [SampleDataset.car]: `Car dataset`,
    },
    errors: {
      unsupportedFile: `This file type is not supported. Use JSON or CSV file.`,
      unsupportedFileFormat: `The file format is invalid.\nThe valid json file format is an array of objects with the same keys and simple JSON values (number, string, boolean, null)`,
    },
  },
}
