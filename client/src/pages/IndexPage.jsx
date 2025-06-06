import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces]= useState([]);
  useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces(response.data);
    })
  },[]);
  return (
  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
     {places.length > 0 && places.map(place=>(
      <Link to={'/place/'+place._id} className="">
        <div  className="mb-2 bg-gray-500 rounded-2xl flex">
          {place.photos?.[0]&&(
          <img className="rounded-2xl object-cover aspect-square" src={import.meta.env.VITE_API_BASE_URL+'/uploads/'+place.photos?.[0]} alt="" />
        )}
        </div>
        
        
       <h2 className=" font-bold truncate">{place.title}</h2>
       <h3 className="font-medium">{place.address}</h3> 
       <div className="mt-1">
       <span><b>&#8377;</b>  {place.price}</span> per night
       </div>
      </Link>
     ))}
  </div>
)};

export default IndexPage;
