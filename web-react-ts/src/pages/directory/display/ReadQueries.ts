import { gql } from '@apollo/client'

export const DISPLAY_MEMBER_BIO = gql`
  query displayMemberBio($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      middleName
      lastName
      fullName
      currentTitle
      nameWithTitle
      email
      phoneNumber
      pictureUrl
      idlLocation
      whatsappNumber
      pictureUrl
      dob {
        date
      }
      gender {
        gender
      }
      maritalStatus {
        status
      }
      occupation {
        occupation
      }
      title {
        name
      }
    }
  }
`
export const DISPLAY_MEMBER_LEADERSHIP = gql`
  query displayMemberLeadership($id: ID!) {
    members(where: { id: $id }) {
      id

      #Leadership Information
      leadsFellowship {
        id
        name
        stream_name
        leader {
          firstName
          lastName
        }
      }
      leadsBacenta {
        id
        name
        stream_name
      }
      leadsConstituency {
        id
        name
        stream_name
      }
      leadsCouncil {
        id
        name
        stream_name
      }
      leadsStream {
        id
        name
      }
      leadsGatheringService {
        id
        name
      }
      leadsSonta {
        id
        name
        stream_name
      }

      leadsMinistry {
        id
        name
      }
    }
  }
`

export const DISPLAY_MEMBER_ADMIN = gql`
  query displayMemberAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      #Admin Information
      isAdminForGatheringService {
        id
        name
      }
      isAdminForStream {
        id
        name
      }
      isAdminForCouncil {
        id
        name
        stream_name
      }
      isAdminForConstituency {
        id
        name
        stream_name
      }
    }
  }
`

export const DISPLAY_MEMBER_CHURCH = gql`
  query displayMemberChurch($id: ID!) {
    members(where: { id: $id }) {
      id
      #church info
      stream_name
      ministry {
        id
        name
        leader {
          firstName
          lastName
        }
      }

      fellowship {
        id
        name
        leader {
          firstName
          lastName
        }
        council {
          id
          leader {
            id
            firstName
            lastName
            fullName
          }
        }
      }
      #Personal history
      history(limit: 3) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_FELLOWSHIP = gql`
  query displayFellowship($id: ID!) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      vacationStatus
      stream_name
      bankingCode
      name
      memberCount
      location {
        longitude
        latitude
      }
      meetingDay {
        day
      }
      bacenta {
        id
        name
        constituency {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
      }
    }
  }
`
export const DISPLAY_FELLOWSHIP_HISTORY = gql`
  query displayFellowshipHistory($id: ID!) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      services(limit: 5) {
        id
        bankingProof
        week
        noServiceReason
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_BACENTA = gql`
  query displayBacenta($id: ID!) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      vacationStatus
      graduationStatus
      target
      sprinterCost
      urvanCost
      sprinterTopUp
      urvanTopUp

      momoNumber
      stream_name
      activeFellowshipCount
      vacationFellowshipCount
      fellowships(options: { limit: 5 }) {
        id
        name
        leader {
          id
        }
        bacenta {
          id
          name
          council {
            id
            name
          }
          stream_name
        }
      }

      constituency {
        id
        name
        stream_name
        council {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
      memberCount
    }
  }
`

export const DISPLAY_CONSTITUENCY = gql`
  query displayConstituency($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      stream_name
      activeBacentaCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      bacentas(options: { limit: 5 }) {
        id
        name
        leader {
          id
        }
      }
      sontas {
        id
        name
      }
      admin {
        id
        firstName
        lastName
      }
      council {
        id
        name
      }

      sprinterCost
      sprinterTopUp
      urvanCost
      urvanTopUp

      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
      memberCount
      activeFellowshipCount
    }
  }
`

export const DISPLAY_COUNCIL = gql`
  query displayCouncil($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      stream {
        id
        name
      }
      stream_name
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      stream {
        id
        name
      }
      constituencies(options: { limit: 5 }) {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_STREAM = gql`
  query displayStream($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      gatheringService {
        id
        name
      }
      councils(options: { limit: 5 }) {
        id
        name
      }

      admin {
        id
        firstName
        lastName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_GATHERINGSERVICE = gql`
  query displayGathering($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      streamCount
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      oversight {
        id
        name
      }
      streams(options: { limit: 5 }) {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_OVERSIGHT = gql`
  query displayOversight($id: ID!) {
    oversights(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      gatheringServiceCount
      streamCount
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      gatheringServices {
        id
        name
      }
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_FEDERAL_MINISTRY = gql`
  query DisplayFederalMinistries($id: ID!) {
    federalministries(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      memberCount
      ministryCount
      hubCount
      sontaCount
      ministries {
        id
        name
      }
      gatheringService {
        id
        name
      }
      history {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_MINISTRY = gql`
  query DisplayMinistry($id: ID!) {
    ministries(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      memberCount
      sontaCount
      history {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
      hubs {
        id
        name
      }
      federalMinistry {
        id
        name
        gatheringService {
          id
          name
        }
      }
    }
  }
`

export const DISPLAY_HUB = gql`
  query DisplayHub($id: ID!) {
    hubs(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      sontaCount
      memberCount
      history {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
      ministry {
        id
        name
        federalMinistry {
          id
          name
          gatheringService {
            id
            name
          }
        }
      }
      sontas {
        id
        name
      }
    }
  }
`

export const DISPLAY_SONTA = gql`
  query DisplaySonta($id: ID!) {
    sontas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }

      hub {
        id
        name
        ministry {
          id
          name
          federalMinistry {
            id
            name
            gatheringService {
              id
              name
            }
          }
        }
      }

      memberCount
      history {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`
