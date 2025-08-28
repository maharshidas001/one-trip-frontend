import { useEffect, useState } from "react";

const useDebounce = (searchTerm: string, timer: number) => {
  const [debounceData, setDebounceData] = useState<string>(searchTerm);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceData(searchTerm);
    }, timer);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, timer])

  return debounceData;
};

export default useDebounce;