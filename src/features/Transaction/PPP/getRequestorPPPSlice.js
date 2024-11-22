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
export const getRequestorPPP = createAsyncThunk(
  'PPP/getRequestorPPP',
  async model => {
    if (model.action !== 'reset') {
      const [data, isData] = await axios({
        method: 'GET',
        url: env.host + `/transaction/ppp/requestor`,
        params: model.params,
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
    } else {
      return JSON.stringify({ data: 'reset' })
    }
  }
)

const getRequestorPPPSlice = createSlice({
  name: 'getRequestor',
  initialState: initialState,
  extraReducers: {
    [getRequestorPPP.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [getRequestorPPP.fulfilled]: (state, action) => {
      var record = JSON.parse(action.payload)
      if (record.status === 200) {
        state.status = 'loaded'
        state.code = record.status
        state.data = record.data
      } else {
        if (record.data === 'reset') {
          state.status = 'idle'
          state.data = ''
          state.code = ''
        } else {
          state.status = 'error'
          state.code = record.status
          state.data = record.data
        }
      }
    },
    [getRequestorPPP.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const getRequestorPPPSelectors = getRequestorPPPSlice.actions
export default getRequestorPPPSlice.reducer
