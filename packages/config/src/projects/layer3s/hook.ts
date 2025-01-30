import { EthereumAddress, ProjectId, UnixTime } from '@l2beat/shared-pure'
import type { Layer3 } from '../../types'
import { underReviewL3 } from '../layer2s/templates/underReview'

// inbox on arbitrum: https://arbiscan.io/address/0xb0a00d053160e297324b7689b5e3f3af9a6fa4fb
export const hook: Layer3 = underReviewL3({
  id: 'hook',
  capability: 'universal',
  addedAt: new UnixTime(1719928126), // 2024-07-02T13:48:46Z
  isArchived: true,
  hostChain: ProjectId('arbitrum'),
  display: {
    name: 'Hook',
    slug: 'hook',
    category: 'Optimistic Rollup',
    stack: 'Arbitrum',
    description:
      'Hook is an Orbit stack L3 Appchain on Arbitrum powering a perpetuals DEX for tokens and NFTs.',
    headerWarning:
      'Hook has been [wound down and withdrawals to EOAs have been executed](https://hook.xyz/).',
    purposes: ['Universal', 'NFT', 'Exchange'],
    links: {
      websites: ['https://hook.xyz/'],
      apps: ['https://hook.xyz/trade/'],
      documentation: ['https://odysseydocumentation.hook.xyz/'],
      explorers: ['https://hook.calderaexplorer.xyz/'],
      socialMedia: [
        'https://twitter.com/HookProtocol',
        'https://discord.com/invite/8Hqw76DHQm',
        'https://blog.hook.xyz/',
        'https://warpcast.com/hookprotocol',
      ],
    },
  },
  // rpcUrl: 'https://hook.calderachain.xyz/http',
  transactionApi: {
    type: 'rpc',
    startBlock: 1,
    defaultUrl: 'https://hook.calderachain.xyz/http',
    defaultCallsPerMinute: 1500,
    adjustCount: { type: 'SubtractOne' },
  },
  escrows: [
    // BRIDGE
    {
      address: EthereumAddress('0x6BC4F2698cd385a04ee0B1805D15E995c45476F6'),
      sinceTimestamp: new UnixTime(1706232795),
      includeInTotal: false,
      tokens: ['ETH'],
      chain: 'arbitrum',
    },
    // SOCKET Vaults from here --------------------------
    {
      address: EthereumAddress('0xB39DF6BBB1Cf2B609DeE43F109caFEFF1A7CCBEa'),
      sinceTimestamp: new UnixTime(1709063015),
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
      tokens: ['WETH'],
      chain: 'ethereum',
    },
    {
      address: EthereumAddress('0x855Aaf2f690Ef6e5EF451D7AE73EC3fa61c50981'),
      sinceTimestamp: new UnixTime(1712179919),
      tokens: ['USDC'],
      chain: 'ethereum',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
    {
      address: EthereumAddress('0xCa34d7cc253b47E0248b80c859F38a658db7BcCC'),
      sinceTimestamp: new UnixTime(1707792505),
      includeInTotal: false,
      tokens: ['WETH'],
      chain: 'arbitrum',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
    {
      address: EthereumAddress('0x7b017d4fcC370D32Fe13e60cA7424037BDEEcba6'),
      sinceTimestamp: new UnixTime(1712179761),
      includeInTotal: false,
      tokens: ['USDC'],
      chain: 'arbitrum',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
    {
      address: EthereumAddress('0xB39DF6BBB1Cf2B609DeE43F109caFEFF1A7CCBEa'),
      sinceTimestamp: new UnixTime(1712177617),
      includeInTotal: false,
      tokens: ['WETH'],
      chain: 'base',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
    {
      address: EthereumAddress('0x3411942F8FdAd5995Fbecb66bc07aA839D738500'),
      sinceTimestamp: new UnixTime(1712179763),
      includeInTotal: false,
      tokens: ['USDC'],
      chain: 'base',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
    {
      address: EthereumAddress('0xB39DF6BBB1Cf2B609DeE43F109caFEFF1A7CCBEa'),
      sinceTimestamp: new UnixTime(1707792507),
      includeInTotal: false,
      tokens: ['WETH'],
      chain: 'optimism',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
    {
      address: EthereumAddress('0xdBfE75271E3427D5b5480A1B4a4279e92518AB39'),
      sinceTimestamp: new UnixTime(1712179763),
      includeInTotal: false,
      tokens: ['USDC'],
      chain: 'optimism',
      source: 'external',
      bridgedUsing: {
        bridges: [
          {
            name: 'Socket bridge',
            slug: 'socket',
          },
        ],
      },
    },
  ],
})
