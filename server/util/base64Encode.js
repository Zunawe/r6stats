const base64Encode = (input) => {
  try {
    return (Buffer.from(input, 'ascii')).toString('base64')
  } catch (error) {
    return null
  }
}

module.exports = base64Encode
