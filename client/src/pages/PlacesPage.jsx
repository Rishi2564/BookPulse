import { Link, useParams } from "react-router-dom";

import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";

const PlacesPage = () => {
  return (
    <div>
      <AccountNav />
     
        <div className="text-center">list of added places  <br />
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
    </div>
  );
};

export default PlacesPage;
