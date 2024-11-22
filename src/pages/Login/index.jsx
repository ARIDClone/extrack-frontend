import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../../features/Auth/AuthSlice'

function Login() {
  const dispatch = useDispatch()

  const loginState = useSelector(state => state.getAuth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')

    if (id !== null) {
      const param = id.replace(/ /g, '+')
      const data = { param: param }
      dispatch(auth({ data }))
    } else {
      if (localStorage.getItem('x-auth-token') === null) {
        window.location.href =
          'https://devapps.kalbeinternational.com/kiactivity/Portal/IT.aspx'
      } else {
        navigate('/')
      }
    }
  })

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
}

export default Login
