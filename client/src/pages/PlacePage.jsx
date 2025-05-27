import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

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

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black text-white min-h-screen overflow-y-scroll z-50">
        <div className="p-8 grid gap-4">
          <div className="relative">
            <h2 className="text-3xl mb-4 mr-36">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex gap-1 items-center text-black bg-white hover:bg-gray-700 px-4 py-2 rounded-full fixed right-8 top-8 shadow shadow-black z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>

          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index}>
                <img
                  className=" w-full max-w-3xl mx-auto aspect-square object-cover rounded-lg"
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-20 py-8">
      <h1 className="text-3xl ">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline flex gap-1 my-3"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative ">
        {place?.photos?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden">
            {/* First big photo */}
            <div>
              <img onClick={()=>setShowAllPhotos(true)}
                className="w-full aspect-square object-cover cursor-pointer"
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt="Main"
              />
            </div>

            {/* Second column with two stacked smaller photos */}
            <div className="grid grid-rows-2 gap-2">
              {place.photos[1] && (
                <img onClick={()=>setShowAllPhotos(true)}
                 cursor-pointer  className="w-full aspect-square object-cover cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos[1]}`}
                  alt="Secondary 1"
                />
              )}
              {place.photos[2] && (
                <img onClick={()=>setShowAllPhotos(true)}
                  className="w-full aspect-square object-cover cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                  alt="Secondary 2"
                />
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAllPhotos(true)}
          className="cursor-pointer absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>

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
