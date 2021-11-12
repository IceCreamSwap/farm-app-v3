import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config( {
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
} )

export const FARM_CAKE_WBNB_PID = 1; // CAKE-WBNB LP
export const FARM_BUSD_WBNB_PID = 3; // BUSD-WBNB LP

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const BSC_BLOCK_TIME = 3

export const CAKE_PER_BLOCK = 1
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK * BLOCKS_PER_YEAR

export const BASE_URL = 'https://test.supercakebsc.finance'

export const PCS_URL = 'https://pancakeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${ PCS_URL }/add`

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
}
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow( 18 )
export const DEFAULT_GAS_LIMIT = 1_000_000 // Vault takes much gas!