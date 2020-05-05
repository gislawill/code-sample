import * as React from 'react';
import { useWindowResize } from './use-window-resize'

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth

export function useWindowWidth() {
  let [width, setWidth] = React.useState(getWidth())
  useWindowResize(() => { setWidth(getWidth()) })
  return width
}

const getHeight = () => window.innerHeight 
  || document.documentElement.clientHeight 
  || document.body.clientHeight

export function useWindowHeight() {
  let [width, setWidth] = React.useState(getHeight())
  useWindowResize(() => { setWidth(getHeight()) })
  return width
}