import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { handlers as datasetSiteHandlers } from './datasetSiteHandlers'

// This configures a request mocking server with the given request handlers. See https://mswjs.io/docs
export const server = setupServer(...handlers, ...datasetSiteHandlers)
