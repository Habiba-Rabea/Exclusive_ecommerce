import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {

    try {

      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;

    } catch (error) {

      console.error(`Error reading localStorage key "${key}":`, error);

      return initialValue;

    }

  });

  const setValue = (value) => {

    try {

      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      window.dispatchEvent(new Event("local-storage"));

    } catch (error) {

      console.error(`Error updating value for key "${key}":`, error);

    }

  };

  useEffect(() => {

    const handleStorageChange = () => {

      try {

        const item = window.localStorage.getItem(key);

        if (item) {

          setStoredValue(JSON.parse(item));

        }

      } catch (error) {

        console.error(`Error syncing key "${key}":`, error);

      }

    };



    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("local-storage", handleStorageChange);



    return () => {

      window.removeEventListener("storage", handleStorageChange);

      window.removeEventListener("local-storage", handleStorageChange);

    };

  }, [key]);



  return [storedValue, setValue];
}