import React, { useState } from "react";
import axios from "axios";

import Map from "./Map";

/* Styling */
import "./App.scss";

/* Asset */
import arrow from "./asset/arrow.svg";

/* Base URL for the API endpoint*/

const baseURL = "https://geo.ipify.org/api/v1";

function App() {
  const [address, setAddress] = useState("");
  const [adressDetails, setAddressDetails] = useState({
    location: "--",
    timezone: "--",
    ISP: "--",
    lat: "",
    lng: "",
  });

  const [isData, setIsData] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(baseURL, {
        params: {
          apiKey: process.env.REACT_APP_API_KEY,
          ipAddress: address,
        },
      });
      console.log("Response is", response);
      const { isp } = response.data;
      const { country, city, lat, lng, timezone } = response.data.location;

      const results = {
        location: `${city},${country}`,
        timezone: `UTC ${timezone}`,
        lat,
        lng,
        ISP: isp,
      };

      setAddressDetails(results);
      setIsData(true);
    } catch (error) {
      console.log("Error Fetching Data", error);
      setIsData(false);
    }
  };

  return (
    <>
      <div className="app">
        <header
          className="header"
          style={{
            backgroundImage: `url("https://user-images.githubusercontent.com/49617450/92730040-d73a8c00-f390-11ea-994b-506ba30a565b.png")`,
          }}
        >
          <h1 className="main-heading">IP Address Tracker</h1>

          <div className="searchbox">
            <input
              className="searchbox__input"
              type="text"
              name="address"
              placeholder="Search for any IPv4 or IPv6 address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className="searchbox__submit" onClick={handleSubmit}>
              <img src={arrow} alt="Arrow Icon" />
            </button>
          </div>

          <div className="displaybox">
            <div className="displaybox__content">
              <h2 className="sub-heading">IP Address</h2>
              <p className="result">{address === "" ? "--" : address}</p>
            </div>
            <div className="displaybox__content">
              <h2 className="sub-heading">Location</h2>
              <p className="result">{adressDetails.location}</p>
            </div>
            <div className="displaybox__content">
              <h2 className="sub-heading">Timezone</h2>
              <p className="result">{adressDetails.timezone}</p>
            </div>
            <div className="displaybox__content">
              <h2 className="sub-heading">ISP</h2>
              <p className="result">{adressDetails.ISP}</p>
            </div>
          </div>
        </header>

        {isData ? (
          <Map
            lat={adressDetails.lat}
            lng={adressDetails.lng}
            city={adressDetails.location}
          />
        ) : null}
      </div>

      <footer>
        <p className="footer__line">
          Made with{" "}
          <span role="img" aria-label="Heart Emoji">
            ❤️{" "}
          </span>{" "}
          by{" "}
          <a
            href="https://github.com/abhu-A-J"
            target="_blank"
            rel="noopener noreferrer"
          >
            abhu-A-J
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
