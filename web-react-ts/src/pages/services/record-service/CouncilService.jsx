import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_COUNCIL } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const CouncilService = () => {
  const { councilId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_COUNCIL, {
    variables: { id: councilId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={data?.councils[0]}
        churchId={councilId}
        churchType="council"
      />
    </ApolloWrapper>
  )
}

export default CouncilService