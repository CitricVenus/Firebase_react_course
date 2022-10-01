import { useState, useEffect ,useCallback} from "react";
//investogar sobre useEffect y useCallback
import { useFetch } from '../hooks/useFetch'
//styles
import "./tripList.css";
//useEffect nos deja correr una parte del codigo cuando nosotros lo requeramos
export default function TripList() {
  //const [trips, setTrips] = useState([]);
  const [url, setUrl] = useState("http://localhost:3000/trips");
  const {data :trips,isPending,error} = useFetch(url)

  

  //se  pone el link de donde se av a sacar los datos (API)

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
       {/*Mensaje de carga de los datos*/ }
      {isPending && <div>Loading trips...</div>}
      {error && <div>{error}</div>}
      <ul>
        {/*Si trips no es null, se muestra el mapeo*/ }
        {trips && trips.map((trip) => (
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
        {/*Se usa un query para poder filtrar*/}
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All trips
        </button>
      </div>
    </div>
  );
}
