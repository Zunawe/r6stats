const { GraphQLEnumType } = require('graphql')

const GroupBy = new GraphQLEnumType({
  name: 'GroupBy',
  values: {
    INDIVIDUAL: { value: 'INDIVIDUAL' },
    DAY: { value: 'DAY' },
    WEEK: { value: 'WEEK' },
    MONTH: { value: 'MONTH' },
    YEAR: { value: 'YEAR' }
  }
})

module.exports = GroupBy
