import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Td,
  Tr,
} from '@chakra-ui/react'

import { getRequestPO } from '../../../../features/Transaction/PO/getRequestPOSlice'
import { useEffect, useState } from 'react'
import { convertBase64ToBlob } from '../../../../utils/helper'
import { FiSearch } from 'react-icons/fi'
import { ContentWrapper, TablePaginate } from '../../../../components'
import { useLocation, useNavigate } from 'react-router-dom'

const PORequestList = ({ user }) => {
  const dispatch = useDispatch()
  const requestPOState = useSelector(state => state.getRequestPO)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = data => {
    // if (data.State === 'DRAFT' || data.State === 'Draft') {
    //   navigate(`form/view/${data.Number}`)
    // } else {
    //   navigate(data.Number)
    // }
    navigate(`/po/form/${data.Number}`)
  }

  const params = new URLSearchParams(location.search)
  const status = params.get('status')

  useEffect(() => {
    dispatch(
      getRequestPO({
        params: {
          view: user.view,
          country: user.country,
          username: user.username,
        },
      })
    )
  }, [dispatch])

  return (
    <>
      <ContentWrapper heading='Purchase Order'>
        <ButtonGroup mb={3} color={'white'} variant='solid' spacing='4'>
          <Button colorScheme={'blue'} onClick={() => navigate('/po/form')}>
            New Purchase Order
          </Button>
          <Button
            // isDisabled={
            //   !user.permission.includes("masteruser.permission.create")
            // }
            colorScheme={'teal'}
          >
            Download List
          </Button>
        </ButtonGroup>

        <TablePaginate
          searchComponent={
            <InputGroup maxW={'450px'}>
              <InputLeftAddon
                // eslint-disable-next-line react/no-children-prop
                children={<FiSearch />}
                bg={'blackAlpha.200'}
                maxW={'400px'}
              />
              <Input
                value={search}
                placeholder={'Search'}
                minW={'200px'}
                onChange={e => setSearch(e.target.value.toLowerCase())}
              />
            </InputGroup>
          }
          tableHead={[
            'Code',
            'Create By',
            'Supplier name',
            'PO date',
            'Transaction Group',
            'Status',
            'PPP Number',
            'PPP Value',
            'Current Balance',
            'Requestor',
            'LOB',
            'Brand',
            'Country',
          ]}
          tableStatus={requestPOState.status}
          tableItem={requestPOState?.data?.data
            ?.filter(
              d =>
                d.Number?.toLocaleLowerCase().includes(search) ||
                d.Created_by?.toLocaleLowerCase().includes(search) ||
                d.Purchase_Order_Date?.toLocaleLowerCase().includes(search) ||
                d.description?.toLocaleLowerCase().includes(search) ||
                d.State?.toLocaleLowerCase().includes(search) ||
                d.PPP_number?.toLocaleLowerCase().includes(search) ||
                d.PPP_BalanceWriteoff?.toLocaleLowerCase().includes(search) ||
                d.Requestor?.toLocaleLowerCase().includes(search) ||
                d.LOB?.toLocaleLowerCase().includes(search) ||
                d.Brand?.toLocaleLowerCase().includes(search) ||
                d.Country?.toLocaleLowerCase().includes(search) ||
                d.PPP_value?.toLocaleLowerCase().includes(search) ||
                d.supplier?.toLocaleLowerCase().includes(search)
            )
            ?.map((d, key) => {
              return (
                <Tr key={key} textTransform={'uppercase'}>
                  <Td
                    sx={{
                      textDecoration: 'underline',
                      color: 'teal',
                      _hover: { cursor: 'pointer' },
                    }}
                    onClick={() => handleNavigate(d)}
                  >
                    {d.Number}
                  </Td>
                  <Td whiteSpace={'normal'}>{d.Created_by}</Td>
                  <Td whiteSpace={'normal'}>{d.supplier}</Td>
                  <Td whiteSpace={'normal'}>{d.Purchase_Order_Date}</Td>
                  <Td whiteSpace={'normal'}>{d.description}</Td>
                  <Td whiteSpace={'normal'}>{d.State}</Td>
                  <Td whiteSpace={'normal'}>{d.PPP_number}</Td>
                  <Td whiteSpace={'normal'}>{d.PPP_value}</Td>
                  <Td whiteSpace={'normal'}>{d.PPP_BalanceWriteoff}</Td>
                  <Td whiteSpace={'normal'}>{d.Requestor}</Td>
                  <Td whiteSpace={'normal'}>{d.LOB}</Td>
                  <Td whiteSpace={'normal'}>{d.Brand}</Td>
                  <Td whiteSpace={'normal'}>{d.Country}</Td>
                </Tr>
              )
            })}
        />
      </ContentWrapper>
    </>
  )
}

export default PORequestList
