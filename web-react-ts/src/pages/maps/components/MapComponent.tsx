import LoadingScreen from 'components/base-component/LoadingScreen'
import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { useState } from 'react'
import '../Map.css'
import { Button, Offcanvas } from 'react-bootstrap'
import { IoChevronUp } from 'react-icons/io5'
import { GooglePlaces, MemberPlaces } from '../Places'
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

type LibrariesOptions = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[]

type MapComponentProps = {
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  placesSearch: LazyQueryExecFunction<any, OperationVariables>
}

const MapComponent = (props: MapComponentProps) => {
  const [libraries] = useState<LibrariesOptions>(['places'])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
    libraries,
  })

  const [show, setShow] = useState(false)
  const [office, setOffice] = useState<LatLngLiteral>()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { currentUser } = useContext(MemberContext)

  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 5.655949, lng: -0.167033 }),
    []
  )
  const options = useMemo<MapOptions>(
    () => ({
      mapId: 'b0ab33f7a0fc53d5',
      disableDefaultUI: true,
      clickableIcons: true,
      mapTypeId: 'hybrid',
    }),
    []
  )
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <div className="map">
      <GoogleMap
        zoom={20}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {office && (
          <>
            <Marker position={office} />
          </>
        )}
      </GoogleMap>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className="offcanvas"
      >
        <Offcanvas.Header closeButton className="dark">
          <Offcanvas.Title>Maps Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="dark">
          <div>Search for a place</div>
          <GooglePlaces
            handleClose={handleClose}
            setOffice={(position) => {
              setOffice(position)

              props.placesSearch({
                variables: {
                  id: currentUser.id,
                  latitude: position.lat,
                  longitude: position.lng,
                },
              })

              mapRef.current?.panTo(position)
            }}
            {...props}
          />

          <div>Search our FLC Database</div>
          <MemberPlaces
            handleClose={handleClose}
            setOffice={async (position) => {
              setOffice(position)

              const response = await props.placesSearch({
                variables: {
                  id: currentUser.id,
                  latitude: position.lat,
                  longitude: position.lng,
                },
              })

              mapRef.current?.panTo(position)
            }}
            {...props}
          />
          <Button
            onClick={() => {
              window.navigator.geolocation.getCurrentPosition((position) => {
                mapRef.current?.panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                })
              })

              handleClose()
            }}
          >
            My location
          </Button>
          <Button
            onClick={async () => {
              const position = { lat: 5.655949, lng: -0.167033 }

              const response = await props.placesSearch({
                variables: {
                  id: currentUser.id,
                  latitude: position.lat,
                  longitude: position.lng,
                },
              })

              mapRef.current?.panTo(position)

              handleClose()
            }}
          >
            First Love Center
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="floating-action">
        <Button
          variant="primary"
          onClick={handleShow}
          className="rounded-circle"
        >
          <IoChevronUp />
        </Button>
      </div>
    </div>
  )
}

export default MapComponent
