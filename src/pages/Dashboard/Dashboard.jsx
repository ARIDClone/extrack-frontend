import { useDispatch, useSelector } from 'react-redux'
import { CardDashboard, ContentWrapper } from '../../components'
import { Flex, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import {
  CheckCircleIcon,
  NotAllowedIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTotalApprovePO } from '../../features/Transaction/Dashboard/getTotalApprovePOSlice'
import { getTotalRejectPO } from '../../features/Transaction/Dashboard/getTotalRejectPOSlice'
import { getTotalWaitingApprovalPO } from '../../features/Transaction/Dashboard/getTotalWaitingApprovalPOSlice'
import { getTotalApproveRFP } from '../../features/Transaction/Dashboard/getTotalApproveRFPSlice'
import { getTotalRejectRFP } from '../../features/Transaction/Dashboard/getTotalRejectRFPSlice'
import { getTotalWaitingApprovalRFP } from '../../features/Transaction/Dashboard/getTotalWaitingApprovalRFPSlice'

const Dashboard = ({ user }) => {
  const dispatch = useDispatch()
  const TotalApprovePOState = useSelector(state => state.getTotalApprovePO)
  const TotalRejectPOState = useSelector(state => state.getTotalRejectPO)
  const TotalWaitingApprovalPOState = useSelector(
    state => state.getTotalWaitingApprovalPO
  )
  const TotalApproveRFPState = useSelector(state => state.getTotalApproveRFP)
  const TotalRejectRFPState = useSelector(state => state.getTotalRejectRFP)
  const TotalWaitingApprovalRFPState = useSelector(
    state => state.getTotalWaitingApprovalRFP
  )

  useEffect(() => {
    console.log(user)
    dispatch(
      getTotalApprovePO({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    dispatch(
      getTotalRejectPO({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    dispatch(
      getTotalWaitingApprovalPO({
        params: {
          username: user.username,
        },
      })
    )
    dispatch(
      getTotalApproveRFP({
        params: {
          country: user.country,
        },
      })
    )
    dispatch(
      getTotalRejectRFP({
        params: {
          country: user.country,
          username: user.username,
        },
      })
    )
    dispatch(
      getTotalWaitingApprovalRFP({
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
      {TotalApprovePOState.status === 'loaded' &&
      TotalRejectPOState.status === 'loaded' &&
      TotalWaitingApprovalPOState.status === 'loaded' &&
      TotalApproveRFPState.status === 'loaded' &&
      TotalRejectRFPState.status === 'loaded' &&
      TotalWaitingApprovalRFPState.status === 'loaded' ? (
        <VStack spacing={4}>
          <SimpleGrid
            spacing={4}
            // templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
            columns={{ md: 1, lg: 2, xl: 3 }}
          >
            <CardDashboard
              cardColor={'#F3D104'}
              cardIcon={<WarningTwoIcon boxSize={20} color={'white'} />}
              total={TotalWaitingApprovalPOState.data.data.waiting}
              title={'PO Waiting Approval'}
            />

            <CardDashboard
              cardColor={'#76bc2a'}
              cardIcon={<CheckCircleIcon boxSize={20} color={'white'} />}
              total={TotalApprovePOState.data.data.approved}
              title={'PO Approved'}
              click={() => handleNavigate()}
            />

            <CardDashboard
              cardColor={'#DC5150'}
              cardIcon={<NotAllowedIcon boxSize={20} color={'white'} />}
              total={TotalRejectPOState.data.data.rejected}
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
              total={TotalWaitingApprovalRFPState.data.data.rwaiting}
              title={'RFP Waiting Approval'}
            />

            <CardDashboard
              cardColor={'#76bc2a'}
              cardIcon={<CheckCircleIcon boxSize={20} color={'white'} />}
              total={TotalApproveRFPState.data.data.rapproved}
              title={'RFP Approved'}
            />

            <CardDashboard
              cardColor={'#DC5150'}
              cardIcon={<NotAllowedIcon boxSize={20} color={'white'} />}
              total={TotalRejectRFPState.data.data.rrejected}
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
