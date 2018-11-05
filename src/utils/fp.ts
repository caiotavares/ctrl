export function flow(argument, ...fns) {
  return fns.reduce((res, fn) => {
    return fn(res)
  }, argument)
}
