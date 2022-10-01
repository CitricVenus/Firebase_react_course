import { useState, useEffect } from "react";
//Investigar bien como funciona los hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  //estado para el indicador de loading
  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    //investigar abortcontroller
    const controller = new AbortController();
    const fetchData = async () => {
      //se llama el loading antes de hacer fetch y se hace true de que esta cargando
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        //se llama al loading despues del fetch y se hace false de que ya cargó
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setIsPending(false);
          setError(error);
          console.log(error.message);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, isPending, error };
};
