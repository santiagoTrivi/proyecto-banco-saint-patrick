import { z } from 'zod';

import { currencyEndpoint } from './currencyEndpoint.schema';

export const currencyEndpointList = z.array(currencyEndpoint);
