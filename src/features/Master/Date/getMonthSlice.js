import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getDecodedToken } from '../../../utils/helper'
import { env } from '../../../utils/constant'

const initialState = {
  status: '',
  code: '',
  data: '',
}

// thunk
export const getMonth = createAsyncThunk('date/getMonth', async model => {
  const [data, isData] = await axios({
    method: 'GET',
    url: env.host + `/master/month`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getDecodedToken(),
    },
  })
    .then(result => {
      const responseAPI = result
      return [responseAPI, true]
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response)
      }

      return [error.response, false]
    })

  return JSON.stringify(data)
})

const getMonthSlice = createSlice({
  name: 'getMonth',
  initialState: initialState,
  extraReducers: {
    [getMonth.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [getMonth.fulfilled]: (state, action) => {
      var record = JSON.parse(action.payload)
      if (record.status === 200) {
        state.status = 'loaded'
        state.code = record.status
        state.data = record.data
      } else {
        state.status = 'error'
        state.code = record.status
        state.data = record.data
      }
    },
    [getMonth.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const getMonthSelectors = getMonthSlice.actions
export default getMonthSlice.reducer
