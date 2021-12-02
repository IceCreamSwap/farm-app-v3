import { DropdownMenuItemType, MenuItemsType } from 'uikit'
import { ContextApi } from 'contexts/Localization/types'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: ( t: ContextApi['t'] ) => ConfigMenuItemsType[] = ( t ) => [
  {
    label: t( 'Farms' ),
    href: '/farms',
    icon: 'Farm',
    items: [],
  },
  {
    label: t( 'Pools' ),
    href: '/pools',
    icon: 'Pool',
    items: [],
  },
  {
    label: '',
    href: '#',
    icon: 'More',
    hideSubNav: true,
    items: [
      {
        label: t( 'Exchange' ),
        href: 'https://exchange.icecreamswap.finance/#/swap',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t( 'Liquidity' ),
        href: 'https://exchange.icecreamswap.finance/#/pool',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t( 'Docs' ),
        href: 'https://swapicecream.gitbook.io/icecreamswap-2-0/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
