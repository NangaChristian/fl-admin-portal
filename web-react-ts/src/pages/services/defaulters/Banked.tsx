import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import useChurchLevel from 'hooks/useChurchLevel'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DefaulterCard from './DefaulterCard'
import {
  CONSTITUENCY_BANKED_LIST,
  COUNCIL_BANKED_LIST,
  STREAM_BANKED_LIST,
  GATHERINGSERVICE_BANKED_LIST,
} from './DefaultersQueries'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'
import { DefaultersUseChurchType } from './defaulters-types'
import PullToRefresh from 'react-simple-pull-to-refresh'

const Banked = () => {
  const [constituencyBanked, { refetch: constituencyRefetch }] = useLazyQuery(
    CONSTITUENCY_BANKED_LIST
  )
  const [councilBanked, { refetch: councilRefetch }] =
    useLazyQuery(COUNCIL_BANKED_LIST)
  const [streamBanked, { refetch: streamRefetch }] =
    useLazyQuery(STREAM_BANKED_LIST)
  const [gatheringServiceBanked, { refetch: gatheringServiceRefetch }] =
    useLazyQuery(GATHERINGSERVICE_BANKED_LIST)

  const data: DefaultersUseChurchType = useChurchLevel({
    constituencyFunction: constituencyBanked,
    constituencyRefetch,
    councilFunction: councilBanked,
    councilRefetch,
    streamFunction: streamBanked,
    streamRefetch,
    gatheringServiceFunction: gatheringServiceBanked,
    gatheringServiceRefetch,
  })

  const { church, loading, error, refetch } = data

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary
            loading={!church}
          >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
          <HeadingSecondary>
            {`Fellowships That Have Banked This Week (Week ${getWeekNumber()})`}
          </HeadingSecondary>

          <PlaceholderCustom as="h6" loading={!church?.bankedThisWeek.length}>
            <h6>{`Number Who Have Banked: ${church?.bankedThisWeek.length}`}</h6>
          </PlaceholderCustom>

          <Row>
            {church?.bankedThisWeek.map((defaulter, i) => (
              <Col key={i} xs={12} className="mb-3">
                <DefaulterCard
                  defaulter={defaulter}
                  link="/fellowship/service-details"
                />
              </Col>
            ))}
            {!church && <PlaceholderDefaulterList />}
          </Row>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default Banked
