import React from 'react'

const PlaceImg = ({place, index=0, className=null}) => {
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className= 'object-cover';
    }
  return (
    <img className={className} src={import.meta.env.VITE_API_BASE_URL+"/uploads/" + place.photos[index]}
                alt=""
              />
  )
   
}

export default PlaceImg