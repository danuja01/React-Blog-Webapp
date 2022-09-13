import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const abortCont = new AbortController();

  useEffect(() => {
    setTimeout(() => {
      //Settimout is not necessary, used for check the functionality of the loading animation
      fetch(url, { signal: abortCont.signal })
        .then((response) => {
          if (!response.ok) {
            throw Error('Could not fetch the data for that resorce');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch abort');
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
      return () => abortCont.abort();
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
