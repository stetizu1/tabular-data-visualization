import { MutableRefObject, useRef } from 'react'

/**
 * Modified useRef, to get the value after the update
 * @param value - original ref value
 */
export const useUpdatedRef = <T>(value: T): MutableRefObject<T> => {
  const valueRef = useRef<T>(value)
  valueRef.current = value
  return valueRef
}
