import { serializeTokens } from './tokens'
import { PoolCategory, SerializedPoolConfig } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.spk,
    earningToken: serializedTokens.spk,
    contractAddress: {
      97: '',
      56: '0xfc6b1fe618849d36925e3940560aafbd43480272',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
