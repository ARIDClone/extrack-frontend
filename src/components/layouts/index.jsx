import React, { useEffect, useState } from 'react'
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Card,
  CardBody,
} from '@chakra-ui/react'

import Header from '../molecules/Header'
import Sidebar from '../molecules/Sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { env } from '../../utils/constant'
import moment from 'moment'
import fileKey from '../../../kiauth-service.json'
import CryptoJS from 'crypto-js'

export default function Layout({ children, isAuth = true, headerTitle }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isToggled, setIsToggled] = useState(false)
  const [userData, setUserData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const colorMode = useColorModeValue('gray.100', 'gray.900')
  const checkToggled = () => {
    const check = localStorage.getItem('is-sidebar-toggled')

    if (check && check === 'true') {
      setIsToggled(true)
    } else {
      setIsToggled(false)
    }
  }
  const parseJwt = token => {
    try {
      return JSON.parse(window.atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  const logout = () => {
    localStorage.removeItem('x-auth-token')
    setIsLoggedIn(false)
    if (location.pathname === '/') {
      return navigate('/callback')
      // const { clientId, authKey, redirectTo, domain, serviceUrl } = fileKey
      // const str = `${clientId}|${redirectTo}|${domain}`
      // const key = CryptoJS.HmacMD5(str, authKey).toString()
      // return window.location.replace(
      //   `${serviceUrl}/#/logout?client_id=${clientId}&key=${key}`
      // )
    }

    return navigate('/error/401')
  }

  const checkToken = async () => {
    if (isAuth) {
      const isAuthenticated = JSON.parse(localStorage.getItem('x-auth-token'))

      // check if no token
      if (!isAuthenticated) {
        logout()
      }

      const decodedJwt = parseJwt(isAuthenticated.token)

      // check if token expired
      if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
        logout()
      }

      decodedJwt.token = isAuthenticated.token
      const response = await fetch(env.host + '/master/me', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': decodedJwt.token,
        },
      })
      const currUserData = await response.json()
      const data = {
        id: currUserData.data.id,
        // permission: currUserData.data.permission,
        ...decodedJwt,
      }

      setUserData(data)

      setIsLoggedIn(true)
    }
  }

  useEffect(() => {
    checkToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  useEffect(() => {
    checkToggled()
  }, [isToggled])

  return isLoggedIn ? (
    <Box minH='100vh' bg={colorMode}>
      <Sidebar
        onClose={() => onClose}
        userPermission={userData.permission}
        isToggled={isToggled}
        setIsToggled={() => {
          if (isToggled) {
            localStorage.setItem('is-sidebar-toggled', 'false')
            return setIsToggled(false)
          }
          localStorage.setItem('is-sidebar-toggled', 'true')
          return setIsToggled(true)
        }}
        display={{ base: 'none', md: 'block' }}
      />
      {/* mobile drawer */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <Sidebar userPermission={userData.permission} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}

      <Header
        headerTitle={headerTitle}
        user={userData}
        isToggled={isToggled}
        onOpen={onOpen}
      />
      <Box
        transition='0.5s ease'
        ml={{ base: 0, md: isToggled ? 121 : 60 }}
        p='4'
      >
        <Card bg={'white'}>
          <CardBody>
            {React.cloneElement(children, { user: userData })}

            {/* {children} */}
          </CardBody>
        </Card>
      </Box>
    </Box>
  ) : (
    <div></div>
  )
}
