const base64Decode = (input) => {
  try {
    return (Buffer.from(input, 'base64')).toString()
  } catch (error) {
    return null
  }
}

module.exports = base64Decode
