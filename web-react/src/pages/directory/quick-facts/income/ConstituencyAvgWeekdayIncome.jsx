import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { CONSTITUENCY_AVG_WEEKDAY_INCOME_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'

const ConstituencyAvgWeekdayIncome = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    CONSTITUENCY_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { constituencyId: constituencyId },
    }
  )

  const constituency = data?.constituencies[0]

  const details = [
    {
      churchType: 'Constituency',
      cardType: 'Income',
      leadersName: `${constituency?.leader?.firstName} ${constituency?.leader?.lastName}`,
      churchName: `${constituency?.name}`,
      churchAvgIncomeThisMonth: `${constituency?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${constituency?.council?.avgConstituencyWeekdayIncomeThisMonth}`,
      higherLevelName: `${constituency?.council?.name} ${constituency?.council?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <QuickFactsHeader previous={'attendance'} next={'attendance'} />

        <div className=" page-padding mt-3 quick-fact-card-wrapper">
          <IncomeQuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default ConstituencyAvgWeekdayIncome