"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchUserList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    try {
      axios({
        method: "GET",
        url: `/api/users?page=${page}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then(async (res) => {
          console.log(res);
          if (res.data.data.length == 0) {
            setHasMore(false);
          }
          setData((prev) => {
            return [...prev, ...res.data.data];
          });
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
      return () => cancel();
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }, [page]);
  return { loading, error, data, hasMore };
}
