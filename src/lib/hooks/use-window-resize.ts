import * as React from 'react';
import { throttle } from './utils'

export function useWindowResize(func: Function) {
  React.useEffect(() => {    
    const handleResize = throttle(func, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, [])
}