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
        label: t( 'Blog' ),
        href: 'https://medium.com/pancakeswap',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t( 'Docs' ),
        href: 'https://docs.pancakeswap.finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
