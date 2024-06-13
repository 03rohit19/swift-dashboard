// importing react icons used in the dashboard
import { FaSearch, FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./dashBoard.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [sortConfig, setSortConfig] = useState({
    key: localStorage.getItem("sortKey") || null,
    direction: localStorage.getItem("sortDirection") || "descending",
  });
  const [user, setUser] = useState([]);
  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
    fetchData();
    setCurrentPage(Number(localStorage.getItem("currentPage")) || 1);
    setItemsPerPage(Number(localStorage.getItem("itemsPerPage")) || 10);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("sortKey", sortConfig.key);
    localStorage.setItem("sortDirection", sortConfig.direction);
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage);
  }, [itemsPerPage]);

  // Fetch user data
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

  // Fetch comments data
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments");
      const user = await res.json();
      setData(user);
      setFilteredData(user);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search term change
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, data]);

  // Handle sort term change
  useEffect(() => {
    if (sortConfig.key !== null) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig]);

  // Handle search logic
  const handleSearch = () => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.postId.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle sort logic
  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="min-h-full ">
        {/* Navigation bar */}
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
              <div className="block ">
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
                      <Link to="/profile">
                        {" "}
                        <div className="ml-3 mt-1">
                          <div className="text-sm md:text-base font-medium leading-none text-white">
                            {user.name}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Main content */}
        <div className="bg-white  flex flex-wrap justify-between p-4 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:space-x-4 p-4">
            <select className="border border-gray-300 rounded p-2 mb-2 md:mb-0">
              <option value="">Sort by Post ID</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select className="border border-gray-300 rounded p-2 mb-2 md:mb-0">
              <option value="">Sort by Name</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select className="border border-gray-300 rounded p-2">
              <option value="">Sort by Email</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="p-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, ID, email"
                className="border border-gray-300 rounded p-2 w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container border mx-auto rounded-lg shadow-lg">
        {/* Table content */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-700 p-4">
              <tr className="p-4">
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("postId")}
                >
                  POST ID
                  {sortConfig.key === "postId" ? (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "▲" : "▼"}
                    </span>
                  ) : (
                    <span className="ml-1">▼</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                  {sortConfig.key === "name" ? (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "▲" : "▼"}
                    </span>
                  ) : (
                    <span className="ml-1">▼</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email
                  {sortConfig.key === "email" ? (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "▲" : "▼"}
                    </span>
                  ) : (
                    <span className="ml-1">▼</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Comment
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {displayedData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.postId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {truncateText(item.body, 40)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 ">
        {/* Pagination controls */}
        <span className="text-[16px] text-gray-700 mr-4 mt-2 font-semibold ">
          {startIndex + 1}-{endIndex} of {filteredData.length} items
        </span>
        <div className="flex items-center">
          <button
            onClick={handlePreviousPage}
            className={`mx-1 px-3 py-2 rounded-md  text-black ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={handleNextPage}
            className={`mx-1 ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
          <select
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            value={itemsPerPage}
            className="ml-2 p-2 mr-7 border border-gray-300 rounded-md"
          >
            <option value={10}>10 /page</option>
            <option value={20}>20 /page</option>
            <option value={30}>30 /page</option>
            <option value={40}>40 /page</option>
            <option value={50}>50 /page</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
