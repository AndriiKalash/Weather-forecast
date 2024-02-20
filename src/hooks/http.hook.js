import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState('waiting');

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'aplication/json' }
    ) => {
      setLoading(true);
      setProcess('loading');

      try {
        const res = await fetch(url, { method, body, headers });
        if (!res.ok)
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        const data = await res.json();
        setLoading(false);
        // setProcess('confirmed'); set to the component when state with data will full
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        setProcess('error');
        throw e;
      }
    },
    []
  );

  return { loading, request, error, process, setProcess };
};
