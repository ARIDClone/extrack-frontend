import { Box, Button, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";

function ContentWrapper({
  children,
  heading = "<PLEASE-INPUT-HEADING>",
  subheading,
  button = false,
  buttonLink = null,
  buttonLabel = null,
  icon = null,
  disabled = false,
}) {
  return (
    <Flex flexDirection="column">
      <Flex justifyContent={"space-between"}>
        <Box mb={5}>
          <Text
            fontSize={"3xl"}
            fontWeight={"bold"}
            color={"primary.100"}
            className="card-heading"
          >
            {heading}
          </Text>
          <Text
            fontWeight={"medium"}
            color={"gray.400"}
            className="card-subheading"
          >
            {subheading}
          </Text>
        </Box>
        {button ? (
          <Button
            onClick={buttonLink}
            isDisabled={disabled}
            colorScheme="primary"
            fontSize={{ base: "12px", sm: "16px" }}
            fontWeight={"normal"}
            size="md"
          >
            {icon ? <Icon as={icon} mr={2} /> : ""}
            {buttonLabel}
          </Button>
        ) : (
          ""
        )}
      </Flex>
      {children}
    </Flex>
  );
}

export default ContentWrapper;
