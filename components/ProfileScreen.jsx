import { useEffect, useState } from "react";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const result = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await result.json();
      console.log(data[0]);
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl">
                    <span className="trapezium font-bold">S</span>
                    <span style={{ color: "silver" }}>WIFT</span>
                  </h1>
                </div>
              </div>
              <div className="block md:hidden">
                <div className="ml-4 flex items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  ></button>
                  <div className="relative ml-3">
                    <div className="flex">
                      <button
                        type="button"
                        className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <Link to="/profile">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <FaUser className="text-gray-600" />
                          </div>
                        </Link>
                      </button>
                      <div className="ml-3 mt-2">
                        <div className="text-sm md:text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  ></button>
                  <div className="relative ml-3">
                    <div className="flex">
                      <button
                        type="button"
                        className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <Link to="/profile">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <FaUser className="text-gray-600" />
                          </div>
                        </Link>
                      </button>
                      <div className="ml-3 mt-2">
                        <div className="text-base font-medium leading-none text-white">
                          Tom Cook
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex items-center ml-4  md:ml-14 mt-10 ">
        <Link to="/" className="p-2 md:p-4 text-lg md:text-xl">
          <FaArrowLeft />
        </Link>
        <h1 className="p-2 md:p-4 text-lg md:text-xl">Welcome, {user.name}</h1>
      </div>
      <div className="md:h-[500px] w-full flex items-center justify-center ">
        <div className="border rounded-lg md:h-[420px] w-full p-5 m-4 md:m-14 flex flex-col">
          <div className="flex items-center gap-x-6">
            <img
              className="h-16 w-16 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 mt-5">
            <div className="mt-6 w-full md:w-[40%]">
              <label className="block text-black mb-2">User ID</label>
              <button
                type="button"
                className="w-full border rounded-md bg-gray-100 px-4 py-2.5 text-sm text-left text-black"
              >
                {user.username}
              </button>
            </div>
            <div className="mt-6 w-full md:w-[40%]">
              <label className="block text-black mb-2">Name</label>
              <button
                type="button"
                className="w-full border rounded-md bg-gray-100 px-4 py-2.5 text-sm text-left text-black"
              >
                {user.name}
              </button>
            </div>
            <div className="mt-6 w-full md:w-[40%]">
              <label className="block text-black mb-2">Email ID</label>
              <button
                type="button"
                className="w-full border rounded-md bg-gray-100 px-4 py-2.5 text-sm text-left text-black"
              >
                {user.email}
              </button>
            </div>
            <div className="mt-6 w-full md:w-[40%]">
              <label className="block text-black mb-2">Phone</label>
              <button
                type="button"
                className="w-full border rounded-md bg-gray-100 px-4 py-2.5 text-sm text-left text-black"
              >
                {user.phone}
              </button>
            </div>
            <div className="mt-6 w-full md:w-[40%]">
              <label className="block text-black mb-2">Address</label>
              <button
                type="button"
                className="w-full border rounded-md bg-gray-100 px-4 py-2.5 text-sm text-left text-black"
              >
                {user.address?.street} , {user.address?.city}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
