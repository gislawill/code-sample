import * as React from 'react';
import { useWindowResize } from './use-window-resize'

function getWidth() {
  if (typeof window !== 'undefined') {
    return window.innerWidth 
    || document.documentElement.clientWidth 
    || document.body.clientWidth
  } else {
    return 0
  }
}

export function useWindowWidth() {
  let [width, setWidth] = React.useState(getWidth())
  useWindowResize(() => { setWidth(getWidth()) })
  return width
}

function getHeight() {
  if (typeof window !== 'undefined') {
    return window.innerHeight 
    || document.documentElement.clientHeight 
    || document.body.clientHeight
  } else {
    return 0
  }
}

export function useWindowHeight() {
  let [width, setWidth] = React.useState(getHeight())
  useWindowResize(() => { setWidth(getHeight()) })
  return width
}