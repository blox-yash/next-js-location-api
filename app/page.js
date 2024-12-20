'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [ip, setIP] = useState("");
  const [location, setLocation] = useState(null);

  const getData = async () => {
    try {
      // First get the IP address
      const ipResponse = await axios.get("https://api.ipify.org/?format=json");
      const userIP = ipResponse.data.ip;
      setIP(userIP);

      // Then get the location data using the IP
      const locationResponse = await axios.get(`http://ip-api.com/json/${userIP}`);
      setLocation(locationResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h2>Your Location Details</h2>
      {location && (
        <div>
          <h4>City: {location.city}</h4>
          <h4>Coordinates: {location.lat}, {location.lon}</h4>
        </div>
      )}
    </div>
  );
}