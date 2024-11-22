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
export const getLOB = createAsyncThunk('LOB/getLOB', async model => {
  const [data, isData] = await axios({
    method: 'GET',
    url: env.host + `/master/lob`,
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

const getLOBSlice = createSlice({
  name: 'getLOB',
  initialState: initialState,
  extraReducers: {
    [getLOB.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [getLOB.fulfilled]: (state, action) => {
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
    [getLOB.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const getLOBSelectors = getLOBSlice.actions
export default getLOBSlice.reducer
