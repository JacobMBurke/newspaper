import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewspaperModel } from '../../models/NewspaperModel'

const initialState: NewspaperModel[] = [{
  id: '45',
  title: 'The Guardian',
  description: 'A lefty newspaper',
  createdDate: (new Date()).getMilliseconds()
}]

export const newspapersSlice = createSlice({
  name: 'newspapers',
  initialState,
  reducers: {
    upsert: (state, action: PayloadAction<NewspaperModel>) => {
      const papers = [...state]
      
      const index = papers.findIndex(el => el.id === action.payload.id)

      if (index !== -1) {
        papers.splice(index, 1)
      }

      return [action.payload, ...papers]
    }
  }
})

export const { upsert } = newspapersSlice.actions

export const selectNewspapers = (state: any): NewspaperModel[] => state.newspapersReducer

export default newspapersSlice.reducer