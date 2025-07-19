import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface ReactKakaoMapProps {
  lat: number
  lon: number
  style?: React.CSSProperties
}

const ReactKakaoMap = ({ lat, lon, style }: ReactKakaoMapProps) => {
  return (
    <Map
      center={{ lat, lng: lon }}
      style={style ?? { width: '100%', height: '300px', borderRadius: 12, marginBottom: 24 }}
      level={7}
    >
      <MapMarker position={{ lat, lng: lon }} />
    </Map>
  )
}

export default ReactKakaoMap
