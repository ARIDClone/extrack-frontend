/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

/* =============================================================================== 

UNIVERSAL INPUT COMPONENT

High-level input components are designed for universal purpose (which allows you 
to use them in any kind of need). In order to read this documentation, you must
understand the following symbols:

1. (R) => Required (developer must provide this argument)
2. (O) => Optional (developer can provide necessary information but in most cases
          it's not required as this parameter has default values to it)

Below is a list of parameters that apply to all input types:

1. (R) type = Str => Any available type in this component
2. (R) value = React state (useState)
3. (R) setValue = React state modifier (useState)
4. (O) isObject = Bool (false) => Set to true if the state is an object
5. (O/R) propertyName = Str => Name of the element inside the object (required if
                               isObject is set to true)

Currently available types include:

1. SHORT TEXT
- (O) placeholder = Str
- (O) isUpperCase = Bool (false) => Convert every character to uppercase if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

2. PARAGRAPH
- (O) placeholder = Str
- (O) isUpperCase = Bool (false) => Convert every character to uppercase if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

3. DATE
- (O) stringify = Bool (false) => Convert value of any type to String if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

4. DATETIME
- (O) stringify = Bool (false) => Convert value of any type to String if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

5. WHOLE NUMBER (INTEGER)
- (O) stringify = Bool (false) => Convert value of any type to String if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

6. DECIMAL (FLOAT)
- (O) decimalPlace = Int (2) => How much digit behind the decimal point you want
                                to display (doesn't affect the data itself)
- (O) stringify = Bool (false) => Convert value of any type to String if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

7. TRUE/FALSE
- (O) useBooleanLabel = Bool (false) => Display CustomTag right beside the switch if
                                        true (name of the label based on type)
- (O) stringify = Bool (false) => Convert value of any type to String if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

8. YES/NO
- (O) useBooleanLabel = Bool (false) => Display CustomTag right beside the switch if
                                        true (name of the label based on type)
- (O) stringify = Bool (false) => Convert value of any type to String if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

9. PHONE NUMBER
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

10. SINGLE SELECT
- (O) selectOptions = Array ([]) => List of value/options (Contain objects with 
                                    { label: ..., value: ... } format)
- (R) selectLabelName = Str => Property name of value's name (with an assumption that
                               the value is an object)
- (R) selectLabelId = Str => Property name of value's id (with an assumption that
                               the value is an object)
- (O) isSelectClearable = Bool (false) => Enable user to clear input if true
- (O) isSelectValueObject = Bool (true) => Assumes that the value inside the option 
                                           ({ label: ..., value: ... }) is an object
                                           if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value with
                                    { name: ..., value: ... } format)

11. MULTI SELECT
- (O) selectOptions = Array ([]) => List of value/options (Contain objects with 
                                    { label: ..., value: ... } format)
- (R) selectLabelName = Str => Property name of value's name (with an assumption that
                               the value is an object)
- (R) selectLabelId = Str => Property name of value's id (with an assumption that
                               the value is an object)
- (O) isSelectClearable = Bool (false) => enable user to clear input if true
- (O) isSelectValueObject = Bool (true) => Assumes that the value inside the option 
                                           ({ label: ..., value: ... }) is an object
                                           if true
- (O) setOtherState = Array ([]) => Additional state you want to modify on change
                                    (Only applicable to object-based value)

=============================================================================== */

import React, { useRef } from 'react'
import { Flex, Input, Switch, Textarea } from '@chakra-ui/react'
import { Select as SearchSelect } from 'chakra-react-select'
import NumInputComponent from '../NumInputComponent'
import PhoneNumberInput from '../PhoneNumberInput'
import helpers from '../../../helpers/helpers'
import CustomTag from '../CustomTag'

