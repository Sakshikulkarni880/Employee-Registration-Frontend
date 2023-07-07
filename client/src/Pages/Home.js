import React, { Component, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRef } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  //fetching all user and paginated user
  useEffect(() => {
    getAllUser();
    currentPage.current = 1;
    getPaginatedUsers();
  }, []);

  //fetching all user
  const getAllUser = () => {
    const query = searchQuery.trim(); // Trimimng space
    //fetching data as per the query from search bar
    fetch(`http://localhost:5000/getAllUser?query=${query}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  //pagination => paginated users per subject after clicking to next page
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }
  
  //changing limit of Entries in a page in pagination
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedUsers();
    console.log(limit);
  }

  //fetching paginated users as per query from api
  function getPaginatedUsers() {
    const query = searchQuery.trim();

    fetch(
      `http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}&query=${query}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }
  return (
    <>
      <br></br>
      <div className="home-table" style={{ width: "auto" }}>
        <h3 style={{ textAlign: "center" }}>Registered Employee Listing</h3>
        <br></br>
        //search bar
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(e) => {
            e.preventDefault();
            getAllUser();
          }}
        >
          <div className="input-group">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: 120 }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <br></br>
        //Fetched all users data from database
        <div className="row justify-content-center">
          <table style={{ width: 500, paddingBottom: 50 }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
            {data && data.length > 0 ? (
              data.map((i) => (
                <tr key={i._id}>
                  <td>{i.fname}</td>
                  <td>{i.email}</td>
                  <td>{i.gender}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </table>
        </div>
        <br></br>

        //Pagination of the data
        <div className="row justify-content-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            forcePage={currentPage.current - 1}
          />
        </div>

        //setting limit of entries or rows per page
        <div className="d-grid gap-3 text-center">
          <div className="input-group">
            <input
              placeholder="Limit"
              onChange={(e) => setLimit(e.target.value)}
              style={{ width: 80, height: 36 }}
            />
            <button
              onClick={changeLimit}
              className="btn btn-success"
              style={{ width: 100, height: 36 }}
            >
              Set Limit
            </button>
          </div>
        </div>
        <br></br>
      </div>
    </>
  );
}
