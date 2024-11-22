import { FormControl, FormLabel, Tag } from '@chakra-ui/react'

const TagForm = ({ label, value }) => {
  return (
    <FormControl display={{ md: 'inline-flex' }} pt={4}>
      <FormLabel mt={2} minWidth={'200px'}>
        {label}
      </FormLabel>

      {value && value.toLowerCase() === 'waiting approval' ? (
        <Tag
          variant='solid'
          colorScheme='yellow'
          minWidth={16}
          justifyContent={'center'}
        >
          Waiting Approval
        </Tag>
      ) : value && value.toLowerCase() === 'approved' ? (
        <Tag
          variant='solid'
          colorScheme='green'
          minWidth={16}
          justifyContent={'center'}
        >
          Approved
        </Tag>
      ) : value && value.toLowerCase() === 'rejected' ? (
        <Tag
          variant='solid'
          colorScheme='red'
          minWidth={16}
          justifyContent={'center'}
        >
          Rejected
        </Tag>
      ) : value && value.toLowerCase() === 'draft' ? (
        <Tag
          variant='solid'
          colorScheme='cyan'
          minWidth={16}
          justifyContent={'center'}
        >
          Draft
        </Tag>
      ) : (
        <Tag
          variant='solid'
          colorScheme='gray'
          minWidth={16}
          justifyContent={'center'}
        >
          -
        </Tag>
      )}
    </FormControl>
  )
}

export default TagForm
