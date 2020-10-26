const map2List = (obj, keyname) => {
  if (!obj) return []
  return Object.keys(obj).map((key) => ({
    ...obj[key],
    [keyname]: key
  }))
}

module.exports = map2List
