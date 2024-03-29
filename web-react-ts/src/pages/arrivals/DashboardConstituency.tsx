import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MenuButton from 'components/buttons/MenuButton'
import SubmitButton from 'components/formik/SubmitButton'
import Popup from 'components/Popup/Popup'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { CONSTITUENCY_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import RoleView from 'auth/RoleView'
import { SHORT_POLL_INTERVAL, throwToSentry } from 'global-utils'
import { MAKE_CONSTITUENCYARRIVALS_ADMIN } from './arrivalsMutation'
import { permitAdmin, permitArrivals } from 'permission-utils'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import usePopup from 'hooks/usePopup'
import SearchMember from 'components/formik/SearchMember'
import { beforeStreamArrivalsDeadline } from './arrivals-utils'
import ErrorText from 'components/ErrorText'
import PullToRefresh from 'react-simple-pull-to-refresh'

export type AdminFormOptions = {
  adminName: string
  adminSelect: string
}

const ConstituencyDashboard = () => {
  const { isOpen, togglePopup } = usePopup()
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useQuery(
    CONSTITUENCY_ARRIVALS_DASHBOARD,
    {
      variables: { id: currentUser?.currentChurch.id },
      pollInterval: SHORT_POLL_INTERVAL,
    }
  )
  const [MakeConstituencyArrivalsAdmin] = useMutation(
    MAKE_CONSTITUENCYARRIVALS_ADMIN
  )
  const constituency = data?.constituencies[0]

  const initialValues: AdminFormOptions = {
    adminName: constituency?.arrivalsAdmin
      ? `${constituency?.arrivalsAdmin?.fullName}`
      : '',
    adminSelect: constituency?.arrivalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (
    values: AdminFormOptions,
    onSubmitProps: FormikHelpers<AdminFormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    MakeConstituencyArrivalsAdmin({
      variables: {
        constituencyId: currentUser?.currentChurch.id,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Constituency Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwToSentry(e))
  }

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error}>
        <Container>
          <HeadingPrimary loading={loading}>
            {constituency?.name} Constituency Arrivals Real Time Dashboard
          </HeadingPrimary>
          <HeadingSecondary>{`Arrivals Rep: ${
            constituency?.arrivalsAdmin?.fullName ?? 'None'
          }`}</HeadingSecondary>
          {isOpen && (
            <Popup handleClose={togglePopup}>
              <b>Change Arrivals Admin</b>
              <p>Please enter the name of the new administrator</p>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form>
                    <Row className="form-row">
                      <Col>
                        <SearchMember
                          name="adminSelect"
                          initialValue={initialValues?.adminName}
                          placeholder="Select an Admin"
                          setFieldValue={formik.setFieldValue}
                          aria-describedby="Member Search"
                          error={formik.errors.adminSelect}
                        />
                      </Col>
                    </Row>

                    <SubmitButton formik={formik} />
                  </Form>
                )}
              </Formik>
            </Popup>
          )}

          <div className="d-grid gap-2">
            <RoleView
              roles={[
                ...permitAdmin('Constituency'),
                ...permitArrivals('Council'),
              ]}
            >
              <Button
                variant="outline-secondary my-3"
                onClick={() => togglePopup()}
              >
                Change Arrivals Admin
              </Button>
            </RoleView>

            {!beforeStreamArrivalsDeadline(constituency?.council.stream) && (
              <ErrorText>Arrival Deadline is up! Thank you very much</ErrorText>
            )}
            <MenuButton
              title="Bacentas With No Activity"
              onClick={() => navigate('/arrivals/bacentas-no-activity')}
              number={constituency?.bacentasNoActivityCount.toString()}
              color="red"
              iconBg
              noCaption
            />
            <MenuButton
              title="Bacentas Mobilising"
              onClick={() => navigate('/arrivals/bacentas-mobilising')}
              number={constituency?.bacentasMobilisingCount.toString()}
              color="orange"
              iconBg
              noCaption
            />
            <MenuButton
              title="Bacentas On The Way"
              onClick={() => navigate('/arrivals/bacentas-on-the-way')}
              number={constituency?.bacentasOnTheWayCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />
            <MenuButton
              title={`Bacentas That Didn't Bus`}
              onClick={() => navigate('/arrivals/bacentas-below-8')}
              number={constituency?.bacentasBelow8Count.toString()}
              iconBg
              color="red"
              noCaption
            />
            <MenuButton
              title="Bacentas That Have Arrived"
              onClick={() => navigate('/arrivals/bacentas-have-arrived')}
              number={constituency?.bacentasHaveArrivedCount.toString()}
              color="green"
              iconBg
              noCaption
            />
            <div className="mt-5 d-grid gap-2">
              <MenuButton
                title="Members On The Way"
                number={constituency?.bussingMembersOnTheWayCount.toString()}
                color="yellow"
                iconBg
                noCaption
              />
              <MenuButton
                title="Members That Have Arrived"
                number={constituency?.bussingMembersHaveArrivedCount.toString()}
                color="green"
                iconBg
                noCaption
              />
              <MenuButton
                title="Busses That Have Arrived"
                number={constituency?.bussesThatArrivedCount.toString()}
                color="green"
                iconBg
                noCaption
              />
            </div>
          </div>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default ConstituencyDashboard
