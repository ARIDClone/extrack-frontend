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
export const getTotalApproveRFP = createAsyncThunk(
  'dashboard/getTotalApproveRFP',
  async model => {
    if (model.action !== 'reset') {
      const [data, isData] = await axios({
        method: 'GET',
        url: env.host + `/transaction/dashboard/total-approve-rfp`,
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

const getTotalApproveRFPSlice = createSlice({
  name: 'getTotalApproveRFP',
  initialState: initialState,
  extraReducers: {
    [getTotalApproveRFP.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [getTotalApproveRFP.fulfilled]: (state, action) => {
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
    [getTotalApproveRFP.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const getTotalApproveRFPSelectors = getTotalApproveRFPSlice.actions
export default getTotalApproveRFPSlice.reducer
