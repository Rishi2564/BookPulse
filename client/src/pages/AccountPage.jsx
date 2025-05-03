import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { ready, user } = useContext(UserContext);
let {subpage} =useParams();
  if(subpage=== undefined){
    subpage='profile';
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  
  
  function linkClasses(type=null){
     let classes= 'py-2 px-6'
     if(type===subpage ){
      classes +=' primary text-white rounded-full';
     }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex mt-30 gap-4 justify-center mb-8">
        <Link className={linkClasses('profile')} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage==='profile'&&(
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email}) <br /> <br />
        <button className="primary px-5 py-1 rounded-full">Logout</button>
      </div>)}
    </div>
  );
};

export default AccountPage;
