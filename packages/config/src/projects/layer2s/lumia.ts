import { UnixTime } from '@l2beat/shared-pure'
import type { Layer2 } from '../../types'
import { Badge } from '../badges'
import { upcomingL2 } from './templates/upcoming'

export const lumia: Layer2 = upcomingL2({
  id: 'lumia',
  capability: 'universal',
  addedAt: new UnixTime(1718181773), // 2024-06-12T08:42:53Z
  badges: [Badge.Infra.AggLayer],
  display: {
    name: 'Lumia',
    slug: 'lumia',
    description:
      'Lumia is a modular L2 aiming at leveraging Polygon CDK, EigenDA, and AggLayer to achieve enhanced functionality in DeFi applications.',
    purposes: ['Universal', 'Restaking'],
    category: 'Validium',
    stack: 'Polygon',
    links: {
      websites: ['https://lumia.org/'],
      documentation: ['https://docs.lumia.org/'],
      repositories: ['https://github.com/orionprotocol'],
      socialMedia: [
        'https://x.com/BuildOnLumia',
        'https://t.me/lumia_community',
      ],
    },
  },
})
