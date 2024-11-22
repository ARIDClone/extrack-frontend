import React from 'react'
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link as LinkChakra,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Image,
  IconButton,
  Text,
} from '@chakra-ui/react'
import {
  FiHome,
  FiChevronsRight,
  FiChevronsLeft,
  FiClipboard,
  FiSettings,
  FiThumbsUp,
  FiClock,
  FiShoppingCart,
  FiBox,
  FiList,
  FiPaperclip,
  FiFolder,
  FiFilePlus,
  FiBarChart,
  FiBarChart2,
  FiFileText,
  FiDollarSign,
} from 'react-icons/fi'
import AppLogo from './../../../assets/allinea-_0001_logo-ki.png'

import { Link, useNavigate } from 'react-router-dom'
import { CalendarIcon } from '@chakra-ui/icons'

function Sidebar({
  isToggled,
  setIsToggled,
  userPermission = [],
  onClose,
  ...rest
}) {
  const sidemenu = {
    dashboard: {
      permission: null,
      base: (
        <NavItem key='Dashboard' link={'/'} icon={FiHome}>
          Dashboard
        </NavItem>
      ),
      mobile: (
        <ToggledItem
          key='Dashboard'
          icon={FiHome}
          name={'Dashboard'}
          link={'/'}
        />
      ),
    },
    po: [
      {
        permission: null,
        base: (
          <NavItem key='POList' link={'/po/request'} icon={FiClipboard}>
            PO List
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='POList'
            icon={FiClipboard}
            name={'PO List'}
            link={'/po/request'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem key='POApproval' link={'/po/approve'} icon={FiThumbsUp}>
            PO Approval
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='POApproval'
            icon={FiThumbsUp}
            name={'PO Approval'}
            link={'/po/approve'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem key='WOList' link={'/po-wo/request'} icon={FiClipboard}>
            WO List
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='WOList'
            icon={FiClipboard}
            name={'WO List'}
            link={'/po-wo/request'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem key='WOHistory' link={'/po-wo/history'} icon={FiClock}>
            WO History
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='WOHistory'
            icon={FiClock}
            name={'WO History'}
            link={'/po-wo/history'}
          />
        ),
      },
    ],
    rfp: [
      {
        permission: null,
        base: (
          <NavItem key='RFPList' link={'/rfp/request'} icon={FiClipboard}>
            RFP List
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='RFPList'
            icon={FiClipboard}
            name={'RFP List'}
            link={'/rfp/request'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem key='RFPApproval' link={'/rfp/approve'} icon={FiThumbsUp}>
            RFP Approval
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='RFPApproval'
            icon={FiThumbsUp}
            name={'RFP Approval'}
            link={'/rfp/approve'}
          />
        ),
      },
    ],
    master: [
      {
        permission: null,
        base: (
          <NavItem key='MasterSupplier' link={'/master/supplier'} icon={FiBox}>
            Master Supplier
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='MasterSupplier'
            icon={FiBox}
            name={'Master Supplier'}
            link={'/master/supplier'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem
            key='ApprovalSetting'
            link={'/approval-setting'}
            icon={FiClipboard}
          >
            Approval Setting
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='ApprovalSetting'
            icon={FiClipboard}
            name={'Approval Setting'}
            link={'/approval-setting'}
          />
        ),
      },
    ],
    report: [
      {
        permission: null,
        base: (
          <NavItem
            key='PPPBalanceTracking'
            link={'/ppp-balance-tracking'}
            icon={FiDollarSign}
          >
            PPP Balance Tracking
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='PPPBalanceTracking'
            icon={FiDollarSign}
            name={'PPP Balance Tracking'}
            link={'/ppp-balance-tracking'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem
            key='PPPBalanceHistory'
            link={'/ppp-balance-history'}
            icon={FiDollarSign}
          >
            PPP Balance History
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='PPPBalanceHistory'
            icon={FiDollarSign}
            name={'PPP Balance History'}
            link={'/ppp-balance-history'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem
            key='POReportHistorical'
            link={'/po-report-historical'}
            icon={FiFileText}
          >
            PO Report Historical
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='POReportHistorical'
            icon={FiFileText}
            name={'PO Report Historical'}
            link={'/po-report-historical'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem
            key='POOnlineProgress'
            link={'/po-online-progress'}
            icon={FiBarChart}
          >
            PO Online Progress
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='POOnlineProgress'
            icon={FiBarChart}
            name={'PO Online Progress'}
            link={'/po-online-progress'}
          />
        ),
      },
      {
        permission: null,
        base: (
          <NavItem
            key='RFPOnlineProgress'
            link={'/rfp-online-progress'}
            icon={FiBarChart2}
          >
            RFP Online Progress
          </NavItem>
        ),
        mobile: (
          <ToggledItem
            key='RFPOnlineProgress'
            icon={FiBarChart2}
            name={'RFP Online Progress'}
            link={'/rfp-online-progress'}
          />
        ),
      },
    ],
  }

  return (
    <Box
      transition={{ base: '3s ease', md: '0.5s ease' }}
      bg={useColorModeValue('#76bc2a', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: isToggled ? 121 : 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex
        h='20'
        alignItems='center'
        my={3}
        mx='8'
        justifyContent='space-between'
      >
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          {isToggled ? (
            ''
          ) : (
            <Image h={'48px'} w={'auto'} alt='img' mx={'auto'} src={AppLogo} />
          )}
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            onClick={setIsToggled}
            aria-label='toggle-sidebar'
            ml={isToggled ? 0 : 10}
            mt={3}
            color={'#76bc2a'}
            bg={'white'}
            icon={isToggled ? <FiChevronsRight /> : <FiChevronsLeft />}
          />
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Box
        display={isToggled ? 'none' : 'block'}
        maxH={{ base: 'none', sm: '80vh' }}
        overflowY={'auto'}
        sx={{
          '::-webkit-scrollbar': {
            width: '0.5vw',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
          },
        }}
      >
        {sidemenu.dashboard.base}
        {/* {Object.keys(sidemenu).map((key, idx) => sidemenu[key].base)} */}
        {/* <Accordion mx='4' defaultIndex={[0]} allowMultiple>
          {sidemenu.po.filter(menu => userPermission.includes(menu.permission))
            .length > 0 ? (
            <AccordionItem border='hidden'>
              <h2>
                <AccordionButton
                  _hover={{ background: 'white', color: '#76bc2a' }}
                  p={4}
                  borderRadius={'6px'}
                  textColor={'white'}
                >
                  <Box flex='1' textAlign='left' fontWeight={'semibold'}>
                    <Icon
                      mr='4'
                      fontSize='16'
                      _groupHover={{ color: '#76bc2a' }}
                      as={FiSettings}
                    />{' '}
                    PO
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={2} pb={4}>
                {sidemenu.po
                  .filter(menu => userPermission.includes(menu.permission))
                  .map(menu => menu.base)}
              </AccordionPanel>
            </AccordionItem>
          ) : (
            ''
          )}
        </Accordion> */}
        <Accordion mx='4' defaultIndex={[0]} allowMultiple>
          {sidemenu.po.map(menu => userPermission.includes(menu.permission))
            .length > 0 ? (
            <AccordionItem border='hidden'>
              <h2>
                <AccordionButton
                  _hover={{ background: 'white', color: '#76bc2a' }}
                  p={4}
                  borderRadius={'6px'}
                  textColor={'white'}
                >
                  <Box flex='1' textAlign='left' fontWeight={'semibold'}>
                    <Icon
                      mr='4'
                      fontSize='16'
                      _groupHover={{ color: '#76bc2a' }}
                      as={FiShoppingCart}
                    />{' '}
                    PO
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={2} pb={4}>
                {sidemenu.po.map(menu => menu.base)}
              </AccordionPanel>
            </AccordionItem>
          ) : (
            ''
          )}
          {sidemenu.rfp.map(menu => userPermission.includes(menu.permission))
            .length > 0 ? (
            <AccordionItem border='hidden'>
              <h2>
                <AccordionButton
                  _hover={{ background: 'white', color: '#76bc2a' }}
                  p={4}
                  borderRadius={'6px'}
                  textColor={'white'}
                >
                  <Box flex='1' textAlign='left' fontWeight={'semibold'}>
                    <Icon
                      mr='4'
                      fontSize='16'
                      _groupHover={{ color: '#76bc2a' }}
                      as={FiFolder}
                    />{' '}
                    RFP
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={2} pb={4}>
                {sidemenu.rfp.map(menu => menu.base)}
              </AccordionPanel>
            </AccordionItem>
          ) : (
            ''
          )}
          {sidemenu.master.map(menu => userPermission.includes(menu.permission))
            .length > 0 ? (
            <AccordionItem border='hidden'>
              <h2>
                <AccordionButton
                  _hover={{ background: 'white', color: '#76bc2a' }}
                  p={4}
                  borderRadius={'6px'}
                  textColor={'white'}
                >
                  <Box flex='1' textAlign='left' fontWeight={'semibold'}>
                    <Icon
                      mr='4'
                      fontSize='16'
                      _groupHover={{ color: '#76bc2a' }}
                      as={FiSettings}
                    />{' '}
                    Master
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={2} pb={4}>
                {sidemenu.master.map(menu => menu.base)}
              </AccordionPanel>
            </AccordionItem>
          ) : (
            ''
          )}
          {sidemenu.report.map(menu => userPermission.includes(menu.permission))
            .length > 0 ? (
            <AccordionItem border='hidden'>
              <h2>
                <AccordionButton
                  _hover={{ background: 'white', color: '#76bc2a' }}
                  p={4}
                  borderRadius={'6px'}
                  textColor={'white'}
                >
                  <Box flex='1' textAlign='left' fontWeight={'semibold'}>
                    <Icon
                      mr='4'
                      fontSize='16'
                      _groupHover={{ color: '#76bc2a' }}
                      as={FiFilePlus}
                    />{' '}
                    Report
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={2} pb={4}>
                {sidemenu.report.map(menu => menu.base)}
              </AccordionPanel>
            </AccordionItem>
          ) : (
            ''
          )}
        </Accordion>
      </Box>
      <Box
        display={isToggled ? 'block' : 'none'}
        maxH={{ base: 'none', sm: '80vh' }}
        overflowY={'auto'}
        sx={{
          '::-webkit-scrollbar': {
            width: '0.5vw',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
          },
        }}
      >
        {sidemenu.dashboard.mobile}
        {sidemenu.po.map(menu => menu.mobile)}
        {sidemenu.rfp.map(menu => menu.mobile)}
        {sidemenu.master.map(menu => menu.mobile)}
        {sidemenu.report.map(menu => menu.mobile)}
      </Box>
    </Box>
  )
}

const NavItem = ({ link, icon, children, ...rest }) => {
  return (
    <Link
      to={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        textColor={'white'}
        fontWeight={'semibold'}
        _hover={{ background: 'white', color: '#76bc2a' }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{ color: '#76bc2a' }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}
const ToggledItem = ({ link, icon, name = '' }) => {
  const navigate = useNavigate()
  return (
    <Flex
      mb={1}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        onClick={() => navigate(link)}
        p='4'
        as={'button'}
        borderRadius={'lg'}
        cursor='pointer'
        textColor={'white'}
        _hover={{ background: 'white', color: '#76bc2a' }}
      >
        <Icon
          as={icon}
          w={'20px'}
          h={'20px'}
          _groupHover={{ color: '#76bc2a' }}
        />
      </Flex>
      <Text
        maxW={'80px'}
        mt={1}
        textAlign={'center'}
        fontSize={'12px'}
        fontWeight={'medium'}
        color={'white'}
      >
        {name.toUpperCase()}
      </Text>
    </Flex>
  )
}
export default Sidebar
