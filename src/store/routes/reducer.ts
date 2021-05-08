import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteModel } from '../../models/RouteModel'

const initialState: RouteModel[] = []

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    upsert: (state, action: PayloadAction<RouteModel>) => {
      const papers = [...state]
      
      const index = papers.findIndex(el => el.id === action.payload.id)

      if (index !== -1) {
        papers.splice(index, 1)
      }

      return [action.payload, ...papers]
    }
  }
})

export const { upsert } = routesSlice.actions

export const selectRoutes = (state: any): RouteModel[] => state.routesReducer

export default routesSlice.reducer
