/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { env } from '../../utils/constant'

const initialState = {
  status: 'idle',
  code: '',
  data: '',
}

export const auth = createAsyncThunk('user/auth', async model => {
  if (model.action !== 'reset') {
    const [data, isData] = await axios({
      method: 'POST',
      url: env.host + '/master/user/login',
      headers: { 'Content-Type': 'application/json' },
      data: model.data,
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

  return JSON.stringify({ data: 'reset' })
})

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: {
    [auth.pending]: (state, action) => {
      state.status = 'loading'
      state.data = ''
    },

    [auth.fulfilled]: (state, action) => {
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
    [auth.rejected]: (state, action) => {
      state.status = 'error'
      state.data = ''
    },
  },
})
export const authSelectors = authSlice.actions
export default authSlice.reducer
