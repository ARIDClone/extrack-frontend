import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
// import {
//   InputDate,
//   InputNumber,
//   InputSearchSelect,
//   InputText,
// } from '../../../../components'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { InputTypeComponent, Alert } from '../../../../components'
import { createPODetail } from '../../../../features/Transaction/PO/createPODetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'use-modal-hook'

const PORequestDetail = ({ user, header }) => {
  const dispatch = useDispatch()
  const [showModal, hideModal] = useModal(Alert)
  const [buttonDetailDisabled, setButtonDetailDisabled] = useState(true)
  const [buttonAddDisabled, setbuttonAddDisabled] = useState(true)
  const [metadataDetail, setMetadataDetail] = useState({})

  const createPODetailState = useSelector(state => state.createPODetail)

  const {
    handleSubmit: handleSubmitDetail,
    register: registerDetail,
    watch: watchDetail,
    setValue: setValueDetail,
    getValues: getValuesDetail,
    formState: { errors: errorsDetail, isSubmitting: isSubmittingDetail },
  } = useForm()

  const formPropsDetail = {
    register: registerDetail,
    errors: errorsDetail,
    watch: watchDetail,
    setValue: setValueDetail,
    getValues: getValuesDetail,
  }

  // set value
  useEffect(() => {
    if (Object.keys(header).length > 0) {
      const date = new Date()
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      const currentDate = [year, month, day].join('-')

      setButtonDetailDisabled(false)
      setValueDetail('currencyDetail', 'USD')
      console.log(header)
      setMetadataDetail(prevMetadataDetail => ({
        ...prevMetadataDetail,
        rateDetail: header?.dataPO?.[0]?.rate,
        currencyDetail: header?.dataPO?.[0]?.currency1_id,
        startDateDetail: currentDate,
        targetTotalDetail: 0,
        prefix: header?.dataPO?.[0]?.prefix,
      }))
    } else {
      setButtonDetailDisabled(true)
    }
    console.log('jalannulang')
  }, [header])

  useEffect(() => {
    if (parseFloat(metadataDetail.transactionValue) > 0) {
      const totalCostUsd =
        parseFloat(metadataDetail.transactionValue) /
        parseFloat(metadataDetail.rateDetail)

      setMetadataDetail(prevMetadataDetail => ({
        ...prevMetadataDetail,
        totalCostDetail: totalCostUsd,
      }))
    } else {
      setMetadataDetail(prevMetadataDetail => ({
        ...prevMetadataDetail,
        totalCostDetail: 0,
      }))
    }
  }, [metadataDetail.transactionValue])

  useEffect(() => {
    if (
      parseFloat(metadataDetail.unitPrice) > 0 &&
      parseInt(metadataDetail.qty) > 0
    ) {
      const tValue =
        parseFloat(metadataDetail.unitPrice) * parseInt(metadataDetail.qty)
      setMetadataDetail(prevMetadataDetail => ({
        ...prevMetadataDetail,
        transactionValue: tValue,
      }))
    }
  }, [metadataDetail.unitPrice, metadataDetail.qty])

  return (
    <>
      <Text>Purchase Order From - </Text>
      <ButtonGroup my={3} color={'white'} variant='solid' spacing='4'>
        <Button
          colorScheme='green'
          isLoading={isSubmittingDetail}
          // type='submit'
          isDisabled={buttonDetailDisabled}
          onClick={() => {
            // setAddDetail('active')
            // setButtonDisableAddDetail(true)
            // setButtonDisableAdd(false)
            // setButtonDisableCancel(false)
            setbuttonAddDisabled(false)
            setButtonDetailDisabled(true)
          }}
        >
          Add Detail
        </Button>
        <Button
          colorScheme='teal'
          isLoading={isSubmittingDetail}
          isDisabled={buttonAddDisabled}
          // type='submit'
          onClick={e => {
            showModal({
              title: 'Add PO detail',
              description: 'Are you sure?',
              actionType: 'insert',
              actionLabel: 'Yes',
              action: () =>
                dispatch(
                  createPODetail({
                    data: {
                      ...metadataDetail,
                    },
                  })
                ).then(() => {
                  // Tutup modal setelah dispatch selesai
                  hideModal()
                }),
            })
          }}
        >
          Add
        </Button>
        <Button
          colorScheme='orange'
          isLoading={isSubmittingDetail}
          isDisabled={buttonAddDisabled}
          // type='submit'
          onClick={() => {
            // setButtonDisableAdd(true)
            // setButtonDisableAddDetail(false)
            // setButtonDisableCancel(true)
            // setAddDetail('')
            setbuttonAddDisabled(true)
            setButtonDetailDisabled(false)
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>

      {!buttonAddDisabled ? (
        <SimpleGrid
          mb={4}
          columns={{ md: 1, lg: 2 }}
          columnGap='40px'
          flexDirection={'row'}
        >
          <FormControl display={{ md: 'inline-flex' }} pt={4} isRequired={true}>
            <FormLabel htmlFor='item' mt={2} minWidth={'200px'}>
              Item
            </FormLabel>
            <Input
              id='item'
              placeholder={'item'}
              isReadOnly={false}
              value={metadataDetail.item}
              onChange={e => {
                setMetadataDetail({
                  ...metadataDetail,
                  item: e.target.value,
                })
              }}
            />
          </FormControl>
          {header?.dataPO[0]?.prefix?.slice(0, 5) !== 'XPOPF' ? (
            <>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='coverrageArea' mt={2} minWidth={'200px'}>
                  Coverrage Area
                </FormLabel>
                <Input
                  id='coverrageArea'
                  placeholder={'coverrage area'}
                  isReadOnly={false}
                  value={metadataDetail.coverrageArea}
                  onChange={e => {
                    setMetadataDetail({
                      ...metadataDetail,
                      coverrageArea: e.target.value,
                    })
                  }}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='outlet' mt={2} minWidth={'200px'}>
                  Outlet
                </FormLabel>
                <Input
                  id='outlet'
                  placeholder={'outlet'}
                  isReadOnly={false}
                  value={metadataDetail.outlet}
                  onChange={e => {
                    setMetadataDetail({
                      ...metadataDetail,
                      outlet: e.target.value,
                    })
                  }}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='pic' mt={2} minWidth={'200px'}>
                  PIC
                </FormLabel>
                <Input
                  id='pic'
                  placeholder={'PIC'}
                  isReadOnly={false}
                  value={metadataDetail.pic}
                  onChange={e => {
                    setMetadataDetail({
                      ...metadataDetail,
                      pic: e.target.value,
                    })
                  }}
                />
              </FormControl>
            </>
          ) : (
            <>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='qty' mt={2} minWidth={'200px'}>
                  QTY
                </FormLabel>
                <Input
                  id='qty'
                  placeholder={'0'}
                  type='number'
                  textAlign={'right'}
                  isReadOnly={false}
                  value={metadataDetail.qty}
                  onChange={e => {
                    setMetadataDetail({
                      ...metadataDetail,
                      qty: e.target.value,
                    })
                  }}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='uom' mt={2} minWidth={'200px'}>
                  UOM
                </FormLabel>
                <Input
                  id='uom'
                  placeholder={'uom'}
                  isReadOnly={false}
                  value={metadataDetail.uom}
                  onChange={e => {
                    setMetadataDetail({
                      ...metadataDetail,
                      uom: e.target.value,
                    })
                  }}
                />
              </FormControl>
            </>
          )}
          <FormControl display={{ md: 'inline-flex' }} pt={4} isRequired={true}>
            <FormLabel htmlFor='currencyDetail' mt={2} minWidth={'200px'}>
              Currency
            </FormLabel>
            <Input
              id='currencyDetail'
              placeholder={'currency'}
              isReadOnly={false}
              value={metadataDetail.currencyDetail}
              onChange={e => {
                setMetadataDetail({
                  ...metadataDetail,
                  currencyDetail: e.target.value,
                })
              }}
            />
          </FormControl>
          <FormControl display={{ md: 'inline-flex' }} pt={4} isRequired={true}>
            <FormLabel htmlFor='rateDetail' mt={2} minWidth={'200px'}>
              Rate
            </FormLabel>
            <Input
              id='rateDetail'
              placeholder={'rate'}
              isReadOnly={true}
              defaultValue={metadataDetail.rateDetail}
              background={'gray.300'}
              textAlign={'right'}
            />
          </FormControl>
          {header?.dataPO[0]?.prefix?.slice(0, 5) === 'XPOPF' ? (
            <FormControl
              display={{ md: 'inline-flex' }}
              pt={4}
              isRequired={true}
            >
              <FormLabel htmlFor='unitPrice' mt={2} minWidth={'200px'}>
                Unit Price
              </FormLabel>
              <InputTypeComponent
                autoComplete='off'
                type='DECIMAL (FLOAT)'
                value={metadataDetail}
                setValue={setMetadataDetail}
                isObject={true}
                propertyName={'unitPrice'}
                placeholder='0.0000'
                decimalPlace={4}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    // Get out of input box
                    e.target.blur()
                  }
                }}
                onSelect={e => e.target.select()}
              />
            </FormControl>
          ) : (
            ''
          )}
          <FormControl display={{ md: 'inline-flex' }} pt={4} isRequired={true}>
            <FormLabel htmlFor='transactionValue' mt={2} minWidth={'200px'}>
              Transaction Value
            </FormLabel>
            <InputTypeComponent
              isReadOnly={
                header?.dataPO[0]?.prefix?.slice(0, 5) === 'XPOPF'
                  ? true
                  : false
              }
              background={
                header?.dataPO[0]?.prefix?.slice(0, 5) === 'XPOPF'
                  ? 'gray.300'
                  : ''
              }
              autoComplete='off'
              type='DECIMAL (FLOAT)'
              value={metadataDetail}
              setValue={setMetadataDetail}
              isObject={true}
              propertyName={'transactionValue'}
              placeholder='0.0000'
              decimalPlace={4}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  // Get out of input box
                  e.target.blur()
                }
              }}
              onSelect={e => e.target.select()}
            />
          </FormControl>

          <FormControl display={{ md: 'inline-flex' }} pt={4} isRequired={true}>
            <FormLabel htmlFor='totalCostDetail' mt={2} minWidth={'200px'}>
              Total Cost (USD)
            </FormLabel>
            <InputTypeComponent
              autoComplete='off'
              type='DECIMAL (FLOAT)'
              value={metadataDetail}
              setValue={setMetadataDetail}
              isObject={true}
              propertyName={'totalCostDetail'}
              placeholder='0.0000'
              decimalPlace={4}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  // Get out of input box
                  e.target.blur()
                }
              }}
              onSelect={e => e.target.select()}
              isReadOnly={true}
              background={'gray.300'}
            />
          </FormControl>
          {header?.dataPO[0]?.prefix?.slice(0, 5) !== 'XPOPF' ? (
            <>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel
                  htmlFor='targetTotalDetail'
                  mt={2}
                  minWidth={'200px'}
                >
                  Target Total
                </FormLabel>
                <InputTypeComponent
                  autoComplete='off'
                  type='DECIMAL (FLOAT)'
                  value={metadataDetail}
                  setValue={setMetadataDetail}
                  isObject={true}
                  propertyName={'targetTotalDetail'}
                  placeholder='0.0000'
                  decimalPlace={4}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      // Get out of input box
                      e.target.blur()
                    }
                  }}
                  onSelect={e => e.target.select()}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='startDateDetail' mt={2} minWidth={'200px'}>
                  Start Date
                </FormLabel>
                <Input
                  id={'startDateDetail'}
                  isReadOnly={false}
                  // background={isCreating ? '' : 'gray.300'}
                  type={'date'}
                  value={metadataDetail.startDateDetail}
                  onChange={e => {
                    setMetadataDetail(prevMetadataPO => ({
                      ...prevMetadataPO,
                      startDateDetail: e.target.value,
                    }))
                  }}
                />
              </FormControl>
              <FormControl
                display={{ md: 'inline-flex' }}
                pt={4}
                isRequired={true}
              >
                <FormLabel htmlFor='finishDateDetail' mt={2} minWidth={'200px'}>
                  Finish Date
                </FormLabel>
                <Input
                  id={'finishDateDetail'}
                  isReadOnly={false}
                  // background={isCreating ? '' : 'gray.300'}
                  type={'date'}
                  value={metadataDetail.finishDateDetail}
                  onChange={e => {
                    setMetadataDetail(prevMetadataPO => ({
                      ...prevMetadataPO,
                      finishDateDetail: e.target.value,
                    }))
                  }}
                />
              </FormControl>
            </>
          ) : (
            ''
          )}

          <FormControl display={{ md: 'inline-flex' }} pt={4} isRequired={true}>
            <FormLabel htmlFor='remarkDetail' mt={2} minWidth={'200px'}>
              Remark
            </FormLabel>
            <Input
              id='remarkDetail'
              placeholder={'remark'}
              isReadOnly={false}
              value={metadataDetail.remarkDetail}
              onChange={e => {
                setMetadataDetail({
                  ...metadataDetail,
                  remarkDetail: e.target.value,
                })
              }}
            />
          </FormControl>
          {/* <InputText
            name={'item'}
            label={'Item'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputText
            name={'coverrageArea'}
            label={'Coverrage Area'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputText
            name={'outlet'}
            label={'Outlet'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputText
            name={'pic'}
            label={'PIC'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputText
            name={'currencyDetail'}
            label={'Currency'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputNumber
            name={'rateDetail'}
            label={'Rate'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputNumber
            name={'transactionValue'}
            label={'Transaction Value'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputNumber
            name={'totalCostDetail'}
            label={'Total Cost (USD)'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputNumber
            name={'targetTotalDetail'}
            label={'Target Total Sales'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          />
          <InputDate
            name={'startDateDetail'}
            label={'Start Date'}
            isReadOnly={false}
            isRequired={false}
            defa
            {...formPropsDetail}
          />
          <InputDate
            name={'finishDateDetail'}
            label={'Finish Date'}
            isReadOnly={false}
            isRequired={false}
            defa
            {...formPropsDetail}
          />
          <InputText
            name={'RemarkDetail'}
            label={'Remark'}
            isReadOnly={false}
            isRequired={true}
            {...formPropsDetail}
          /> */}
        </SimpleGrid>
      ) : (
        ''
      )}

      <Box w={500}>
        <Grid templateColumns='repeat(12, 1fr)'>
          <GridItem colSpan={8}>Total Purchase Order</GridItem>
          <GridItem>
            {Object.keys(header).length > 0
              ? header.dataPO[0]?.currency1_id || ''
              : ''}
          </GridItem>
          <GridItem colSpan={3} textAlign={'right'}>
            {Object.keys(header).length > 0
              ? header.totalPO[0]?.total1 || 0
              : 0}
          </GridItem>
          <GridItem colSpan={8}>Total Purchase Order</GridItem>
          <GridItem>
            {Object.keys(header).length > 0
              ? header.dataPO[0]?.currency2_id || 'USD'
              : 'USD'}
          </GridItem>
          <GridItem colSpan={3} textAlign={'right'}>
            {Object.keys(header).length > 0
              ? header.totalPO[0]?.total2 || 0
              : 0}
          </GridItem>
          <GridItem colSpan={8}>Out Standing Purchase Order</GridItem>
          <GridItem>
            {Object.keys(header).length > 0
              ? header.dataPO[0]?.currency1_id || ''
              : ''}
          </GridItem>
          <GridItem colSpan={3} textAlign={'right'}>
            {Object.keys(header).length > 0
              ? header.totalOutstanding[0]?.outstanding1 || 0
              : 0}
          </GridItem>
          <GridItem colSpan={8}>Out Standing Purchase Order</GridItem>
          <GridItem>
            {Object.keys(header).length > 0
              ? header.dataPO[0]?.currency2_id || 'USD'
              : 'USD'}
          </GridItem>
          <GridItem colSpan={3} textAlign={'right'}>
            {Object.keys(header).length > 0
              ? header.totalOutstanding[0]?.outstanding2 || 0
              : 0}
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
export default PORequestDetail
