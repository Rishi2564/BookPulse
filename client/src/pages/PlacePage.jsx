import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return "";



  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-20 py-8">
      <h1 className="text-3xl ">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 gap-8  md:grid-cols-[2fr_1fr] mt-8 mb-8">
        <div className="">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <b>Check-in:</b> {place.checkIn} <br />
          <b>Check-out:</b> {place.checkOut} <br />
          <b> Max number of guests: </b> {place.maxGuests}
        </div>
        <div className="">
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 pt-8 border-t">
        <div className="">
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 onClick={()=>setShowAllPhotos(true)} text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
