/**
 * Set Local Storage item with expire time
 * @param key Local Storage item key
 * @param value Local Storage value to store
 * @param ttl Expire time in miliseconds
 */
export function setLocalStorageItem(key: string, value: unknown, ttl: number) {
  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

/**
 * Get Local Storage item with expire time
 * @param key Local Storage item key to get
 * @returns Object of the requested item
 */
export function getLocalStorageItem<T>(key: string): T {
  const itemString = localStorage.getItem(key)
  if (!itemString) return null

  const item = JSON.parse(itemString)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }

  return typeof item.value === 'object' ? item.value : JSON.parse(item.value)
}