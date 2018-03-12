const Score = {
  name: 'Score',
  properties: {
    score: 'int'
  }
}

const ResponseMetadata = {
  name: 'ResponseMetadata',
  properties: {
    user_agent: 'string',
    platform: 'string',
    referer: 'string',
    network_id: 'string',
    browser: 'string'
  }
}

const Response = {
  name: 'Response',
  properties: {
    landing_id: 'string',
    token: 'string',
    landed_at: 'date',
    submitted_at: 'date',
    metadata: 'ResponseMetadata[]',
    answers: 'Answer[]',
    hidden: 'string',
    calculated: 'Score'
  }
}

const Responses = {
  name: 'Responses',
  primaryKey: 'id',
  properties: {
    id: 'string',
    total_items: 'int',
    page_count: 'int',
    items: 'Response[]'
  }
}

export default [
  Responses,
  Response,
  ResponseMetadata,
  Score
]
