import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const Query = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch("http://localhost:8000/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="query-page">
          <h1>General Information Request</h1>
          <div className="form-container">
              <div className="input-group">
                <textarea
                  placeholder="Enter your request here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></textarea>
              </div>
              <button onClick={handleSearch}>Submit Request</button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
            {searchResults &&
              searchResults.map((result, index) => (
                <div key={index} style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}>
                  <p>{result}</p>
                  <hr />
                </div>
              ))}
          </div>
      <Footer />
    </div>
  );
};

export default Query;
