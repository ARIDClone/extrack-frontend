/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// https://catamphetamine.gitlab.io/react-phone-number-input/
// e => +6289671252190
// formatPhoneNumber(e) => 0896-7125-2190
// formatPhoneNumberIntl(e) => +62 896 7125 2190

import React from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = ({
  value,
  setValue,
  propertyName,
  isDisabled = false,
  isObject = false,
  setOtherState = [],
  ...rest
}) => {
  return (
    <PhoneInput
      disabled={isDisabled}
      international
      countryCallingCodeEditable={false}
      onChange={(e) => {
        let otherState = {};
        if (setOtherState && setOtherState.length > 0) {
          setOtherState.forEach((rs) => {
            otherState = { ...otherState, [rs.name]: rs.value };
          });
        }

        if (isObject) {
          setValue({ ...value, [propertyName]: e, ...setOtherState });
        } else setValue(e);
      }}
      value={isObject ? value[propertyName] : value}
      style={{
        border: "1px solid #E2E8F0",
        gap: "10px",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        ...rest,
      }}
    />
  );
};

export default PhoneNumberInput;
