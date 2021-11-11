import { FooterLinkType } from 'uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: ( t: ContextApi['t'] ) => FooterLinkType[] = ( t ) => [
  {
    label: t( 'Help' ),
    items: [
      {
        label: t( 'Guides' ),
        href: 'https://docs.pancakeswap.finance/get-started',
      },
    ],
  },
  {
    label: t( 'Developers' ),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/supercake',
      },
      {
        label: t( 'Documentation' ),
        href: 'https://docs.supercakebsc.finance',
      },
    ],
  },
]
