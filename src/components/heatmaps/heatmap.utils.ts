export function getHeapMapConfig(decimalCount: number): {radius: number, blur: number} {
  if (decimalCount >= 4) {
    return { radius: 50, blur: 25 }
  } else if (decimalCount === 3) {
    return { radius: 100, blur: 33 }
  } else {
    return { radius: 200, blur: 50 }
  }
}