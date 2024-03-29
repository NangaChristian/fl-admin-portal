import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import CampaignChurchList from '../../CampaignChurchList'
import { STREAM_LIST } from '../SwollenSundayQueries'

const SwollenSundayStreamList = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(STREAM_LIST, {
    variables: {
      gatheringServiceId: gatheringServiceId,
    },
  })

  const streams = data?.gatheringServices[0]?.streams

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="text-center">
        <HeadingPrimary>Swollen Sunday Campaign</HeadingPrimary>
        <HeadingSecondary>
          {`${data?.gatheringServices[0]?.name} ${data?.gatheringServices[0]?.__typename}`}{' '}
          Streams
        </HeadingSecondary>
        <CampaignChurchList data={streams} page="swollen-sunday" />
      </div>
    </ApolloWrapper>
  )
}

export default SwollenSundayStreamList
