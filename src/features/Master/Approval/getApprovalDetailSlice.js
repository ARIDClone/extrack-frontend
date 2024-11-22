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
export const getApprovalDetail = createAsyncThunk(
  'approval/getApprovalDetail',
  async model => {
    const [data, isData] = await axios({
      method: 'GET',
      url: env.host + `/master/approval`,
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
  }
)

const getApprovalDetailSlice = createSlice({
  name: 'getApprovalDetail',
  initialState: initialState,
  extraReducers: {
    [getApprovalDetail.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [getApprovalDetail.fulfilled]: (state, action) => {
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
    [getApprovalDetail.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const getApprovalDetailSelectors = getApprovalDetailSlice.actions
export default getApprovalDetailSlice.reducer
