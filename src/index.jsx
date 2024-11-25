import { useEffect, useState } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 5; // Define maximum number of retries

  useEffect(() => {
    async function fetchData() {
      if (retryCount > maxRetries) {
        setError('Max retry limit reached. Please try again later.');
        setPending(false);
        return;
      }

      setPending(true);
      console.log('Fetching data from:', url); // Debug log

      try {
        const response = await fetch(url, options);
        if (response.status === 429) {
          // Handle rate limiting
          const retryAfter = response.headers.get('Retry-After') || 1; // Get retry-after header if available
          console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
          setRetryCount(retryCount + 1);
          setTimeout(fetchData, retryAfter * 1000); // Retry after specified delay
          return;
        }
        if (!response.ok) throw new Error(response.statusText);
        
        const result = await response.json();
        console.log('Data fetched successfully:', result); // Debug log

        setData(result);
        setPending(false);
        setError(null);
        setRetryCount(0); // Reset retry count on success
      } catch (e) {
        console.error('Error fetching data:', e); // Debug log
        setError(`${e} Some Error Occurred`);
        setPending(false);
      }
    }

    fetchData();
  }, [url, options, retryCount]);

  return [data, error, pending];
}
