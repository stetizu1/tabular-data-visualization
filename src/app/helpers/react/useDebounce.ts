import { useEffect, useState } from 'react'

/**
 * Function to slow down changes triggered by its changing state.
 * If during debounce time value changes again, the later value is used and timer restarted.
 * @param value - the value to which we want to change the current value after debounce
 * @param delay - how much time we want to wait for the value to change
 * @return value, that has delayed change
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
