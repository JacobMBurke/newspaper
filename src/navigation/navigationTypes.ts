import { NewspaperModel } from "../models/NewspaperModel";

export type RootStackParamList = {
    Home: undefined,
    Detail: { paper: NewspaperModel },
    'Newspaper-List': undefined
}
