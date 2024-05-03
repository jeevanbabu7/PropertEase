import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder'

let DefaulIcon = L.icon ({
    iconUrl : icon, 
    shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaulIcon




// Example usage
// const address = "1600 Amphitheatre Parkway, Mountain View, CA";
// getCoordinates(address);

const GeoCoderMarker = ({address}) => {

    const map = useMap()
    const [position, setPosition] = useState([30, 70])
    const [err,setErr] = useState(false);
    function getCoordinates(address) {
        const base_url = "https://nominatim.openstreetmap.org/search";
        const params = {
            q: address,
            format: "json",
            limit: 1
        };
        const url = new URL(base_url);
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    setPosition([latitude,longitude])
                } else {
                    setErr("No results found.");
                }
            })
            .catch(error => {
                setErr("There was a problem with the request:", error);
            });
    }
    useEffect(() => {
        getCoordinates(address)
    }, [address]);
    

  return (
    <Marker position={position} icon={DefaulIcon}>
        <Popup/>
    </Marker>
  )
}

export default GeoCoderMarker