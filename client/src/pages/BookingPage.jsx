import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

const BookingPage = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return '';
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl ">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between">
        <div className="">
          <h2 className="text-2xl mb-4">Your Booking Information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="primary p-6 text-white rounded-2xl items-center">
            <div><b>Total price</b></div>
            <div className="text-3xl">&#8377; {booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
