/**
 Replaces array elements *in-place*
 @param target target array
 @param items new items to place into target array
 */
function replaceItems<T extends unknown[]>(target: T, items: T) {
  target.splice(0, target.length, ...items)
}

/**
 Empties an array
 @param target target array
 */
function clearItems<T extends unknown[]>(target: T) {
  target.splice(0, target.length)
}

export { replaceItems, clearItems }
