import { sortByCount } from './HorizontalBarChart'

describe('sortByCount', () => {
  it('should sort object their count property and return keys', () => {
    const demoObj = {
      Two: { count: 1 },
      One: { count: 124 },
      Three: { count: -99 },
      Five: { count: 1 },
      Six: { count: 10 },
      Four: { count: 2 }
    }

    expect(sortByCount(demoObj)).toEqual(['One', 'Six', 'Four', 'Two', 'Five', 'Three'])
  })
})
