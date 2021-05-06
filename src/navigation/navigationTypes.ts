import { NewspaperModel } from "../models/NewspaperModel";

export type RootStackParamList = {
    Home: undefined,
    Detail: { paperId: string | undefined },
    'Newspaper-List': undefined
}
