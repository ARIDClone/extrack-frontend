import { Image, VStack } from '@chakra-ui/react'
// import { InputFile } from '../../../../components'
import { useForm } from 'react-hook-form'

const PORequestAttachment = ({ user, header }) => {
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

  return (
    <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
      {/* <InputFile
        name={'productPict'}
        label={'Product Picture'}
        acceptedFileTypes={'image/*'}
        isRequired={true}
        setValue={setValueDetail}
        watch={watchDetail}
        {...formPropsDetail}
      /> */}
      {getValuesDetail('productPict')?.file === undefined ? (
        <div></div>
      ) : (
        <Image
          height={'32'}
          width={'32'}
          src={getValuesDetail('productPict')?.file}
        ></Image>
      )}
    </VStack>
  )
}
export default PORequestAttachment
