import { useEffect, useState } from "react";
import { Options } from "../Select";

export function useOptions(optionValue: Options | (() => Promise<Options>)) {
  const [options, setOptions] = useState<Options>([]);

  useEffect(() => {
    if (typeof optionValue === "object") {
      setOptions(optionValue);
    }
    if (typeof optionValue === "function") {
      getOptionValue(optionValue);
    }
  }, [optionValue]);

  const getOptionValue = async (func: () => Promise<Options>) => {
    const value = await func();
    setOptions(value);
  };

  return { options };
}
