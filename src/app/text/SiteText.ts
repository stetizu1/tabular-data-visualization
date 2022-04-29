import { SampleDataset } from '../constants/data/sampleDataset'
import { DataLoadError } from '../constants/data/dataLoadState'

export const EMPTY_DATA_TEXT = {
  content: `To allow visualization, first load a dataset from a JSON or CSV file. You can also try this application with the sample data.`,
}

export const TOP_TOOLBAR_TEXT = {
  labelDetailsVisible: `Display details`,
  labelClearBrushes: `Clear brushes`,
  fileReader: {
    sampleDataLabel: `Try it on the sample data`,
    sampleDataDialogTitle: `Select sample dataset`,
    sampleDataDialogText: {
      [SampleDataset.flower]: `Flower dataset`,
      [SampleDataset.bird]: `Bird dataset`,
      [SampleDataset.car]: `Car dataset`,
    },
    alertDialog: {
      [DataLoadError.unsupportedFile]: {
        title: `File type not supported`,
        description: `This file type is not supported. Use JSON or CSV file.`,
      },
      [DataLoadError.unsupportedFileFormat]: {
        title: `File format not supported`,
        description: `The file format is invalid. The valid json file format is an array of objects with the same keys and simple JSON values (number, string, boolean, null)`,
      },
      confirm: `OK`,
    },
  },
}
