import { useMutation, useQuery } from '@apollo/client'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  capitalise,
  DECIMAL_NUM_REGEX,
  makeSelectOptions,
  SERVICE_DAY_OPTIONS,
  throwErrorMsg,
  VACATION_OPTIONS,
} from 'global-utils'
import {
  COUNCIL_MEMBER_DROPDOWN,
  GET_COUNCIL_CAMPUSES,
  GET_COUNCIL_TOWNS,
  GET_CAMPUS_BACENTAS,
  GET_TOWN_BACENTAS,
} from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import { MAKE_FELLOWSHIP_INACTIVE } from 'pages/update/CloseChurchMutations'
import { useHistory } from 'react-router'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import './Forms.css'
import LoadingScreen from 'components/base-component/LoadingScreen'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik-components/SubmitButton'

const FellowshipForm = (props) => {
  const { church, clickCard, isOpen, togglePopup, fellowshipId, councilId } =
    useContext(ChurchContext)

  const { theme } = useContext(MemberContext)
  const history = useHistory()

  const { data: townsData, error: townListError } = useQuery(
    GET_COUNCIL_TOWNS,
    {
      variables: { id: councilId },
    }
  )
  const { data: campusesData, error: campusListError } = useQuery(
    GET_COUNCIL_CAMPUSES,
    {
      variables: { id: councilId },
    }
  )
  const [CloseDownFellowship] = useMutation(MAKE_FELLOWSHIP_INACTIVE)

  if (townListError || campusListError) {
    throwErrorMsg(townListError)
    throwErrorMsg(campusListError)
  }

  const validationSchema = Yup.object({
    fellowshipName: Yup.string().required(
      'Fellowship Name is a required field'
    ),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    meetingDay: Yup.string().required('Meeting Day is a required field'),
    vacationStatus: Yup.string().required(
      'Vacation Status is a required field'
    ),
    venueLatitude: Yup.string()
      .required('Please fill in your location info')
      .test('is-decimal', 'Please enter valid coordinates', (value) =>
        (value + '').match(DECIMAL_NUM_REGEX)
      ),
    venueLongitude: Yup.string()
      .required('Please fill in your location info')
      .test('is-decimal', 'Please enter valid coordinates', (value) =>
        (value + '').match(DECIMAL_NUM_REGEX)
      ),
  })

  const [positionLoading, setPositionLoading] = useState(false)

  const townOptions = townsData
    ? makeSelectOptions(townsData.councils[0]?.towns)
    : []
  const campusOptions = campusesData
    ? makeSelectOptions(campusesData.councils[0]?.campuses)
    : []
  let townCampusIdVar = props.initialValues.townCampusSelect

  if (!props.initialValues.fellowshipName && !props.newFellowship) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container>
        <HeadingPrimary>{props.title}</HeadingPrimary>
        <HeadingSecondary>
          {props.initialValues.fellowshipName}
        </HeadingSecondary>
      </Container>
      <Formik
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container className="py-4">
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  {/* <!-- Basic Info Div --> */}
                  <Col className="mb-2">
                    <Row className="form-row">
                      <RoleView
                        roles={['adminCouncil', 'adminCampus', 'adminTown']}
                      >
                        <Col>
                          <FormikControl
                            className="form-control"
                            control="select"
                            label={`${capitalise(church.church)}`}
                            name="townCampusSelect"
                            options={
                              church.church === 'town'
                                ? townOptions
                                : campusOptions
                            }
                            onChange={(e) => {
                              formik.setFieldValue(
                                'townCampusSelect',
                                e.target.value
                              )
                              townCampusIdVar = e.target.value
                            }}
                            defaultOption={`Select a ${capitalise(
                              church.church
                            )}`}
                          />
                          <FormikControl
                            className="form-control"
                            control="selectWithQuery"
                            name="bacentaSelect"
                            label="Bacenta"
                            optionsQuery={
                              church.church === 'town'
                                ? GET_TOWN_BACENTAS
                                : GET_CAMPUS_BACENTAS
                            }
                            queryVariable="id"
                            dataset="bacentas"
                            varValue={
                              townCampusIdVar ||
                              props.initialValues.townCampusSelect
                            }
                            defaultOption="Select a Bacenta"
                          />
                        </Col>
                      </RoleView>
                    </Row>

                    <Row className="form-row">
                      <RoleView
                        roles={['adminCouncil', 'adminCampus', 'adminTown']}
                      >
                        <Col sm={12}>
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="fellowshipName"
                            label="Name of Fellowship"
                            placeholder="Name of Fellowship"
                          />
                        </Col>

                        <Col sm={12}>
                          <FormikControl
                            className="form-control"
                            control="select"
                            label="Meeting Day"
                            name="meetingDay"
                            options={SERVICE_DAY_OPTIONS}
                            defaultOption="Pick a Service Day"
                          />
                        </Col>
                        <Col sm={12}>
                          <FormikControl
                            className="form-control"
                            control="select"
                            label="Vacation Status"
                            name="vacationStatus"
                            options={VACATION_OPTIONS}
                            defaultOption="Set Fellowship Mode"
                          />
                        </Col>
                      </RoleView>
                      <RoleView
                        roles={[
                          'adminFederal',
                          'adminCouncil',
                          'adminCampus',
                          'adminTown',
                        ]}
                      >
                        <Col sm={12}>
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            label="Fellowship Leader"
                            initialValue={props.initialValues.leaderName}
                            placeholder="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={COUNCIL_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={councilId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="councilMemberDropdown"
                            aria-describedby="Council Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </Col>
                      </RoleView>
                    </Row>
                    <small className="text-muted">
                      Enter The Coordinates for the Service Venue
                    </small>

                    <Row className="row-cols-2 d-flex align-items-center">
                      <Col>
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="venueLatitude"
                          placeholder="Latitude"
                        />
                      </Col>
                      <Col>
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="venueLongitude"
                          placeholder="Longitude"
                        />
                      </Col>
                      <Col className="my-2">
                        <Button
                          variant="primary"
                          className="btn-loading"
                          disabled={positionLoading}
                          onClick={() => {
                            setPositionLoading(true)

                            window.navigator.geolocation.getCurrentPosition(
                              (position) => {
                                formik.setFieldValue(
                                  'venueLatitude',
                                  position.coords.latitude
                                )
                                formik.setFieldValue(
                                  'venueLongitude',
                                  position.coords.longitude
                                )
                                document
                                  .getElementById('venueLongitude')
                                  .focus()
                                document.getElementById('venueLatitude').focus()
                                document.getElementById('venueLatitude').blur()
                                setPositionLoading(false)
                              }
                            )
                          }}
                        >
                          {positionLoading ? (
                            <>
                              <Spinner animation="grow" size="sm" />
                              <span> Loading</span>
                            </>
                          ) : (
                            'Locate Me Now'
                          )}
                        </Button>
                      </Col>
                    </Row>
                    <small className="text-muted">
                      Click this button if you are currently at your fellowship
                      service venue
                    </small>
                  </Col>
                </Row>
              </div>

              <SubmitButton formik={formik} />
            </Form>
            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this fellowship?
                <Button
                  variant="primary"
                  type="submit"
                  className={`btn-main ${theme}`}
                  onClick={() => {
                    CloseDownFellowship({
                      variables: {
                        fellowshipId: fellowshipId,
                      },
                    })
                      .then((res) => {
                        clickCard(res.data.CloseDownFellowship.bacenta)
                        togglePopup()
                        history.push('/bacenta/displaydetails')
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                        throwErrorMsg(
                          'There was an error closing down this fellowship',
                          error
                        )
                      })
                  }}
                >
                  {`Yes, I'm sure`}
                </Button>
                <Button
                  variant="primary"
                  className={`btn-secondary mt-2 ${theme}`}
                  onClick={togglePopup}
                >
                  No, take me back
                </Button>
              </Popup>
            )}

            {!props.newFellowship && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                Close Down Fellowship
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </>
  )
}

export default FellowshipForm