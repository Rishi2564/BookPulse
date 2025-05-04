import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className=" inline-flex primary gap-1 text-white py-2 px-6 rounded-full"
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
        <div className="">
          <form action="" className="mx-28">
            <h2 className="text-2xl mt-4 ">Title</h2>
            <p className="text-gray-500 text-sm">
              title for your place, should be short and catchy as in
              advertisement
            </p>
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="title, for example: My Lovely Apartment"
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to your place</p>
            <input
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="address"
            />
            <h2 className="text-2xl mt-4">Photoes</h2>
            <p className="text-gray-500 text-sm">more=better</p>
            <div className="flex gap-2">
              <input
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder={"Add using a link ..."}
              />
              <button className="primary rounded-xl flex px-4">
                Add photo
              </button>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              <button className="border bg-transperant rounded-2xl p-8 text-2xl text-gray-600">
                +
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
