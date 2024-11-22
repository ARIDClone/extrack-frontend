import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../features/Auth/AuthSlice'
import { useToastHook } from '../../components'
import { useNavigate } from 'react-router-dom'
import loginImg from '../../assets/GD23-50 AKS Kalbe INT Web Banner 230317.jpg'
import logoSaski from '../../assets/logo.svg'
// import LoginWithActivity from '../../sso/LoginWithActivity'
function Login() {
  const dispatch = useDispatch()

  const loginState = useSelector(state => state.login)
  const [toast, setToast] = useToastHook()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  function onChange(value) {
    console.log(value)
  }
  const handleLogin = e => {
    e.preventDefault()
    const data = {
      username,
      password,
    }

    if (!username || !password) {
      return setToast({ message: 'All field must be filled', type: 'warning' })
    }

    dispatch(auth({ data }))
  }

  const setInitialState = () => {
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    if (loginState.status !== 'idle' || loginState.status !== 'loading') {
      if (loginState.status === 'error') {
        setToast({ message: 'Error occurred', type: 'error' })
      } else if (loginState.status === 'loaded') {
        setToast({ message: 'Login success', type: 'success' })
        localStorage.setItem(
          'x-auth-token',
          JSON.stringify(loginState.data.data)
        )
        dispatch(auth({ action: 'reset' }))
        setInitialState()
        navigate(`/`)
        // setTimeout(() => , 750);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.status])

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('x-auth-token'))
    if (isAuthenticated) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Flex h={'100vh'} w={'100vw'} bg={'gray.50'}>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        justifyContent={'center'}
        alignItems={'center'}
        w={'50%'}
        bg={'#ddf5d6'}
        h={'full'}
      >
        <Image w={'581px'} h={'auto'} src={loginImg} />
      </Flex>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        w={{ base: '100%', md: '50%' }}
      >
        <Flex
          alignItems={'center'}
          flexDir={'column'}
          maxW={'380px'}
          px={'15px'}
          py={'10px'}
          mx={5}
          borderRadius={'10px'}
          bg={'white'}
          boxShadow={'lg'}
        >
          <Image w={'200px'} mb={3} src={logoSaski} />
          <Text fontWeight={'medium'} mb={'10'} fontSize={20}>
            SCM SASKI
          </Text>
          <form onSubmit={e => handleLogin(e)}>
            <Input
              onChange={e => setUsername(e.target.value)}
              size={'lg'}
              mb={5}
              placeholder='Enter username'
            />
            <InputGroup size='lg' mb={1}>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={e => setPassword(e.target.value)}
              />

              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Box mb={5}>
              <Link
                color={'gray.500'}
                href='https://devapps.kalbeinternational.com/kiactivity/ForgotPassword.aspx'
              >
                Forgot password?
              </Link>
            </Box>
            {loginState.status === 'loading' ? (
              <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
                <Spinner size={'xl'} color='green.500' />
              </Flex>
            ) : (
              <Button type='submit' w={'full'} colorScheme={'teal'}>
                Login
              </Button>
            )}
            {/* <LoginWithActivity /> */}
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
