import { SampleDataset } from '../constants/data/sampleDataset'
import { DataNullOptionType } from '../constants/data/data'
import { DataLoadError } from '../constants/data/DataLoadError'

export const EMPTY_DATA_TEXT = {
  content: `To use the application, first load the dataset from a JSON or CSV file. You can also try this application with sample data.`,
  firstTime: `Trying for the first time?`,
  loading: `Loading...`,
  helpDialog: {
    header: `About Tabular Data Visualizer`,
    description: `The purpose of this application is to visualize multidimensional tabular data.`,
    subHeader: `Options`,
    close: `Close`,
    sample: `To try the application, you can select one of the sample datasets. You can use flower or car dataset for quantitative data visualizations, titanic or parallel cars for category visualization or bird dataset for combination of both.`,
    file: `You use applications with your own datasets, JSON or CSV files. Files need to have the right format, for JSON it is the array of the same objects with only simple values.`,
    viewsHelp: `To get more information about a specific view, you can look at its help, which can be found in its header.`,
    add: `...add a new view type to the visualization board`,
    layout: `...set one of the predefined layout`,
    tooltip: `...turn on/off tooltips or data items`,
    skip: `...turn on/off brushing only on end of move. Works for range brushes (scatter plot, parallel coordinates). Enabling this option is recommended if the application runs too slow during brushing.`,
    brush: `...change color of the brush`,
    brushOff: `...clean all active brushing`,
    settings: `...show more settings for views`,
  },
}

export const TOP_TOOLBAR_TEXT = {
  labelDetailsVisible: `Display tooltips`,
  labelClearBrushes: `Clear brushes`,
  labelAddView: `Add a view`,
  labelBrushingOnEOM: `Set brushing at the end of the move only`,
  labelBrushColor: `Brush color`,
  addViewDialogTitle: `Add a view`,
  labelDialogTitle: `Set predefined layout`,
  noOption: `All view options are currently displayed.`,
  settings: `Settings`,
  filter: `Filter`,
}

export const SAVE_TEXT = {
  header: `Save to file`,
  description: `Do you want to save the visualization to an SVG file?`,
  save: `Save as SVG`,
  confirm: `Save`,
  cancel: `Cancel`,
}

export const VIEW_INFO_TEXT = {
  buttonLabel: `Show view information`,
  dialog: {
    brushing: `Brushing`,
    settings: `Settings`,
    options: `Options`,
    close: `Close`,
  },
}

export const FILE_READER_TEXT = {
  button: `Select a file`,
  sampleDataLabel: `Try it on the sample data`,
  sampleDataDialogTitle: `Select sample dataset`,
  sampleDataDialogText: {
    [SampleDataset.flowers]: `Flower dataset`,
    [SampleDataset.birds]: `Bird dataset`,
    [SampleDataset.cars]: `Car dataset`,
    [SampleDataset.titanic]: `Titanic dataset`,
    [SampleDataset.parallelCars]: `Car parallel dataset`,
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
      [DataNullOptionType.leave]: `Leave as is`,
      [DataNullOptionType.filter]: `Filter`,
      [DataNullOptionType.change]: `Change all`,
    },
    optionsDescription: {
      [DataNullOptionType.leave]: `This option leaves the data as is. On numeric scales, null values will be cast to 0, in the table they will be displayed as null, for categorical data a separate category will be created.`,
      [DataNullOptionType.filter]: `This option filters out all data with null values. These data will not be considered further in the application.`,
      [DataNullOptionType.change]: `This option replaces all null values with the value entered below.`,
    },
    changeTo: `Change to`,
    attribute: `Attribute:`,
  },
}

export const LAYOUT_DIALOG_TEXT = {
  title: `Set a layout`,
  alt: `Layout `,
}