const InputTypeComponent = ({
  type,
  value,
  setValue,
  isObject = false,
  propertyName,
  setOtherState = [],
  placeholder,
  isDisabled = false,
  isUpperCase = false,
  stringify = false,
  decimalPlace = 2,
  useBooleanLabel = false,
  selectLabelName,
  selectLabelId,
  isSelectValueObject = true,
  isSelectClearable = false,
  selectOptions = [],
  ...rest
}) => {
  const inputRef = useRef(null)

  const handleChange = e => {
    if (['SHORT TEXT', 'PARAGRAPH', 'PASSWORD'].includes(type)) {
      const start = e.target.selectionStart
      const end = e.target.selectionEnd

      const tmp = isUpperCase ? e.target.value.toUpperCase() : e.target.value

      let otherState = {}
      if (setOtherState && setOtherState.length > 0) {
        setOtherState.forEach(rs => {
          otherState = { ...otherState, [rs.name]: rs.value }
        })
      }

      if (isObject) {
        setValue({ ...value, [propertyName]: tmp, ...otherState })
      } else setValue(tmp)

      if (isUpperCase) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(start, end)
          }
        }, 0)
      }
    }
  }

  return (
    <>
      {type === 'SHORT TEXT' && (
        <Input
          type={'text'}
          placeholder={placeholder}
          ref={inputRef}
          value={isObject ? value[propertyName] : value}
          onChange={handleChange}
          isDisabled={isDisabled}
          {...rest}
        />
      )}

      {type === 'PASSWORD' && (
        <Input
          type={'password'}
          placeholder={placeholder}
          ref={inputRef}
          value={isObject ? value[propertyName] : value}
          onChange={handleChange}
          isDisabled={isDisabled}
          {...rest}
        />
      )}

      {type === 'PARAGRAPH' && (
        <Textarea
          placeholder={placeholder}
          ref={inputRef}
          value={isObject ? value[propertyName] : value}
          onChange={handleChange}
          {...rest}
        />
      )}

      {type === 'DATE' && (
        <Input
          type='date'
          value={
            isObject
              ? value[propertyName]
                ? helpers.str2DatetimeInput(value[propertyName], 'date')
                : null
              : value
              ? helpers.str2DatetimeInput(value, 'date')
              : null
          }
          onChange={e => {
            const tmp = helpers.strDate2UtcDate(e.target.value)
            const newTmp = stringify ? tmp.toISOString() : tmp

            let otherState = {}
            if (setOtherState && setOtherState.length > 0) {
              setOtherState.forEach(rs => {
                otherState = { ...otherState, [rs.name]: rs.value }
              })
            }

            if (isObject) {
              setValue({ ...value, [propertyName]: newTmp, ...otherState })
            } else setValue(newTmp)
          }}
          {...rest}
        />
      )}

      {type === 'DATETIME' && (
        <Input
          type={'datetime-local'}
          value={
            isObject
              ? value[propertyName]
                ? helpers.str2DatetimeInput(value[propertyName])
                : null
              : value
              ? helpers.str2DatetimeInput(value)
              : null
          }
          onChange={e => {
            const tmp = new Date(e.target.value)
            const newTmp = stringify ? tmp.toISOString() : tmp

            let otherState = {}
            if (setOtherState && setOtherState.length > 0) {
              setOtherState.forEach(rs => {
                otherState = { ...otherState, [rs.name]: rs.value }
              })
            }

            if (isObject) {
              setValue({ ...value, [propertyName]: newTmp, ...otherState })
            } else setValue(newTmp)
          }}
          {...rest}
        />
      )}

      {['WHOLE NUMBER (INTEGER)', 'DECIMAL (FLOAT)'].includes(type) && (
        <NumInputComponent
          placeholder={placeholder}
          isDisabled={isDisabled}
          value={value}
          setValue={setValue}
          isObject={isObject}
          propertyName={propertyName}
          decimalPlace={type === 'DECIMAL (FLOAT)' ? decimalPlace : 0}
          stringify={stringify}
          setOtherState={setOtherState}
          {...rest}
        />
      )}

      {['TRUE/FALSE', 'YES/NO'].includes(type) && (
        <Flex gap={3} {...rest}>
          <Switch
            size={'lg'}
            colorScheme='green'
            isChecked={
              isObject
                ? stringify
                  ? value[propertyName] === 'true'
                  : value[propertyName]
                : stringify
                ? value === 'true'
                : value
            }
            onChange={e => {
              const tmp = stringify ? `${e.target.checked}` : e.target.checked
              let otherState = {}
              if (setOtherState && setOtherState.length > 0) {
                setOtherState.forEach(rs => {
                  otherState = { ...otherState, [rs.name]: rs.value }
                })
              }

              if (isObject) {
                setValue({ ...value, [propertyName]: tmp, ...otherState })
              } else setValue(tmp)
            }}
          />
          {useBooleanLabel && (
            <CustomTag
              text={
                isObject
                  ? stringify
                    ? value[propertyName] === 'true'
                      ? type.split('/')[0]
                      : type.split('/')[1]
                    : value[propertyName]
                    ? type.split('/')[0]
                    : type.split('/')[1]
                  : stringify
                  ? value === 'true'
                    ? type.split('/')[0]
                    : type.split('/')[1]
                  : value
                  ? type.split('/')[0]
                  : type.split('/')[1]
              }
              color={
                isObject
                  ? stringify
                    ? value[propertyName] === 'true'
                      ? 'green'
                      : 'gray'
                    : value[propertyName]
                    ? 'green'
                    : 'gray'
                  : stringify
                  ? value === 'true'
                    ? 'green'
                    : 'gray'
                  : value
                  ? 'green'
                  : 'gray'
              }
            />
          )}
        </Flex>
      )}

      {type === 'PHONE NUMBER' && (
        <PhoneNumberInput
          value={value}
          setValue={setValue}
          isObject={isObject}
          propertyName={propertyName}
          setOtherState={setOtherState}
        />
      )}

      {type === 'SINGLE SELECT' && (
        <SearchSelect
          placeholder={placeholder}
          isDisabled={isDisabled}
          isClearable={isSelectClearable}
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          value={
            isObject
              ? value[propertyName]
                ? isSelectValueObject
                  ? {
                      label: value[propertyName][selectLabelName],
                      value: value[propertyName],
                    }
                  : { label: value[propertyName], value: value[propertyName] }
                : null
              : value
              ? isSelectValueObject
                ? {
                    label: value[selectLabelName],
                    value: value,
                  }
                : { label: value, value: value }
              : null
          }
          options={selectOptions}
          onChange={e => {
            let otherState = {}
            if (setOtherState && setOtherState.length > 0) {
              setOtherState.forEach(rs => {
                otherState = { ...otherState, [rs.name]: rs.value }
              })
            }

            if (e) {
              const tmp = e.value
              if (isObject) {
                if (isSelectValueObject) {
                  setValue({
                    ...value,
                    [propertyName]: tmp,
                    [`${propertyName}Id`]: e.value[selectLabelId],
                    ...otherState,
                  })
                } else setValue({ ...value, [propertyName]: tmp })
              } else setValue(tmp)
            } else {
              if (isObject) {
                if (isSelectValueObject) {
                  setValue({
                    ...value,
                    [propertyName]: null,
                    [`${propertyName}Id`]: null,
                    ...otherState,
                  })
                } else setValue({ ...value, [propertyName]: null })
              } else setValue(null)
            }
          }}
          chakraStyles={{
            container: (provided, state) => ({
              ...provided,
              ...rest,
            }),
          }}
          {...rest}
        />
      )}

      {type === 'MULTI SELECT' && (
        <SearchSelect
          isMulti
          colorScheme='green'
          placeholder={placeholder}
          isDisabled={isDisabled}
          isClearable={isSelectClearable}
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          defaultValue={
            isObject
              ? value[propertyName] && value[propertyName].length > 0
                ? isSelectValueObject
                  ? value[propertyName].map(val => ({
                      label: val[selectLabelName],
                      value: val,
                    }))
                  : value[propertyName].map(val => ({
                      label: val,
                      value: val,
                    }))
                : []
              : value && value[propertyName].length > 0
              ? isSelectValueObject
                ? value.map(val => ({
                    label: val[selectLabelName],
                    value: val,
                  }))
                : value.map(val => ({ label: val, value: val }))
              : []
          }
          value={
            isObject
              ? value[propertyName] && value[propertyName].length > 0
                ? isSelectValueObject
                  ? value[propertyName].map(val => ({
                      label: val[selectLabelName],
                      value: val,
                    }))
                  : value[propertyName].map(val => ({
                      label: val,
                      value: val,
                    }))
                : []
              : value && value[propertyName].length > 0
              ? isSelectValueObject
                ? value.map(val => ({
                    label: val[selectLabelName],
                    value: val,
                  }))
                : value.map(val => ({ label: val, value: val }))
              : []
          }
          options={selectOptions}
          onChange={e => {
            let otherState = {}
            if (setOtherState && setOtherState.length > 0) {
              setOtherState.forEach(rs => {
                otherState = { ...otherState, [rs.name]: rs.value }
              })
            }

            if (e) {
              const tmp = e.map(val => val.value)
              if (isObject) {
                setValue({ ...value, [propertyName]: tmp, ...otherState })
              } else setValue(tmp)
            } else {
              if (isObject) {
                setValue({ ...value, [propertyName]: [], ...otherState })
              } else setValue([])
            }
          }}
          chakraStyles={{
            container: (provided, state) => ({
              ...provided,
              ...rest,
            }),
          }}
          {...rest}
        />
      )}
    </>
  )
}

export default InputTypeComponent
