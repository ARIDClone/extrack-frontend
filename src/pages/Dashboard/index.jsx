import { useDispatch, useSelector } from 'react-redux'
import { CardDashboard, ContentWrapper } from '../../components'
import { Flex, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import {
  CheckCircleIcon,
  NotAllowedIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons'

import { useEffect } from 'react'
import { getPOTotalApprove } from '../../features/Dashboard/getPOTotalApproveSlice'
import { getPOTotalReject } from '../../features/Dashboard/getPOTotalRejectSlice'
import { getPOTotalWaitingApproval } from '../../features/Dashboard/getPOTotalWaitingApprovalSlice'
import { getRFPTotalApprove } from '../../features/Dashboard/getRFPTotalApproveSlice'
import { getRFPTotalReject } from '../../features/Dashboard/getRFPTotalRejectSlice'
import { getRFPTotalWaitingApproval } from '../../features/Dashboard/getRFPTotalWaitingApprovalSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const dispatch = useDispatch()
  const POTotalApproveState = useSelector(state => state.getPOTotalApprove)
  const POTotalRejectState = useSelector(state => state.getPOTotalReject)
  const POTotalWaitingApprovalState = useSelector(
    state => state.getPOTotalWaitingApproval
  )
  const RFPTotalApproveState = useSelector(state => state.getRFPTotalApprove)
  const RFPTotalRejectState = useSelector(state => state.getRFPTotalReject)
  const RFPTotalWaitingApprovalState = useSelector(
    state => state.getRFPTotalWaitingApproval
  )

  useEffect(() => {
    dispatch(
      getPOTotalApprove({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    dispatch(
      getPOTotalReject({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    dispatch(
      getPOTotalWaitingApproval({
        params: {
          username: user.username,
        },
      })
    )
    dispatch(
      getRFPTotalApprove({
        params: {
          country: user.country,
        },
      })
    )
    dispatch(
      getRFPTotalReject({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    dispatch(
      getRFPTotalWaitingApproval({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('po-list?status=approved')
  }

  return (
    <ContentWrapper heading='Dashboard'>
      {POTotalApproveState.status === 'loaded' &&
      POTotalRejectState.status === 'loaded' &&
      POTotalWaitingApprovalState.status === 'loaded' &&
      RFPTotalApproveState.status === 'loaded' &&
      RFPTotalRejectState.status === 'loaded' &&
      RFPTotalWaitingApprovalState.status === 'loaded' ? (
        <VStack spacing={4}>
          <SimpleGrid
            spacing={4}
            // templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
            columns={{ md: 1, lg: 2, xl: 3 }}
          >
            <CardDashboard
              cardColor={'#F3D104'}
              cardIcon={<WarningTwoIcon boxSize={20} color={'white'} />}
              total={POTotalWaitingApprovalState.data.data.waiting}
              title={'PO Waiting Approval'}
            />

            <CardDashboard
              cardColor={'#76bc2a'}
              cardIcon={<CheckCircleIcon boxSize={20} color={'white'} />}
              total={POTotalApproveState.data.data.approved}
              title={'PO Approved'}
              click={() => handleNavigate()}
            />

            <CardDashboard
              cardColor={'#DC5150'}
              cardIcon={<NotAllowedIcon boxSize={20} color={'white'} />}
              total={POTotalRejectState.data.data.rejected}
              title={'PO Rejected'}
            />
          </SimpleGrid>

          <SimpleGrid
            spacing={4}
            // templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
            columns={{ md: 1, lg: 2, xl: 3 }}
          >
            <CardDashboard
              cardColor={'#EED202'}
              cardIcon={<WarningTwoIcon boxSize={20} color={'white'} />}
              total={RFPTotalWaitingApprovalState.data.data.rwaiting}
              title={'RFP Waiting Approval'}
            />

            <CardDashboard
              cardColor={'#76bc2a'}
              cardIcon={<CheckCircleIcon boxSize={20} color={'white'} />}
              total={RFPTotalApproveState.data.data.rapproved}
              title={'RFP Approved'}
            />

            <CardDashboard
              cardColor={'#DC5150'}
              cardIcon={<NotAllowedIcon boxSize={20} color={'white'} />}
              total={RFPTotalRejectState.data.data.rrejected}
              title={'RFP Rejected'}
            />
          </SimpleGrid>
        </VStack>
      ) : (
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          <Spinner size={'xl'} color='green.500' />
        </Flex>
      )}
    </ContentWrapper>
  )
}

export default Dashboard
