import { useState } from "react";

export function useInputs<T extends { [key: string]: string }>(config: T) {
  const [values, setValues] = useState(config);

  function createChangeHandler(key: keyof T) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      setValues((prevValues) => ({ ...prevValues, [key]: event.target.value }));
    };
  }

  function reset() {
    setValues(config);
  }

  return {
    values,
    createChangeHandler,
    reset,
  };
}
