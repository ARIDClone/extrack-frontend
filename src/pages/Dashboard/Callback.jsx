import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CryptoJS from 'crypto-js'
import fileKey from '../../../kiauth-service.json'
import { auth } from '../../features/Auth/AuthSlice'

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const loginState = useSelector(state => state.getAuth)
  const navigate = useNavigate()
  const parseJwt = token => {
    try {
      return JSON.parse(window.atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      const decodedJwt = parseJwt(token)

      // check if token expired
      if (decodedJwt) {
        const data = { param: decodedJwt.username }
        dispatch(auth({ data }))
      }
    } else {
      if (!fileKey) {
        console.error('File not found')
        return
      }

      // Parse the JSON data
      //   const jsonData = JSON.parse(data);
      const { authUrl, clientId, authKey, redirectTo, domain } = fileKey
      const str = `${clientId}|${redirectTo}|${domain}`
      const key = CryptoJS.HmacMD5(str, authKey).toString()

      const link = `${authUrl}?client_id=${clientId}&key=${key}`
      window.location.href = link
    }
  }, [searchParams, navigate, dispatch])

  useEffect(() => {
    if (loginState.status !== 'idle' && loginState.status !== 'loading') {
      if (loginState.status === 'error') {
        window.location.href =
          'https://devapps.kalbeinternational.com/kiactivity/Portal/IT.aspx'
      } else if (loginState.status === 'loaded') {
        if (loginState.status === 404) {
          window.location.href =
            'https://devapps.kalbeinternational.com/kiactivity/Portal/IT.aspx'
        }
        localStorage.setItem(
          'x-auth-token',
          JSON.stringify(loginState.data.data)
        )
        dispatch(auth({ action: 'reset' }))

        navigate('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.status])

  return <div>Loading...</div>
}

export default Callback
