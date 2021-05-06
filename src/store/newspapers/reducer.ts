import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewspaperModel } from '../../models/NewspaperModel'

const initialState: NewspaperModel[] = [{
  id: '45',
  title: 'The Guardian',
  description: 'A lefty newspaper',
  createdDate: new Date()
}]

export const newspapersSlice = createSlice({
  name: 'newspapers',
  initialState,
  reducers: {
    upsert: (state, action: PayloadAction<NewspaperModel>) => {
      console.log('upserting: ' + JSON.stringify(action.payload))
      console.log(state)
      const index = state.findIndex(el => el.id === action.payload.id)
      if (index) {
        state.splice(index)
      }

      state = [action.payload, ...state]
    }
  }
})

export const { upsert } = newspapersSlice.actions

export const selectNewspapers = (state: any) => state.newspapers

export default newspapersSlice.reducer