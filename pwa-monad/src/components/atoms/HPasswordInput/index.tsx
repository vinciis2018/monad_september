import React, { useState, useCallback } from "react";
import ReactCodeInput from "react-code-input";
import { Box } from "@chakra-ui/react";

interface IPropsType {
  onChange: (val: string) => void;
  onComplete?: (val: string) => void;
  onFocus?: () => void;
  password?: string;
  label?: string;
  labelAlign?: string;
  focused?: boolean;
  type?: string;
  autoFocus?: boolean;
}

const HPasswordInput = React.forwardRef<ReactCodeInput | null, IPropsType>(
  ({ onChange, onComplete }, ref) => {
    // const [code, setCode] = useState("");
    const [textType, setTextType] = useState("password");

    const onClick = useCallback(() => {
      if (textType === "password") {
        setTextType("text");
      } else {
        setTextType("password");
      }
    }, [textType]);

    const onEditPin = useCallback(
      (value: string) => {
        // setCode(value);
        onChange(value);
        if (value.length === 6 && onComplete) onComplete(value);
      },
      [onChange, onComplete]
    );

    return (
      <Box onClick={onClick}>
        <ReactCodeInput
          type="number"
          fields={6}
          name={""}
          inputMode={"tel"}
          onChange={onEditPin}
          // autoFocus={autoFocus}
          ref={ref}
        />
      </Box>
    );
  }
);

export default HPasswordInput;
