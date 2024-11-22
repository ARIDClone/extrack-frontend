import { ArrowForwardIcon, WarningTwoIcon } from '@chakra-ui/icons'
import {
  Box,
  Card,
  Button,
  CardBody,
  CardFooter,
  Flex,
  Text,
} from '@chakra-ui/react'

function CardDashboard({
  cardColor = '#FFF',
  cardIcon = `${(<WarningTwoIcon boxSize={20} color={'white'} />)}`,
  total = 0,
  title = 'N/A',
  colorButton = '#000',
  click,
}) {
  return (
    <Card bg={cardColor} minW={350}>
      <CardBody>
        <Flex justifyContent='space-between'>
          {cardIcon}
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            textAlign='right'
          >
            <Text fontSize='3xl' as='b' color={'white'}>
              {total}
            </Text>
            <Text fontWeight={500} color={'white'}>
              {title}
            </Text>
          </Box>
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex w='100%'>
          <Button
            rightIcon={<ArrowForwardIcon />}
            color={colorButton}
            onClick={click}
            w='full'
          >
            More Info
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default CardDashboard
