import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from '../../global-utils'
import FormikControl from '../../components/formik-components/FormikControl'
import {
  GET_BISHOPS,
  GET_BISHOP_TOWNS,
  GET_BISHOP_CAMPUSES,
  BISHOP_MEMBER_DROPDOWN,
} from '../../queries/ListQueries'
import { CREATE_TOWN_MUTATION, CREATE_CAMPUS_MUTATION } from './CreateMutations'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { ChurchContext } from '../../contexts/ChurchContext'
import PlusSign from '../../components/buttons/PlusSign'
import MinusSign from '../../components/buttons/MinusSign'
import { BISHOP_CENTRE_DROPDOWN } from '../../components/formik-components/ComboboxQueries'
import { NEW_CAMPUS_LEADER, NEW_TOWN_LEADER } from './MakeLeaderMutations'

function CreateTownCampus() {
  const { church, bishopId, setTownId, setCampusId, setBishopId } = useContext(
    ChurchContext
  )

  const history = useHistory()

  const initialValues = {
    campusTownName: '',
    leaderId: '',
    bishopSelect: '',
    centres: [''],
  }

  const validationSchema = Yup.object({
    campusTownName: Yup.string().required(
      `${capitalise(church.church)} Name is a required field`
    ),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    centres: Yup.array().of(
      Yup.string().required('Please pick a centre from the dropdown')
    ),
  })

  const [NewTownLeader] = useMutation(NEW_TOWN_LEADER)
  const [CreateTown] = useMutation(CREATE_TOWN_MUTATION, {
    refetchQueries: [{ query: GET_BISHOP_TOWNS, variables: { id: bishopId } }],
    onCompleted: (newTownData) => {
      setTownId(newTownData.CreateTown.id)
      history.push(`/${church.church}/displaydetails`)
    },
  })

  const [NewCampusLeader] = useMutation(NEW_CAMPUS_LEADER)
  const [CreateCampus] = useMutation(CREATE_CAMPUS_MUTATION, {
    refetchQueries: [
      { query: GET_BISHOP_CAMPUSES, variables: { id: bishopId } },
    ],
  })

  const {
    data: bishopsData,
    loading: bishopsLoading,
    error: bishopsError,
  } = useQuery(GET_BISHOPS)

  if (bishopsError) {
    return <ErrorScreen />
  } else if (bishopsLoading) {
    return <LoadingScreen />
  } else if (
    (bishopsData && church.church === 'campus') ||
    (bishopsData && church.church === 'town')
  ) {
    const bishopTownOptions = makeSelectOptions(
      bishopsData.members.filter(
        (bishop) => bishop.townBishop.length > 0 && bishop
      )
    )
    const bishopCampusOptions = makeSelectOptions(
      bishopsData.members.filter(
        (bishop) => bishop.campusBishop.length > 0 && bishop
      )
    )

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setBishopId(values.bishopSelect)

      if (church.church === 'town') {
        CreateTown({
          variables: {
            townName: values.campusTownName,
            leaderId: values.leaderId,
            bishopId: values.bishopSelect,
            centreIds: values.centres,
          },
        })
          .then((res) => {
            NewTownLeader({
              variables: {
                leaderId: values.leaderId,
                townId: res.data.CreateTown.id,
              },
            }).catch((error) => alert('There was an error', error))
            setTownId(res.data.CreateTown.id)
            history.push(`/${church.church}/displaydetails`)
          })
          .catch((error) => alert('There was an error', error))
      } else if (church.church === 'campus') {
        CreateCampus({
          variables: {
            campusName: values.campusTownName,
            leaderId: values.leaderId,
            bishopId: values.bishopSelect,
            centreIds: values.centres,
          },
        })
          .then((res) => {
            NewCampusLeader({
              variables: {
                leaderId: values.leaderId,
                campusId: res.data.CreateCampus.id,
              },
            }).catch((error) => alert('There was an error', error))
            setCampusId(res.data.CreateCampus.id)
            history.push(`/${church.church}/displaydetails`)
          })
          .catch((error) => alert('There was an error', error))
      }

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
    }

    return (
      <>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">{`Start a New ${capitalise(
                church.church
              )}`}</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-2">
                        <div className="col-8">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="bishopSelect"
                            options={
                              church.church === 'campus'
                                ? bishopCampusOptions
                                : bishopTownOptions
                            }
                            defaultOption="Select a Bishop"
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="campusTownName"
                            placeholder={`Name of ${capitalise(church.church)}`}
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            placeholder="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={BISHOP_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={bishopId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="bishopMemberDropdown"
                            aria-describedby="Bishop Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </div>
                      </div>

                      <small className="pt-2">
                        {`Select any ${
                          church.church === 'town' ? 'Centres' : 'centres'
                        } that are being moved to this ${capitalise(
                          church.church
                        )}`}
                      </small>
                      <FieldArray name="centres">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps
                          const { values } = form
                          const { centres } = values

                          return (
                            <div>
                              {centres.map((centres, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox2"
                                      name={`centres[${index}]`}
                                      placeholder="Centre Name"
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={BISHOP_CENTRE_DROPDOWN}
                                      queryVariable1="id"
                                      variable1={bishopId}
                                      queryVariable2="nameSearch"
                                      suggestionText="name"
                                      suggestionID="id"
                                      dataset="bishopCentreDropdown"
                                      aria-describedby="Centre Name"
                                      className="form-control"
                                      error={
                                        formik.errors.centres &&
                                        formik.errors.centres[index]
                                      }
                                    />
                                  </div>
                                  <div className="col d-flex">
                                    <PlusSign onClick={() => push()} />
                                    {index > 0 && (
                                      <MinusSign
                                        onClick={() => remove(index)}
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }}
                      </FieldArray>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-5 py-3"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </>
    )
  }
}

export default CreateTownCampus
