import React from 'react'
import {
  Button,
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FiMenu, FiBell, FiChevronDown, FiArrowLeft } from 'react-icons/fi'
import useToastHook from '../ToastHook'
import { useNavigate } from 'react-router'
import fileKey from '../../../../kiauth-service.json'
import CryptoJS from 'crypto-js'

function Header({ isToggled, user, onOpen, headerTitle, ...rest }) {
  const [toast, setToast] = useToastHook()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('x-auth-token')
    setToast({ message: 'Logged out', type: 'success' })
    return setTimeout(() => {
      const { clientId, authKey, redirectTo, domain, serviceUrl } = fileKey
      const str = `${clientId}|${redirectTo}|${domain}`
      const key = CryptoJS.HmacMD5(str, authKey).toString()
      return window.location.replace(
        `${serviceUrl}/#/logout?client_id=${clientId}&key=${key}`
      )
      // navigate(`/callback`)
    }, 750)
  }
  return (
    <Flex
      ml={{ base: 0, md: isToggled ? '7.5rem' : '14.953rem' }}
      px={{ base: 4, md: 4 }}
      transition='0.5s ease'
      height='20'
      alignItems='center'
      bg={useColorModeValue('#76bc2a', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between' }}
      position={'sticky'}
      top={0}
      zIndex={99}
      {...rest}
    >
      <Flex alignItems={'center'}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
          mr={5}
        />
        <IconButton
          onClick={() => navigate(-1)}
          borderRadius={'full'}
          size={'md'}
          icon={<FiArrowLeft />}
          bg={'white'}
          color={'#76bc2a'}
          mr={5}
        />
        <Text fontWeight={'semibold'} fontSize={'20px'} textColor={'white'}>
          {headerTitle}
        </Text>
      </Flex>

      <HStack mr={2} spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  // src={`https://ui-avatars.com/api/?name=${user.name}&color=2d4739&background=b5d99c`}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm' color='white'>
                    {user.name}
                  </Text>
                  <Text fontSize='xs' color='white'>
                    {user.username}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              {/* <MenuItem>Profile</MenuItem> */}
              {/* <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              {/* <MenuDivider /> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default Header
