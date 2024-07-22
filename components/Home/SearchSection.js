"use client";
import { useEffect, useState } from "react";
import React from "react";
import InputItem from "../Home/InputItem";
import { SourceContext } from "../../context/SourceContext";
import { useContext } from "react";
import { DestinationContext } from "../../context/DestinationContext";
import CarListOptions from "../../components/Home/CarListOptions";

function SearchSection() {
  const { source, setsource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance ]= useState(null);
  const [showCarlistOptions, setShowCarlistOptions] = useState(false);



  const handleClick = () => {
    calculateDistance();
    setShowCarlistOptions(true);
  }
  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );
    console.log(dist * 0.000621374);
    setDistance(dist * 0.000621374)
  };

  return (
    <div>
      <div className="p-2 md:p-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />

        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
          onClick={handleClick}
          
        >
          Search
        </button>
        {distance != null && <p>Distance: {distance.toFixed(2)}miles</p>}
      </div>
      {showCarlistOptions && <CarListOptions distance={distance}/>} 
    </div>
  );
}
export default SearchSection;
