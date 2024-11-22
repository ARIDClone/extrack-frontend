import { useDispatch, useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import {
  Alert,
  ContentWrapper,
  TabDetail,
  TablePaginate,
  useToastHook,
  ModalComponent,
  CustomTag,
  InputTypeComponent,
  RadioInputComponent,
  TagForm,
} from '../../../../components'
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Textarea,
  position,
} from '@chakra-ui/react'
import { Select as SearchSelect } from 'chakra-react-select'
import { getCountry } from '../../../../features/Master/Country/getCountrySlice'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { getTransactionGroupList } from '../../../../features/Master/TransactionGroup/getTransactionGroupListSlice'
import { getCurrency } from '../../../../features/Master/Currency/getCurrencySlice'
import { getCSupplier } from '../../../../features/Master/CSupplier/getCSupplierSlice'
import { getRequestorPPP } from '../../../../features/Transaction/PPP/getRequestorPPPSlice'
import { getLOB } from '../../../../features/Master/LOB/getLOBSlice'
import { getBrand } from '../../../../features/Master/Brand/getBrandSlice'
import { getYear } from '../../../../features/Master/Date/getYearSlice'
// import { getMonth } from '../../../../features/Master/Date/getMonthSlice'
import { getSupplier } from '../../../../features/Master/Supplier/getSupplierSlice'
import { getBalancePPP } from '../../../../features/Transaction/PPP/getBalancePPPSlice'
import { getTransactionGroupID } from '../../../../features/Master/TransactionGroup/getTransactionGroupIDSlice'
import { getPPPOnPO } from '../../../../features/Transaction/PO/getPPPOnPOSlice'
import { monthOfYear } from '../../../../utils/constant'
import { useModal } from 'use-modal-hook'
import { getRate } from '../../../../features/Master/Rate/getRateSlice'
import { savePO } from '../../../../features/Transaction/PO/savePOSlice'
import { getPO } from '../../../../features/Transaction/PO/getPOSlice'
import { updateBalancePO } from '../../../../features/Transaction/PO/updateBalancePOSlice'
import moment from 'moment/moment'
import { useLocation, useParams } from 'react-router-dom'
import { getTrackingApprovalPO } from '../../../../features/Transaction/PO/getTrackingApprovalPOSlice'
import PORequestDetail from './PORequestDetail'
import PORequestAttachment from './PORequestAttachment'
import PORequestWriteOff from './PORequestWriteOff'
import { parseToThousand } from '../../../../utils/helper'
import { env } from '../../../../utils/constant'

