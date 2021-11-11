import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { FARM_BUSD_WBNB_PID, FARM_CAKE_WBNB_PID } from '../index'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'SPK',
    lpAddresses: {
      97: '',
      56: '0x4f8f2D516Ed7203244973751941C03eb306dF324',
    },
    token: serializedTokens.spk,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: FARM_CAKE_WBNB_PID,
    lpSymbol: 'SPK-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x36584512107D1FEDC549F93437BBd22De79E47e1',
    },
    token: serializedTokens.spk,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'SPK-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7CCD8b27Bc822Ebc996548BEB09B21F84ca2a534',
    },
    token: serializedTokens.spk,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: FARM_BUSD_WBNB_PID,
    lpSymbol: 'BUSD-WBNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'USDT-WBNB LP',
    lpAddresses: {
      97: '',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 6,
    lpSymbol: 'CAKE-WBNB LP',
    lpAddresses: {
      97: '',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'CAKE-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x804678fa97d91B974ec2af3c843270886528a9E6',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'CAKE-USDT LP',
    lpAddresses: {
      97: '',
      56: '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 9,
    lpSymbol: 'BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 10,
    lpSymbol: 'WBNB LP',
    lpAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 11,
    lpSymbol: 'ETH LP',
    lpAddresses: {
      97: '',
      56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 12,
    lpSymbol: 'BTCB LP',
    lpAddresses: {
      97: '',
      56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.btcb,
  },
  {
    pid: 13,
    lpSymbol: 'USDC LP',
    lpAddresses: {
      97: '',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 14,
    lpSymbol: 'USDT LP',
    lpAddresses: {
      97: '',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 15,
    lpSymbol: 'DOT LP',
    lpAddresses: {
      97: '',
      56: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    },
    token: serializedTokens.dot,
    quoteToken: serializedTokens.dot,
  },
]

export default farms
