export function prettyPrint(variable: string, lowercase: boolean = false) {
  const splitVar = variable.split('-');
  return splitVar.map(
    (word, i) => (lowercase ? word.charAt(0) : word.charAt(0).toUpperCase()) + splitVar[i].slice(1)
  ).join(' ')
} 