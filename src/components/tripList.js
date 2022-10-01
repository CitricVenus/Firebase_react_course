import { useState, useEffect } from "react";
//styles
import "./tripList.css";
//useEffect nos deja correr una parte del codigo cuando nosotros lo requeramos
export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [url, setUrl] = useState("http://localhost:3000/trips");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setTrips(json));
  }, [url]);

  console.log(trips);

  //se  pone el link de donde se av a sacar los datos (API)

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}
        >
          European trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All trips
        </button>
      </div>
    </div>
  );
}
