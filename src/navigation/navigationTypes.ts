import { NewspaperModel } from "../models/NewspaperModel";

export type RootStackParamList = {
    Home: undefined,
    Detail: { paperId: string },
    'Newspaper-List': undefined
}
