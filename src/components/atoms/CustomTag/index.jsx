/* eslint-disable react/prop-types */

import React from "react";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

function CustomTag({ color, text, leftIcon }) {
  return (
    <Tag size="md" colorScheme={color} borderRadius="full">
      {leftIcon ? <TagLeftIcon as={leftIcon} /> : ""}
      <TagLabel color={color}>{text}</TagLabel>
    </Tag>
  );
}

export default CustomTag;
