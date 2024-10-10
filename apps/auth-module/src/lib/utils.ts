import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDirtyValuesTF(
  intialValues: any,
  currnetValues: any,
  arrayPkNames: { arrayName: string; pkName: string }[],
  rootPkName: string | null = null,
) {
  const dirtyValues = {}
  Object.keys(intialValues).map((key) => {
    // console.log('key11', key, allValues)
    if (Array.isArray(currnetValues[key])) {
      // if array we add a prop (named key) to dirtyValues with object having inserts:[row1,row2...],updtaes:[row1,row2...],delets:[pk1,pk2..]
      const arr = Array.from(currnetValues[key])

      const arrayDetails = arrayPkNames.find((a) => a.arrayName == key)

      if (arrayDetails) {
        const pkName = arrayDetails.pkName
        dirtyValues[key] = { inserts: [], updates: [], deletes: [] }
        arr.forEach((el, index) => {
          if (
            currnetValues[key][index][pkName] == undefined ||
            currnetValues[key][index][pkName] == null ||
            currnetValues[key][index][pkName] == 0 ||
            currnetValues[key][index][pkName] == '0'
          ) {
            if (el) {
              dirtyValues[key].inserts.push(el)
              // dirtyValues[key].inserts.push(
              //   getDirtyValues(el, currnetValues[key][index], []),
              // )
            }

            ///
          } else {
            //update
            const intitArrayRow = intialValues[key].find(
              (i) => i[pkName] === el[pkName],
            )
            const currentArrayRow = currnetValues[key].find(
              (i) => i[pkName] === el[pkName],
            )

            if (!intitArrayRow) {
              console.log('Error data mismatch - in init array')
              return
            }
            if (el) {
              const val = getDirtyValuesTF(
                intitArrayRow,
                currentArrayRow,
                [],
                pkName,
              )
              if (val) {
                dirtyValues[key].updates.push(val)
              }
            }
          }
        })

        //find deleted rows
        intialValues[key].forEach((ir) => {
          const currentArrayRow = currnetValues[key].find(
            (i) => i[pkName] === ir[pkName],
          )
          if (!currentArrayRow) {
            dirtyValues[key].deletes.push(ir[pkName])
            console.log('del f')
          }
        })
      } else {
        console.warn('no array def in form data')
      }
    } else {
      //not array property
      if (intialValues[key] !== currnetValues[key]) {
        dirtyValues[key] = currnetValues[key]
      }
    }
  })

  if (rootPkName && Object.keys(dirtyValues).length > 0) {
    dirtyValues[rootPkName] = intialValues[rootPkName]
  }
  console.log('dirtyValues-last', dirtyValues)
  if (Object.keys(dirtyValues).length > 0) {
    return dirtyValues
  } else {
    return
  }
}
function getDirtyValues(
  dirtyFields: object | boolean,
  allValues: object | any,
  arrayPkNames: { arrayName: string; pkName: string }[],
  rootPkName: string | null = null,
): object {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
  // Here, we have an object
  // return Object.fromEntries(
  //   Object.keys(dirtyFields).map((key) => [
  //     key,
  //     dirtyValues(dirtyFields[key], allValues[key]),
  //   ]),
  // )
  // console.log("key",Array.from(dirtyFields[key]) )
  const dirtyValues = {}
  console.log('allValues1', allValues)
  console.log('dirtyFields1', dirtyFields)
  Object.keys(dirtyFields).map((key) => {
    // console.log('key11', key, allValues)
    if (Array.isArray(dirtyFields[key])) {
      // if array we add a prop (named key) to dirtyValues with object having inserts:[row1,row2...],updtaes:[row1,row2...],delets:[pk1,pk2..]
      const arr = Array.from(dirtyFields[key])

      const arrayDetails = arrayPkNames.find((a) => a.arrayName == key)

      if (arrayDetails) {
        const pkName = arrayDetails.pkName
        dirtyValues[key] = { inserts: [], updates: [], deletes: [] }
        arr.forEach((el, index) => {
          if (
            allValues[key][index][pkName] == undefined ||
            allValues[key][index][pkName] == null
          ) {
            console.log('insert f')

            if (el) {
              dirtyValues[key].inserts.push(
                getDirtyValues(el, allValues[key][index], []),
              )
            }
          } else {
            //update
            if (el) {
              const val = getDirtyValues(el, allValues[key][index], [], pkName)
              if (val) {
                dirtyValues[key].updates.push(val)
              }
            }
          }
        })
      }
    } else {
      //not array property
      if (dirtyFields[key]) {
        dirtyValues[key] = allValues[key]
      }
    }
  })

  if (rootPkName && Object.keys(dirtyValues).length > 0) {
    dirtyValues[rootPkName] = allValues[rootPkName]
  }
  console.log('dirtyValues-last', dirtyValues)
  if (Object.keys(dirtyValues).length > 0) {
    return dirtyValues
  } else {
    return
  }
}
