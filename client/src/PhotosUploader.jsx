import axios from 'axios';
import React, { useState } from 'react'

const PhotosUploader = ({addedPhotos, onChange}) => {
    
    const [photoLink, setPhotoLink] = useState("");
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post("/upload-by-link", {
          link: photoLink,
        });
        onChange((prev) => {
          return [...prev, filename];
        });
        setPhotoLink("");
      }
    
      function uploadPhoto(ev) {
        const files = ev.target.files;
        console.log({ files });
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append("photos", files[i]);
        }
    
        axios
          .post("/upload", data, {
            headers: { "Content-type": "multipart/form-data" },
          })
          .then((response) => {
            const { data: filenames } = response;
            onChange((prev) => {
              return [...prev, ...filenames];
            });
          });
      }
  return (
    <div><div className="flex gap-2">
    <input
      type="text"
      value={photoLink}
      onChange={(e) => setPhotoLink(e.target.value)}
      className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Add using a link ..."
    />
    <button
      type="button"
      onClick={addPhotoByLink}
      className="primary rounded-2xl px-4 whitespace-nowrap"
    >
      Add photo
    </button>
  </div>

  <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-2">
    {addedPhotos.length > 0 &&
      addedPhotos.map((link) => (
        <div className="h-32 flex" key={link}>
          <img
            className="rounded-2xl w-full object-cover"
            
            src={"http://localhost:4000/uploads/" + link}
            alt=""
          />
        </div>
      ))}
    <label
      type="button"
      className="h-32 cursor-pointer flex items-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex gap-1 justify-center"
    >
      <input
        type="file"
        className="hidden"
        multiple
        name=""
        id=""
        onChange={uploadPhoto}
      />
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
    </label>
  </div></div>
  )
}

export default PhotosUploader