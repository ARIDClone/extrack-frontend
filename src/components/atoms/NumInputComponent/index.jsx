/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'
import helpers from '../../../helpers/helpers'

const NumInputComponent = ({
  value,
  setValue,
  decimalPlace,
  propertyName,
  isDisabled = false,
  isObject = false,
  stringify = false,
  setOtherState = [],
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Input
      w={'full'}
      type={isEditing ? 'number' : 'text'}
      textAlign={'right'}
      isDisabled={isDisabled}
      value={
        isEditing
          ? isObject
            ? value[propertyName]
            : value
          : isObject
          ? typeof parseFloat(value[propertyName]) === 'number' &&
            !isNaN(parseFloat(value[propertyName]))
            ? helpers.formatNumber(
                parseFloat(value[propertyName]),
                decimalPlace
              )
            : null
          : typeof parseFloat(value) === 'number' && !isNaN(parseFloat(value))
          ? helpers.formatNumber(parseFloat(value), decimalPlace)
          : null
      }
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      onChange={e => {
        const tmp =
          decimalPlace === 0
            ? parseInt(e.target.value)
            : parseFloat(e.target.value)
        const newTmp = stringify ? tmp.toString() : tmp

        let otherState = {}
        if (setOtherState && setOtherState.length > 0) {
          setOtherState.forEach(rs => {
            otherState = { ...otherState, [rs.name]: rs.value }
          })
        }

        if (isObject) {
          setValue({ ...value, [propertyName]: newTmp, ...setOtherState })
        } else setValue(newTmp)
      }}
      {...rest}
    />
  )
}

export default NumInputComponent
