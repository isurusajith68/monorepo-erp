export default function getUpdateQuery(obj, tablename, pkName) {
  let sqlUpdates = []
  let valuesArray = []
  let keyCount = 1

  Object.keys(obj).forEach((key) => {
    if (key !== pkName) {
      sqlUpdates.push(` ${key} = $${keyCount} `)
      valuesArray.push(obj[key])
      keyCount++
    }
  })

  if (keyCount > 1) {
    valuesArray.push(obj[pkName])

    return [
      `update ${tablename} set ${sqlUpdates.join(
        ',',
      )} where ${pkName} = $${keyCount}`,
      valuesArray,
    ]
  } else {
    return ['', []]
  }
}
