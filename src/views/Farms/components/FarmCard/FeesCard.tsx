import React from 'react'
import { Flex, Text } from 'uikit'
import styled from 'styled-components'
import { FeesProps } from 'state/types'

interface FeesCardProps {
  fees: FeesProps
}

const FeesContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FeesCard: React.FC<FeesCardProps> = ( { fees } ) => (
  <FeesContainer>
    <Flex justifyContent="space-between">
      <Text>Harvest Fee:</Text>
      {
        fees?.harvestFee ?
          <Text bold>{ `${ fees.harvestFee / 100 }%` }</Text> :
          <Text>-</Text>
      }
    </Flex>
    <Flex justifyContent="space-between">
      <Text>Deposit Fee:</Text>
      {
        fees?.depositFee ?
          <Text bold>{ `${ fees.depositFee / 100 }%` }</Text> :
          <Text>-</Text>
      }
    </Flex>
    <Flex justifyContent="space-between">
      <Text>Withdraw Fee:</Text>
      {
        fees?.taxWithdraw ?
          <Text bold>{ `${ fees.taxWithdraw / 100 }%` }</Text> :
          <Text>-</Text>
      }
    </Flex>
  </FeesContainer>
)

export default FeesCard
