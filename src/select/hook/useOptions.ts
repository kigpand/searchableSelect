import { useEffect, useMemo, useState } from "react";
import { Options } from "../Select";

export function useOptions(
  optionValue: Options | (() => Promise<Options>),
  search: string
) {
  const [options, setOptions] = useState<Options>([]);
  const filterdOptions = useMemo(() => {
    if (search === "") return options;
    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

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

  return { options, filterdOptions };
}
