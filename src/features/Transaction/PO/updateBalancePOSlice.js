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
export const updateBalancePO = createAsyncThunk(
  'PO/updateBalancePO',
  async model => {
    if (model.action !== 'reset') {
      const [data, isData] = await axios({
        method: 'PUT',
        url: env.host + `/transaction/po/update-balance`,
        data: model.data,
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

const updateBalancePOSlice = createSlice({
  name: 'putPOBalance',
  initialState: initialState,
  extraReducers: {
    [updateBalancePO.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [updateBalancePO.fulfilled]: (state, action) => {
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
    [updateBalancePO.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const updateBalancePOSelectors = updateBalancePOSlice.actions
export default updateBalancePOSlice.reducer