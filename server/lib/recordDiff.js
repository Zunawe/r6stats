const _ = require('lodash')

const recordDiff = (data1, data2) => {
  const getDiffPaths = (o1, o2) => {
    let diffs = []

    for (const property in o1) {
      if (typeof o1[property] === 'object') {
        const diffPaths = getDiffPaths(o1[property], o2[property]).map((path) => [property, ...path])
        if (diffPaths.length) diffs = [...diffs, ...diffPaths]
      } else {
        if (o1[property] !== o2[property]) {
          diffs.push([property])
        }
      }
    }

    return diffs
  }

  const paths = getDiffPaths(data1, data2)
  return paths.reduce((acc, path) => {
    const difference = _.get(data2, path) - _.get(data1, path)
    _.set(acc, path, difference)
    return acc
  }, {})
}

module.exports = recordDiff
