import { useState, useEffect, useCallback } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: (value: T | ((val: T) => T)) => void = useCallback(
    (value) => {
      if (typeof window == "undefined") {
        console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
        return;
      }

      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        setStoredValue(valueToStore);
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue],
  );

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    },
    [readValue, key],
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
