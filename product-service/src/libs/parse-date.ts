export const getDataForCreating = (
  data: { [key: string]: any },
  columnNameOverride?: { currentName: string; newName: string }[],
): {
  columns: string
  values: string
} => {
  let columns: string = ''

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] === null || data[key] === undefined) {
        delete data[key]
      }
    }
  }

  columns = Object.keys(data).toString()

  if (columnNameOverride) {
    columnNameOverride.forEach(({ currentName, newName }) => {
      columns = columns.replace(currentName, newName)
    })
  }

  return {
    columns,
    values: Object.values(data)
      .map(item => `'${item}'`)
      .toString(),
  }
}
