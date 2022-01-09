import BacentaService from 'pages/services/record-service/BacentaService'
import BacentaServiceDetails from 'pages/services/record-service/BacentaServiceDetails'
import ConstituencyService from 'pages/services/record-service/ConstituencyService'
import ConstituencyServiceDetails from 'pages/services/record-service/ConstituencyServiceDetails'
import FellowshipService from 'pages/services/record-service/FellowshipService'
import FellowshipServiceCancelled from 'pages/services/record-service/FellowshipServiceCancelled'
import FellowshipServiceDetails from 'pages/services/record-service/FellowshipServiceDetails'
import SontaService from 'pages/services/record-service/SontaService'
import SontaServiceDetails from 'pages/services/record-service/SontaServiceDetails'
import BacentaReport from 'pages/services/reports/BacentaReport'
import ConstituencyReport from 'pages/services/reports/ConstituencyReport'
import CouncilReport from 'pages/services/reports/CouncilReport'
import FellowshipReport from 'pages/services/reports/FellowshipReport'
import SontaReport from 'pages/services/reports/SontaReport'
import BacentaJoint from 'pages/services/BacentaJoint'
import BankingSlipSubmission from 'pages/services/BankingSlipSubmission'
import BankingSlipView from 'pages/services/BankingSlipView'
import ConstituencyJoint from 'pages/services/ConstituencyJoint'
import Banked from 'pages/services/defaulters/Banked'
import BankingDefaulters from 'pages/services/defaulters/BankingDefaulters'
import CancelledServicesThisWeek from 'pages/services/defaulters/CancelledServiceThisWeek'
import CouncilByConstituency from 'pages/services/defaulters/CouncilByConstituency'
import Defaulters from 'pages/services/defaulters/Defaulters'
import FormDefaulters from 'pages/services/defaulters/FormDefaulters'
import ServicesThisWeek from 'pages/services/defaulters/ServicesThisWeek'
import Fellowship from 'pages/services/Fellowship'
import ServicesChurchList from 'pages/services/ServicesChurchList'
import Services from 'pages/services/ServicesMenu'
import StreamReport from 'pages/services/reports/StreamReport'
import GatheringServiceReport from 'pages/services/reports/GatheringServiceReport'
import StreamByCouncil from 'pages/services/defaulters/StreamByCouncil'
import GatheringServiceByStream from 'pages/services/defaulters/GatheringServiceByStream'
import { permitMeAndThoseAbove } from 'global-utils'

export const services = [
  {
    path: '/services',
    element: Services,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/church-list',
    element: ServicesChurchList,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/fellowship',
    element: Fellowship,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/bacenta',
    element: BacentaJoint,
    roles: [
      'adminCouncil',
      'adminConstituency',
      'adminGatheringService',
      'leaderBacenta',
    ],
    placeholder: true,
  },
  {
    path: '/services/constituency',
    element: ConstituencyJoint,
    roles: [
      'adminCouncil',
      'adminConstituency',
      'adminGatheringService',
      'leaderConstituency',
    ],
    placeholder: true,
  },

  {
    path: '/services/banking-slips',
    element: BankingSlipView,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/banking-slip/submission',
    element: BankingSlipSubmission,
    roles: ['all'],
    placeholder: true,
  },
]

export const reports = [
  {
    path: '/fellowship/reports',
    element: FellowshipReport,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/bacenta/reports',
    element: BacentaReport,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: true,
  },
  {
    path: '/sonta/reports',
    element: SontaReport,
    roles: permitMeAndThoseAbove('Sonta'),
    placeholder: true,
  },
  {
    path: '/constituency/reports',
    element: ConstituencyReport,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },

  {
    path: '/council/reports',
    element: CouncilReport,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: true,
  },
  {
    path: '/stream/reports',
    element: StreamReport,
    roles: permitMeAndThoseAbove('Stream'),
    placeholder: true,
  },
  {
    path: '/gatheringservice/reports',
    element: GatheringServiceReport,
    roles: permitMeAndThoseAbove('GatheringService'),
    placeholder: true,
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    element: FellowshipServiceDetails,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/fellowship/no-service',
    element: FellowshipServiceCancelled,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/fellowship/form',
    element: FellowshipService,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',
      'leaderFellowship',
    ],
    placeholder: false,
  },
  {
    path: '/fellowship/record-service',
    element: FellowshipService,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',
      'leaderFellowship',
    ],
    placeholder: false,
  },

  {
    path: '/services/constituency-joint/form',
    element: ConstituencyService,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
  },
  {
    path: '/bacenta/record-service',
    element: BacentaService,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',
      'leaderBacenta',
    ],
    placeholder: false,
  },

  //Sonta Service Details
  {
    path: '/sonta/record-service',
    element: SontaService,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderSonta',
    ],
    placeholder: false,
  },
  {
    path: '/sonta/service-details',
    element: SontaServiceDetails,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
  },

  //Bacenta Service Things
  {
    path: '/bacenta/service-details',
    element: BacentaServiceDetails,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: false,
  },

  //Constituency Services
  {
    path: '/constituency/record-service',
    element: ConstituencyService,
    roles: [
      'adminGatheringService',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
  },
  {
    path: '/constituency/service-details',
    element: ConstituencyServiceDetails,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: false,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    element: Defaulters,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/form-defaulters',
    element: FormDefaulters,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banking-defaulters',
    element: BankingDefaulters,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banked',
    element: Banked,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/filled-services',
    element: ServicesThisWeek,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/cancelled-services',
    element: CancelledServicesThisWeek,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },

  //Council By Constituency

  {
    path: '/services/council-by-constituency',
    element: CouncilByConstituency,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: true,
  },
  //Stream By Council
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: permitMeAndThoseAbove('Stream'),
    placeholder: true,
  },
  //Gathering Service By Stream
  {
    path: '/services/gathering-service-by-stream',
    element: GatheringServiceByStream,
    roles: permitMeAndThoseAbove('GatheringService'),
    placeholder: true,
  },
]
