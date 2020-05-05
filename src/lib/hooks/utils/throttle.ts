export function throttle(func: Function, delay: number) {
  let inProgress = false;
  return () => {
    if (inProgress) return
    inProgress = true
    func(); // semicolon required
    setTimeout(() => {
      inProgress = false
    }, delay)
  }
}