const PORequestForm = ({ user }) => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const alwaysDisabled = true

  const [metadataPO, setMetadataPO] = useState({})
  const [prefix, setPrefix] = useState('')
  const [groupID, setGroupID] = useState('')
  const [Code, setCode] = useState('')
  const [rateID, setRateID] = useState('')
  const [PPPBalance, setPPPBalance] = useState({})
  const [statusBalance, setStatusBalance] = useState('inactive')
  const [search, setSearch] = useState('')
  const [header, setHeader] = useState({})
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isRequestorButtonVisible, setIsRequestorButtonVisible] =
    useState(false)
  const [isApproverButtonVisible, setIsApproverButtonVisible] = useState(false)
  const [toast, setToast] = useToastHook()

  const {
    handleSubmit: handleSubmitHeader,
    reset: resetHeader,
    register: registerHeader,
    watch: watchHeader,
    setValue: setValueHeader,
    getValues: getValuesHeader,
    formState: { errors: errorsHeader, isSubmitting: isSubmittingHeader },
  } = useForm()

  const formProps = {
    register: registerHeader,
    errors: errorsHeader,
    watch: watchHeader,
    setValue: setValueHeader,
    getValues: getValuesHeader,
  }

  const {
    isOpen: isApproverOpen,
    onOpen: onApproverOpen,
    onClose: onApproverClose,
  } = useDisclosure()

  const getPOState = useSelector(state => state.getPO)
  const countryState = useSelector(state => state.getCountry)
  const transactionGroupListState = useSelector(
    state => state.getTransactionGroupList
  )
  const currencyState = useSelector(state => state.getCurrency)
  const csupplierState = useSelector(state => state.getCSupplier)
  const requestorState = useSelector(state => state.getRequestorPPP)
  const LOBState = useSelector(state => state.getLOB)
  const BrandState = useSelector(state => state.getBrand)
  const YearState = useSelector(state => state.getYear)
  // const MonthState = useSelector(state => state.getMonth)
  const SupplierState = useSelector(state => state.getSupplier)
  const BalanceState = useSelector(state => state.getBalancePPP)
  const transactionGroupIDState = useSelector(
    state => state.getTransactionGroupID
  )
  const PPPOnPOState = useSelector(state => state.getPPPonPO)
  const rateState = useSelector(state => state.getRate)
  const savePOState = useSelector(state => state.savePO)
  const updateBalancePOState = useSelector(state => state.updateBalancePO)
  const TrackingApprovalPOState = useSelector(
    state => state.getTrackingApprovalPO
  )

  const [showModal, hideModal] = useModal(Alert)

  // Get PO and load data
  useEffect(() => {
    if (id) {
      dispatch(
        getPO({
          params: {
            id,
            userCountry: user.country,
            view: user.view,
          },
        })
      )
      setIsCreating(false)
      setIsEditing(false)
    } else {
      setMetadataPO(prevMetadataPO => ({}))
      setIsCreating(true)
      setIsEditing(false)
    }

    dispatch(getCountry({}))
    dispatch(
      getTransactionGroupList({
        params: {
          country: user.country,
        },
      })
    )
    dispatch(getCurrency({}))
    dispatch(getCSupplier({}))
    dispatch(
      getRequestorPPP({
        params: {
          country: user.country,
        },
      })
    )
    dispatch(getLOB({}))
    dispatch(getBrand({}))
    dispatch(getYear({}))
    // dispatch(getMonth({}))
  }, [dispatch])

  // set default value for parameter
  useEffect(() => {
    if (
      LOBState.data?.data?.length > 0 ||
      requestorState.data?.data?.length > 0 ||
      YearState.data?.data?.length > 0 ||
      BrandState.data?.data?.length > 0
    ) {
      setMetadataPO(prevMetadataPO => ({
        ...prevMetadataPO,
        LOB: 'ALL',
        requestor: 'ALL',
        PPPCreateDateYear: 'ALL',
        PPPCreateDateMonth: 'ALL',
        brand: 'ALL',
      }))
    }
  }, [
    LOBState.data.data,
    BrandState.data.data,
    requestorState.data.data,
    YearState.data.data,
    monthOfYear,
  ])

  // get country
  useEffect(() => {
    if (countryState.data?.data?.length > 0) {
      const match = countryState.data.data.some(
        item => item.Con_Name.toUpperCase() === user.country.toUpperCase()
      )
      if (match) {
        setMetadataPO(prevMetadataPO => ({
          ...prevMetadataPO,
          country: user.country,
        }))
      } else {
        setToast({
          message: `Country user not registered, please contact administrator`,
          type: 'error',
        })
      }
    }
  }, [countryState.status])

  // get date
  useEffect(() => {
    if (id && getPOState.data?.data?.dataPO?.[0]) {
      const datePO = new Date(
        getPOState.data.data.dataPO[0].purchase_order_date
      )
        .toISOString()
        .split('T')[0]
      // setValueHeader('date', datePO)
      console.log('if kondisi', datePO)
      setMetadataPO(prevMetadataPO => ({ ...prevMetadataPO, date: datePO }))
    } else if (!id) {
      const date = new Date()
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      const currentDate = [year, month, day].join('-')
      console.log('else kondisi', currentDate)

      // setValueHeader('date', currentDate)
      setMetadataPO(prevMetadataPO => ({
        ...prevMetadataPO,
        date: currentDate,
      }))
    }
    // setValueHeader('DeliveryDate', currentDate)
  }, [id, getPOState.status])

  // get rate
  useEffect(() => {
    console.log('Current transactionCurrency:', metadataPO.transactionCurrency)
    console.log('Current date:', metadataPO.date)

    if (metadataPO.transactionCurrency && metadataPO.date) {
      console.log('masuk kondisi tc: ', metadataPO.transactionCurrency)
      let dateObject = new Date(metadataPO.date)
      console.log('dateobject: ', dateObject)
      console.log('currency: ', metadataPO.transactionCurrency)
      dispatch(
        getRate({
          data: {
            date: dateObject,
            currency: metadataPO.transactionCurrency,
          },
        })
      )
    }
  }, [metadataPO.transactionCurrency, metadataPO.date])

  // FILL RATE CURRENCY
  useEffect(() => {
    if (
      rateState.status === 'loaded' &&
      rateState.data?.data?.length > 0 &&
      metadataPO.transactionCurrency
    ) {
      console.log('sebelum: ', metadataPO)
      //setRateID(rateState.data.data[0].rateid)
      // setValueHeader('Rate', rateState.data.data[0].value)
      setMetadataPO(prevMetadataPO => ({
        ...prevMetadataPO,
        rate: rateState.data.data[0].value,
        rateId: rateState.data.data[0].rateid,
      }))
    } else if (
      rateState.status === 'error' ||
      rateState.data?.data?.length === 0
    ) {
      setToast({
        message: rateState.data.message,
        type: 'error',
      })
    }
  }, [rateState.status, metadataPO.transactionCurrency])

  // get supplier
  useEffect(() => {
    if (metadataPO.country && metadataPO.POPaidBy) {
      dispatch(
        getSupplier({
          params: {
            country: metadataPO.country,
            POPaidBy: metadataPO.POPaidBy,
          },
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadataPO.country, metadataPO.POPaidBy])

  // transaction group
  useEffect(() => {
    if (metadataPO.transactionGroup) {
      dispatch(
        getTransactionGroupID({
          params: {
            country: user.country,
            trgroup: metadataPO.transactionGroup,
          },
        })
      )
      setMetadataPO(prevMetadataPO => ({
        ...prevMetadataPO,
        purpose: '',
        programTitle: '',
        scheme: '',
        additionalNote: '',
        objective: '',
        mechanics: '',
        deliveryPlace: '',
        deliveryDate: '',
        paymentTerms: '',
      }))
    }
  }, [metadataPO.transactionGroup])

  // get transaction group id
  useEffect(() => {
    if (transactionGroupIDState.status === 'loaded') {
      transactionGroupIDState.data.data.map(e => {
        // setPrefix(e.prefix)
        // setGroupID(e.id)
        // setCode(e.transaction_type_id)
        setMetadataPO(prevMetadataPO => ({
          ...prevMetadataPO,
          prefix: e.prefix,
          groupId: e.id,
          trType: e.transaction_type_id,
        }))
      })
    }
  }, [transactionGroupIDState.status])

  // load data PO (narik supplier dulu)
  useEffect(() => {
    if (
      getPOState.status === 'loaded' &&
      countryState.status === 'loaded' &&
      csupplierState.status === 'loaded'
    ) {
      // console.log('a', SupplierState)
      const data = getPOState?.data?.data?.dataPO?.[0]
      dispatch(
        getSupplier({
          params: {
            country: data.country,
            POPaidBy: data.paid_po,
          },
        })
      )

      dispatch(
        getPPPOnPO({
          params: {
            PPPNumber: data.ppp_number,
            PPPBrand: data.brand,
          },
        })
      )

      dispatch(
        getTrackingApprovalPO({
          params: {
            id: data.id_po,
          },
        })
      )
    }
  }, [getPOState.status, countryState.status, csupplierState.status])

  // get data PO (all value)
  useEffect(() => {
    if (
      id &&
      getPOState.status === 'loaded' &&
      countryState.status === 'loaded' &&
      transactionGroupListState.status === 'loaded' &&
      currencyState.status === 'loaded' &&
      csupplierState.status === 'loaded' &&
      requestorState.status === 'loaded' &&
      LOBState.status === 'loaded' &&
      BrandState.status === 'loaded' &&
      YearState.status === 'loaded' &&
      // MonthState.status === 'loaded' &&
      SupplierState.status === 'loaded' &&
      PPPOnPOState.status === 'loaded'
    ) {
      setStatusBalance('active')
      const data = getPOState?.data?.data?.dataPO?.[0]
      console.log('looping bos')
      console.log(getPOState?.data?.data?.dataPO?.[0])

      setPPPBalance({
        PPPNumber: data.ppp_number,
        PPPLOB: data.lob,
        PPPBrand: data.brand,
        PPPRequestor: data.requestor,
        PPPCost: data.ppp_cost,
      })

      setMetadataPO(prevMetadataPO => ({
        ...prevMetadataPO,
        statusForm: data.state_po,
        nextApproval: data.Must_approved_by,
        numberDocument: data.number,
        country: data.country,
        transactionGroup: data.a,
        transactionCurrency: data.currency1_id,
        rate: data.rate,
        POPaidBy: data.paid_po,
        supplier: data.supplier_id,
        additionalInstructions: data.add_intructions_t,
        purpose: data.reasonfor_investment_t,
        deliveryPlace: data.delivery_place_t,
        deliveryDate: new Date(data.delivery_date).toISOString().split('T')[0],
        paymentTerms: data.payment_terms_t,
        programTitle: data.Program_tittle_t,
        objective: data.Objective_t,
        scheme: data.scheme_t,
        mechanics: data.mechanics_t,
        additionalNote: data.activities_component_t,
      }))
      // setValueHeader('statusForm', data.state_po)
      // setValueHeader('nextApproval', data.Must_approved_by)
      // setValueHeader('numberDocument', data.number)
      // setValueHeader('country', data.country)
      // setValueHeader(
      //   'date',
      //   new Date(data.purchase_order_date).toISOString().split('T')[0]
      // )
      // setValueHeader('transactionGroup', data.a)
      // setValueHeader('transactionCurrency', data.currency1_id)
      // setValueHeader('Rate', data.rate)
      // setValueHeader('POPaidBy', data.paid_po)
      // setValueHeader('Supplier', data.supplier_id)
      // setValueHeader('AdditionalInstructions', data.add_intructions_t)
      // setValueHeader('Purpose', data.reasonfor_investment_t)
      // setValueHeader('DeliveryPlace', data.delivery_place_t)
      // setValueHeader(
      //   'DeliveryDate',
      //   new Date(data.delivery_date).toISOString().split('T')[0]
      // )
      // setValueHeader('PaymentTerms', data.payment_terms_t)
      // setValueHeader('ProgramTitle', data.Program_tittle_t)
      // setValueHeader('Objective', data.objective_t)
      // setValueHeader('Scheme', data.scheme_t)
      // setValueHeader('Mechanics', data.mechanics_t)
      // setValueHeader('AdditionalNote', data.activities_component_t)

      setHeader(getPOState.data.data)
    }
  }, [
    getPOState.status,
    countryState.status,
    transactionGroupListState.status,
    currencyState.status,
    csupplierState.status,
    requestorState.status,
    LOBState.status,
    BrandState.status,
    YearState.status,
    // MonthState.status,
    SupplierState.status,
    PPPOnPOState.status,
  ])

  // set supplier
  // useEffect(() => {
  //   console.log('use ask', watchHeader('Supplier'))
  //   if (
  //     getPOState.status === 'loaded' &&
  //     SupplierState.status === 'loaded') {
  //     console.log(watchHeader('country'))
  //     console.log(watchHeader('POPaidBy'))
  //     console.log(watchHeader('Supplier'))
  //     console.log(getPOState)
  //     getPOState?.data?.data.forEach(e => {
  //       setValueHeader(('Supplier', e.supplier_id))
  //     })
  //   }
  // }, [useWatch])

  // search ppp balance
  const searchBalanceHandler = e => {
    if (
      metadataPO.LOB &&
      metadataPO.brand &&
      metadataPO.requestor &&
      metadataPO.PPPCreateDateYear &&
      metadataPO.PPPCreateDateMonth
    ) {
      dispatch(
        getBalancePPP({
          params: {
            country: user.country,
            lob: metadataPO.LOB,
            brand: metadataPO.brand,
            requestor: metadataPO.requestor,
            year: metadataPO.PPPCreateDateYear,
            month: metadataPO.PPPCreateDateMonth,
          },
        })
      )
      setPPPBalance({})
      setStatusBalance('inactive')
    } else {
      setToast({
        message: `Please fill all input PPP Balance`,
        type: 'error',
      })
    }
  }

  // select ppp balance
  const selectBalanceHandler = e => {
    setPPPBalance({
      PPPNumber: e.PPP_Number,
      PPPLOB: e.PPP_LOB,
      PPPBrand: e.Brand,
      PPPRequestor: e.PPP_Requestor,
      PPPCost: e.PPP_CostDetail,
    })

    dispatch(
      getPPPOnPO({
        params: {
          PPPNumber: e.PPP_Number,
          PPPBrand: e.Brand,
        },
      })
    )

    setStatusBalance('active')

    if (e.PPP_BalanceWriteoff <= 0) {
      setToast({
        message: `Your balance PPP is negative or bellow zero`,
        type: 'warning',
      })
    }
    // console.log(number)
    if (id) {
      // jalanin update number ke t_pas_po
      dispatch(
        updateBalancePO({
          data: {
            PPPNumber: e.PPP_Number,
            PPPBrand: e.Brand,
            PPPCost: e.PPP_CostDetail,
            LOB: e.PPP_LOB,
            Requestor: e.PPP_Requestor,
            Number: id,
          },
        })
      )
    }
  }

  // reset save po
  useEffect(() => {
    if (savePOState.status !== 'idle' || savePOState.status !== 'loading') {
      if (savePOState.status === 'error') {
        setToast({
          message: `Failed to save PO`,
          type: 'error',
        })
      } else if (savePOState.status === 'loaded') {
        setToast({ message: 'Save PO success', type: 'success' })
        dispatch(savePO({ action: 'reset' }))
        window.location.replace(
          `${env.appUrl}/po/form/${savePOState.data.data}`
        )
        window.location.reload()
      }
    }
  }, [savePOState.status])

  return (
    <ContentWrapper heading='Form Purchase Order'>
      <Stack direction={'column'}>
        <Text color={'gray.400'}>*Please fill out the form</Text>
        {countryState.status === 'loaded' &&
        transactionGroupListState.status === 'loaded' &&
        currencyState.status === 'loaded' &&
        csupplierState.status === 'loaded' &&
        requestorState.status === 'loaded' &&
        LOBState.status === 'loaded' &&
        BrandState.status === 'loaded' &&
        // MonthState.status === 'loaded' &&
        YearState.status === 'loaded' ? (
          <>
            <SimpleGrid
              columns={{ md: 1, lg: 2 }}
              columnGap='40px'
              flexDirection={'row'}
            >
              <TagForm
                label={'Document Status'}
                value={metadataPO.statusForm}
              />
              <Box></Box>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={false}
              >
                <FormLabel htmlFor='nextApproval' mt={2} minWidth={'200px'}>
                  Next Approval
                </FormLabel>
                <Input
                  id='nextApproval'
                  placeholder={'Next Approval'}
                  isReadOnly={true}
                  defaultValue={metadataPO.nextApproval}
                  background={'gray.300'}
                />
              </FormControl>
              <Box></Box>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={false}
              >
                <FormLabel htmlFor='proposalNumber' mt={2} minWidth={'200px'}>
                  Proposal Number
                </FormLabel>
                <Input
                  id='proposalNumber'
                  placeholder={'proposal Number'}
                  isReadOnly={true}
                  defaultValue={metadataPO.numberDocument}
                  background={'gray.300'}
                />
              </FormControl>
              <Box></Box>
            </SimpleGrid>
            <Divider mt={4} borderColor={'gray.500'} borderWidth={'1px'} />
            <SimpleGrid
              columns={{ md: 1, lg: 2 }}
              columnGap='40px'
              flexDirection={'row'}
            >
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel htmlFor={'country'} mt={2} minWidth={'200px'}>
                  Country
                </FormLabel>
                <SearchSelect
                  id={'country'}
                  options={countryState.data.data.map(item => ({
                    value: item.Con_Name.toUpperCase(),
                    label: item.Con_Name.toUpperCase(),
                  }))}
                  placeholder={'Select Country'}
                  value={
                    metadataPO.country
                      ? {
                          value: metadataPO.country?.toUpperCase(),
                          label: metadataPO.country?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      country: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={alwaysDisabled}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: alwaysDisabled ? 'gray.300' : '',
                      width: '100%',
                    }),
                  }}
                />
              </FormControl>
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel htmlFor='date' mt={2} minWidth={'200px'}>
                  PO Date
                </FormLabel>
                <Input
                  id={'date'}
                  isReadOnly={alwaysDisabled}
                  background={'gray.300'}
                  type={'date'}
                  defaultValue={metadataPO.date}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel
                  htmlFor={'transactionGroup'}
                  mt={2}
                  minWidth={'200px'}
                >
                  Transaction Group
                </FormLabel>
                <SearchSelect
                  id={'transactionGroup'}
                  options={transactionGroupListState.data.data.map(item => ({
                    value: item.Description.toUpperCase(),
                    label: item.Description.toUpperCase(),
                  }))}
                  placeholder={'Select Transaction Group'}
                  value={
                    metadataPO.transactionGroup
                      ? {
                          value: metadataPO.transactionGroup?.toUpperCase(),
                          label: metadataPO.transactionGroup?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      transactionGroup: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                  }}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel
                  htmlFor={'transactionCurrency'}
                  mt={2}
                  minWidth={'200px'}
                >
                  Transaction Currency
                </FormLabel>
                <SearchSelect
                  id={'transactionCurrency'}
                  options={currencyState.data.data.map(item => ({
                    value: item.Curr_Code.toUpperCase(),
                    label: item.Curr_Code.toUpperCase(),
                  }))}
                  placeholder={'Select Transaction Group'}
                  value={
                    metadataPO.transactionCurrency
                      ? {
                          value: metadataPO.transactionCurrency?.toUpperCase(),
                          label: metadataPO.transactionCurrency?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      transactionCurrency: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                  }}
                />
              </FormControl>
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel htmlFor='rate' mt={2} minWidth={'200px'}>
                  Rate
                </FormLabel>
                <Input
                  id={'rate'}
                  step={'any'}
                  placeholder='Rate'
                  isReadOnly={alwaysDisabled}
                  background={alwaysDisabled ? 'gray.300' : ''}
                  value={parseToThousand(metadataPO.rate)}
                  textAlign={'right'}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor={'POPaidBy'} mt={2} minWidth={'200px'}>
                  PO Paid By
                </FormLabel>
                <SearchSelect
                  id={'POPaidBy'}
                  options={csupplierState.data.data.map(item => ({
                    value: item.CSupplier.toUpperCase(),
                    label: item.CSupplier.toUpperCase(),
                  }))}
                  placeholder={'Select PO Paid By'}
                  value={
                    metadataPO.POPaidBy
                      ? {
                          value: metadataPO.POPaidBy?.toUpperCase(),
                          label: metadataPO.POPaidBy?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      POPaidBy: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                  }}
                />
              </FormControl>

              <Box>
                <FormControl
                  display={{ md: 'inline-flex' }}
                  pt={4}
                  isRequired={true}
                >
                  <FormLabel htmlFor={'supplier'} mt={2} minWidth={'200px'}>
                    Supplier
                  </FormLabel>
                  <SearchSelect
                    id={'supplier'}
                    isLoading={SupplierState.status === 'loading'}
                    options={SupplierState?.data?.data?.map(item => ({
                      value: item.SuppID.toUpperCase(),
                      label: item.fullname.toUpperCase(),
                    }))}
                    placeholder={'select supplier'}
                    value={
                      metadataPO.supplier
                        ? {
                            value: metadataPO.supplier?.toUpperCase(),
                            label: SupplierState?.data?.data?.find(
                              item => item.SuppID === metadataPO.supplier
                            )?.fullname,
                          }
                        : []
                    }
                    onChange={e => {
                      setMetadataPO(prevMetadataPO => ({
                        ...prevMetadataPO,
                        supplier: e.value.toUpperCase(),
                      }))
                    }}
                    isReadOnly={isCreating ? false : true}
                    chakraStyles={{
                      container: provided => ({
                        ...provided,
                        borderRadius: '10',
                        background: isCreating ? '' : 'gray.300',
                        width: '100%',
                      }),
                    }}
                  />
                </FormControl>
              </Box>

              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel
                  htmlFor='additionalInstructions'
                  mt={2}
                  minWidth={'200px'}
                >
                  Additional Instructions
                </FormLabel>
                <Textarea
                  id={'additionalInstructions'}
                  placeholder='Additional Instructions'
                  isReadOnly={isCreating ? false : true}
                  background={isCreating ? '' : 'gray.300'}
                  value={metadataPO.additionalInstructions}
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      additionalInstructions: e.target.value,
                    }))
                  }}
                />
              </FormControl>

              {metadataPO?.prefix?.slice(0, 5) === 'XPONP' ||
              metadataPO?.prefix?.slice(0, 5) === 'XNONP' ||
              metadataPO?.prefix?.slice(0, 5) === 'XPOPF' ? (
                <FormControl
                  display={{ md: 'inline-flex' }}
                  pt={4}
                  isRequired={true}
                >
                  <FormLabel htmlFor='purpose' mt={2} minWidth={'200px'}>
                    Purpose
                  </FormLabel>
                  <Textarea
                    id={'purpose'}
                    placeholder='Purpose'
                    isReadOnly={isCreating ? false : true}
                    background={isCreating ? '' : 'gray.300'}
                    value={metadataPO.purpose}
                    onChange={e => {
                      setMetadataPO(prevMetadataPO => ({
                        ...prevMetadataPO,
                        purpose: e.target.value,
                      }))
                    }}
                  />
                </FormControl>
              ) : null}
              {metadataPO?.prefix?.slice(0, 5) === 'XPOPF' ? (
                <>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel
                      htmlFor='deliveryPlace'
                      mt={2}
                      minWidth={'200px'}
                    >
                      Delivery Place
                    </FormLabel>
                    <Textarea
                      id={'deliveryPlace'}
                      placeholder='Delivery Place'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.deliveryPlace}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          deliveryPlace: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel htmlFor='deliveryDate' mt={2} minWidth={'200px'}>
                      Delivery Date
                    </FormLabel>
                    <Input
                      id={'deliveryDate'}
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      type={'date'}
                      value={metadataPO.deliveryDate}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          deliveryDate: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel htmlFor='paymentTerms' mt={2} minWidth={'200px'}>
                      Payment Terms
                    </FormLabel>
                    <Textarea
                      id={'paymentTerms'}
                      placeholder='Payment Terms'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.paymentTerms}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          paymentTerms: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                </>
              ) : null}
              {metadataPO?.prefix?.slice(0, 5) === 'XPOMS' ? (
                <>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel htmlFor='programTitle' mt={2} minWidth={'200px'}>
                      Program Title
                    </FormLabel>
                    <Textarea
                      id={'programTitle'}
                      placeholder='Program Title'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.programTitle}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          programTitle: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel htmlFor='objective' mt={2} minWidth={'200px'}>
                      Objective(s)
                    </FormLabel>
                    <Textarea
                      id={'objective'}
                      placeholder='Objective'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.objective}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          objective: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel htmlFor='scheme' mt={2} minWidth={'200px'}>
                      Scheme
                    </FormLabel>
                    <Textarea
                      id={'scheme'}
                      placeholder='Scheme'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.scheme}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          scheme: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel htmlFor='mechanics' mt={2} minWidth={'200px'}>
                      Mechanics
                    </FormLabel>
                    <Textarea
                      id={'mechanics'}
                      placeholder='Mechanics'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.mechanics}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          mechanics: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display={{ md: 'inline-flex' }}
                    pt={4}
                    isRequired={true}
                  >
                    <FormLabel
                      htmlFor='additionalNote'
                      mt={2}
                      minWidth={'200px'}
                    >
                      Additional Note
                    </FormLabel>
                    <Textarea
                      id={'additionalNote'}
                      placeholder='AdditionalNote'
                      isReadOnly={isCreating ? false : true}
                      background={isCreating ? '' : 'gray.300'}
                      value={metadataPO.additionalNote}
                      onChange={e => {
                        setMetadataPO(prevMetadataPO => ({
                          ...prevMetadataPO,
                          additionalNote: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                </>
              ) : null}
            </SimpleGrid>
            <Divider
              mt={4}
              borderColor={'gray.500'}
              borderWidth={'1px'}
              mb={'2'}
            />
            <Text fontWeight={'bold'}>PPP BALANCE</Text>
            <SimpleGrid
              mb={4}
              columns={{ md: 1, lg: 2 }}
              columnGap='40px'
              flexDirection={'row'}
            >
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel htmlFor={'LOB'} mt={2} minWidth={'200px'}>
                  LOB
                </FormLabel>
                <SearchSelect
                  id={'LOB'}
                  options={LOBState.data.data.map(item => ({
                    value: item.lob_ID.toUpperCase(),
                    label: item.lob_ID.toUpperCase(),
                  }))}
                  placeholder={'Select LOB'}
                  value={
                    metadataPO.LOB
                      ? {
                          value: metadataPO.LOB?.toUpperCase(),
                          label: metadataPO.LOB?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      LOB: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                    menu: provided => ({
                      ...provided,
                      zIndex: 2,
                    }),
                  }}
                />
              </FormControl>
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel htmlFor={'brand'} mt={2} minWidth={'200px'}>
                  Brand
                </FormLabel>
                <SearchSelect
                  id={'brand'}
                  options={BrandState.data.data.map(item => ({
                    value: item.Brand_Code.toUpperCase(),
                    label: item.Brand_Code.toUpperCase(),
                  }))}
                  placeholder={'Select Brand'}
                  value={
                    metadataPO.brand
                      ? {
                          value: metadataPO.brand?.toUpperCase(),
                          label: metadataPO.brand?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      brand: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                    menu: provided => ({
                      ...provided,
                      zIndex: 2,
                    }),
                  }}
                />
              </FormControl>
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel htmlFor={'requestor'} mt={2} minWidth={'200px'}>
                  Requestor
                </FormLabel>
                <SearchSelect
                  id={'requestor'}
                  options={requestorState.data.data.map(item => ({
                    value: item.ppp_requestor.toUpperCase(),
                    label: item.ppp_requestor.toUpperCase(),
                  }))}
                  placeholder={'Select Requestor'}
                  value={
                    metadataPO.requestor
                      ? {
                          value: metadataPO.requestor?.toUpperCase(),
                          label: metadataPO.requestor?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      requestor: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                    menu: provided => ({
                      ...provided,
                      zIndex: 2,
                    }),
                  }}
                />
              </FormControl>
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel
                  htmlFor={'PPPCreateDateYear'}
                  mt={2}
                  minWidth={'200px'}
                >
                  PPP Create Date (Year)
                </FormLabel>
                <SearchSelect
                  id={'PPPCreateDateYear'}
                  options={YearState.data.data.map(item => ({
                    value: item.year.toUpperCase(),
                    label: item.year.toUpperCase(),
                  }))}
                  placeholder={'Select Year'}
                  value={
                    metadataPO.PPPCreateDateYear
                      ? {
                          value: metadataPO.PPPCreateDateYear?.toUpperCase(),
                          label: metadataPO.PPPCreateDateYear?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      PPPCreateDateYear: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                    menu: provided => ({
                      ...provided,
                      zIndex: 2,
                    }),
                  }}
                />
              </FormControl>
              <FormControl display={{ md: 'inline-flex' }} pt={4}>
                <FormLabel
                  htmlFor={'PPPCreateDateMonth'}
                  mt={2}
                  minWidth={'200px'}
                >
                  PPP Create Date (Month)
                </FormLabel>
                <SearchSelect
                  id={'PPPCreateDateMonth'}
                  options={monthOfYear.map(item => ({
                    label: item.name.toUpperCase(),
                    value: item.number,
                  }))}
                  placeholder={'Select Month'}
                  value={
                    metadataPO.PPPCreateDateMonth
                      ? {
                          value: metadataPO.PPPCreateDateMonth?.toUpperCase(),
                          label: metadataPO.PPPCreateDateMonth?.toUpperCase(),
                        }
                      : []
                  }
                  onChange={e => {
                    setMetadataPO(prevMetadataPO => ({
                      ...prevMetadataPO,
                      PPPCreateDateMonth: e.value.toUpperCase(),
                    }))
                  }}
                  isReadOnly={isCreating ? false : true}
                  chakraStyles={{
                    container: provided => ({
                      ...provided,
                      borderRadius: '10',
                      background: isCreating ? '' : 'gray.300',
                      width: '100%',
                    }),
                    menu: provided => ({
                      ...provided,
                      zIndex: 2,
                    }),
                  }}
                />
              </FormControl>
              <Button
                mt={4}
                ml={'auto'}
                colorScheme='teal'
                isLoading={BalanceState.status === 'loading'}
                w={'40'}
                onClick={searchBalanceHandler}
              >
                Search
              </Button>
            </SimpleGrid>
            {BalanceState.status === 'loading' ||
            (BalanceState.status === 'loaded' &&
              statusBalance === 'inactive') ? (
              <TablePaginate
                actionMenu={true}
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
                  'Number',
                  'Program',
                  'LOB',
                  'Brand',
                  'Requestor',
                  'PPP Value (Brand)',
                  'PPP Balance',
                  'Action',
                ]}
                tableStatus={BalanceState.status}
                tableItem={BalanceState?.data?.data
                  ?.filter(
                    d =>
                      d.PPP_Number.toLocaleLowerCase().includes(search) ||
                      d.PPP_Program.toLocaleLowerCase().includes(search) ||
                      d.PPP_LOB.toLocaleLowerCase().includes(search) ||
                      d.Brand.toLocaleLowerCase().includes(search) ||
                      d.PPP_Requestor.toLocaleLowerCase().includes(search)
                    // d.PPP_CostDetail.includes(search) ||
                    // d.PPP_BalanceWriteoff.includes(search)
                  )
                  ?.map((d, key) => {
                    return (
                      <Tr key={key} textTransform={'uppercase'}>
                        <Td whiteSpace={'normal'}>{d.PPP_Number}</Td>
                        <Td whiteSpace={'normal'}>{d.PPP_Program}</Td>
                        <Td whiteSpace={'normal'}>{d.PPP_LOB}</Td>
                        <Td whiteSpace={'normal'}>{d.Brand}</Td>
                        <Td whiteSpace={'normal'}>{d.PPP_Requestor}</Td>
                        <Td whiteSpace={'normal'}>{d.PPP_CostDetail}</Td>
                        <Td whiteSpace={'normal'}>{d.PPP_BalanceWriteoff}</Td>
                        <Td
                          position={'sticky'}
                          right={0}
                          bg={'white'}
                          // zIndex={0}
                        >
                          <Button
                            colorScheme={'blue'}
                            size={'sm'}
                            color={'white'}
                            onClick={() => {
                              selectBalanceHandler(d)
                            }}
                          >
                            Select
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })}
              />
            ) : null}
            {statusBalance === 'active' ? (
              <TablePaginate
                actionMenu={true}
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
                  'PPP Number',
                  'PPP Description',
                  'LOB',
                  'Brand',
                  'Requestor',
                  'PPP Value',
                  'PO Committed',
                  'PPP Balance',
                  'Action',
                ]}
                tableStatus={PPPOnPOState.status}
                tableItem={PPPOnPOState?.data?.data?.map((d, key) => {
                  return (
                    <Tr key={key} textTransform={'uppercase'}>
                      <Td whiteSpace={'normal'}>{d.PPP_Number}</Td>
                      <Td whiteSpace={'normal'}>{d.PPP_Program}</Td>
                      <Td whiteSpace={'normal'}>{d.PPP_LOB}</Td>
                      <Td whiteSpace={'normal'}>{d.ppp_brand}</Td>
                      <Td whiteSpace={'normal'}>{d.PPP_Requestor}</Td>
                      <Td whiteSpace={'normal'}>{d.PPP_value}</Td>
                      <Td whiteSpace={'normal'}>{d.PPP_Comm_PO}</Td>
                      <Td whiteSpace={'normal'}>{d.PPP_BalanceWriteoff}</Td>
                      <Td
                        position={'sticky'}
                        right={0}
                        bg={'white'}
                        // zIndex={0}
                      >
                        <Button
                          colorScheme={'red'}
                          size={'sm'}
                          color={'white'}
                          onClick={() => {
                            // setPPPBalance({ status: 'inactive', data: [] })
                            setStatusBalance('inactive')
                            setPPPBalance({})
                          }}
                        >
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  )
                })}
              />
            ) : null}
            <Box py={4} bg={'white'}>
              <Divider borderColor={'gray.500'} borderWidth={'1px'} />

              <Center>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={savePOState.status === 'loading'}
                  mr='4'
                  onClick={e => {
                    const tahun = moment().year()
                    const thn = parseInt(moment().format('YY'))
                    const bln = moment().month() + 1

                    if (PPPBalance) {
                      // console.log('masuk')
                      dispatch(
                        savePO({
                          data: {
                            ...metadataPO,
                            ...PPPBalance,
                          },
                        })
                      )
                      // console.log(savePOState.status === 'loading')
                    } else {
                      setToast({
                        message: `Please select PPP Balance`,
                        type: 'error',
                      })
                    }
                  }}
                >
                  Save
                </Button>
              </Center>
            </Box>
          </>
        ) : (
          <Flex
            mb={2}
            w={'full'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Spinner size={'xl'} color='green.500' />
          </Flex>
        )}

        <Divider mt={-2} borderColor={'black'} borderWidth={'2px'} mb={'2'} />
        <Text fontSize={24} fontWeight={'bold'} mb={4}>
          Purchase Order Detail
        </Text>

        <Tabs isFitted variant={'enclosed'} colorScheme='green'>
          <TabList>
            <Tab
              fontWeight={'medium'}
              _selected={{ bg: '#76bc2a', color: 'white' }}
              bg={'blackAlpha.50'}
              ml={2}
            >
              Purchase Order Details
            </Tab>
            <Tab
              fontWeight={'medium'}
              _selected={{ bg: '#76bc2a', color: 'white' }}
              bg={'blackAlpha.50'}
              ml={2}
            >
              Attachment
            </Tab>
            <Tab
              fontWeight={'medium'}
              _selected={{ bg: '#76bc2a', color: 'white' }}
              bg={'blackAlpha.50'}
              ml={2}
            >
              PO Write Off
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PORequestDetail user={user} header={header} />
            </TabPanel>
            <TabPanel>
              <PORequestAttachment user={user} header={header} />
            </TabPanel>
            <TabPanel>
              <PORequestWriteOff user={user} header={header} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </ContentWrapper>
  )
}

export default PORequestForm
