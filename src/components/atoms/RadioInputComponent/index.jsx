/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { useState } from "react";

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w={"full"}>
      <input {...input} />
      <Box
        {...checkbox}
        textAlign={"center"}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _disabled={props.isDisabled}
        opacity={props.isDisabled ? 0.5 : 1}
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function RadioInputComponent({
  options,
  value = "",
  setValue,
  isObject = false,
  propertyName,
  isDisabled = false,
  setOtherState = [],
  ...rest
}) {
  const [selectedValue, setSelectedValue] = useState(
    isObject ? value[propertyName] : value
  );

  const handleChange = (e) => {
    let otherState = {};
    if (setOtherState && setOtherState.length > 0) {
      setOtherState.forEach((rs) => {
        otherState = { ...otherState, [rs.name]: rs.value };
      });
    }

    if (isObject) setValue({ ...value, [propertyName]: e, ...otherState });
    else setValue(e);

    setSelectedValue(e);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "radiobutton",
    value: selectedValue,
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} w={"full"}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} isDisabled={isDisabled} {...radio} {...rest}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default RadioInputComponent;
