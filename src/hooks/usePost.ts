import { useEffect, useState } from "react";
import { postDatatoApi } from "../services/postData";

interface PostResult {
  loading: boolean;
  error: string | null;
}

const usePost = <T>(url: string, body: T): PostResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      try {
        postDatatoApi<T>(url, body);
      } catch (err) {
        setError((err as Error).message || "Error posting data");
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [url]);

  return { loading, error };
};

export default usePost;
