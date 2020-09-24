import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (url) => {
    setLoading(true);

    try {
      const responce = await fetch(url);
      const res = await responce.json();
      if (!res) {
        throw new Error("not found");
      }
      setLoading(false);
      return res;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e.message;
    }
  }, []);

  return { loading, request, error };
};
