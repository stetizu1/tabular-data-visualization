import { SampleDataset } from '../constants/data/sampleDataset'
import { DataLoadError } from '../constants/data/dataLoadState'
import { OptionType } from '../constants/data/data'

export const EMPTY_DATA_TEXT = {
  content: `To use the application, first load the dataset from a JSON or CSV file. You can also try this application with sample data.`,
  loading: `Loading...`,
}

export const TOP_TOOLBAR_TEXT = {
  labelDetailsVisible: `Display details`,
  labelClearBrushes: `Clear brushes`,
  labelAddView: `Add a view`,
  labelBrushingOnEOM: `Brushing set only at the end of the move`,
  labelBrushColor: `Brush color`,
  addViewDialogTitle: `Add a view`,
  noOption: `All view options are currently displayed.`,
  saveText: {
    header: `Save to file`,
    description: `Do you want to save the visualization to an SVG file?`,
    save: `Save`,
    confirm: `Save`,
    cancel: `Cancel`,
  },
  filter: `Filter`,
}

export const FILE_READER_TEXT = {
  button: `Select a file`,
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
    [DataLoadError.unsupportedFormat]: {
      title: `File format not supported`,
      description: `The file format is invalid. The valid json file format is an array of objects with the same keys and simple JSON values (number, string, boolean, null)`,
    },
    confirm: `OK`,
  },
  nullDialog: {
    title: `Data with null values occurred!`,
    description: `This application provides only basic operations for modifying null data values. For better processing, use applications designed for this purpose.`,
    confirm: `Confirm`,
    optionsText: {
      [OptionType.leave]: `Leave as is`,
      [OptionType.filter]: `Filter`,
      [OptionType.change]: `Change all`,
    },
    optionsDescription: {
      [OptionType.leave]: `This option leaves the data as is. On numeric scales, null values will be cast to 0, in the table they will be displayed as null, for categorical data a separate category will be created.`,
      [OptionType.filter]: `This option filters out all data with null values. These data will not be considered further in the application.`,
      [OptionType.change]: `This option replaces all null values with the value entered below.`,
    },
    changeTo: `Change to`,
    attribute: `Attribute:`,
  },
}
