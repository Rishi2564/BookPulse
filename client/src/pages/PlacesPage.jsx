import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(ev){
    ev.preventDefault();
    const {data: filename} =await axios.post('/upload-by-link',{link:photoLink});
    setaddedPhotos(prev=>{
      return [...prev,filename];
    });
    setPhotoLink("");

  }
  
  

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex primary gap-1 text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new places
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form action="" className="mx-28">
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title, for example: My Lovely Apartment"
            />

            {preInput("Address", "Address to your place")}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Address"
            />

            {preInput("Photos", "More = better")}
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add using a link ..."
              />
              <button
                type="button" onClick={addPhotoByLink}
                className="primary rounded-2xl px-4 whitespace-nowrap"
              >
                Add photo
              </button>
            </div>
            
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-2">
              {addedPhotos.length>0 && addedPhotos.map(link=>(
                <div>
                  {link}
                </div>
              ))}
              <button
                type="button"
                className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex gap-1 justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </button>
            </div>

            {preInput(
              "Description",
              "Description for your place, should be short and catchy"
            )}
            <textarea
              rows={9}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {preInput("Perks", "Select all the perks of your place here")}
            <Perks selected={perks} onChange={setPerks} />
            {preInput("Extra Info", "house rules, etc")}

            <textarea value={extraInfo} onChange={setExtraInfo} rows={6} />
            {preInput(
              "Check in&out times",
              "add check in and out time, remember to have some window for cleaning the room between the guests"
            )}

            <div className="grid sm:grid-cols-3 gap-2">
              <div className="">
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="12:00"
                  className="mt-2"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="11:00"
                  className="mt-2"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            <button className="primary prim py-2 my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
