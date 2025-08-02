"use client";
import { setDefaults, fromAddress } from "react-geocode";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl/maplibre";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
function PropertyMap({ property }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //Check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);
  if (loading) return <Spinner />;
  if (geocodeError)
    return <div className="text-xl">No location data found</div>;
  return (
    !loading && (
      <div className="w-full h-[500px] relative">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}
          mapLib={import("maplibre-gl")}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 15,
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: "100%", height: 500 }}
        >
          <Marker longitude={lng} latitude={lat} anchor="center">
            <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg" />
          </Marker>
        </Map>
      </div>
    )
  );
}

export default PropertyMap;
