export default function getUpdateQuery(obj, tablename, pkName) {
  let sqlUpdates = []
  let valuesArray = []
  Object.keys(obj).forEach((key, index) => {
    if (key != pkName) {
      sqlUpdates.push(` ${key} = $${index + 1} `)
      valuesArray.push(obj[key])
    }
  })

  return [
    `update ${tablename} set ${sqlUpdates.join(',')} where ${pkName} = ${
      obj[pkName]
    } `,
    valuesArray,
  ]
}

// export default function getUpdateQuery(obj,tablename,pkName) {
//     let sqlUpdates = ""
//     let valuesArray =[]
//     Object.keys(obj).forEach((key,index) => {
//         sqlUpdate += ` ${key} = $${index + 1} `
//         valuesArray.push(obj[key])
//     })

//     return [`update ${tablename} set ${sqlUpdate} where ${pkName} = ${obj[pkName]} ` ,valuesArray]

// }
