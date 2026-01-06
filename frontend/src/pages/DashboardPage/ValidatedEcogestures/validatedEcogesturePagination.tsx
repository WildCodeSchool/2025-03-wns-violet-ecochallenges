import { useState, useEffect, useCallback } from "react";
import { useGetValidatedEcogesturesQuery } from "@/generated/graphql-types";

export const useValidatedEcogesturesPagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEcogestures, setAllEcogestures] = useState<any[]>([]);

  const { data, loading } = useGetValidatedEcogesturesQuery({
    variables: {
      input: {
        page: currentPage,
        limit: itemsPerPage,
      },
    },
  });

  useEffect(() => {
    if (data?.getValidatedEcogestures.userEcogestures) {
      setAllEcogestures((prev) => [
        ...prev,
        ...data.getValidatedEcogestures.userEcogestures.filter(
          (userEcogesture) => !prev.some((e) => e.id === userEcogesture.id)
        ),
      ]);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  return {
    allEcogestures,
    loading,
    totalCount: data?.getValidatedEcogestures.totalCount ?? 0,
    loadMore,
    hasMore:
      allEcogestures.length < (data?.getValidatedEcogestures.totalCount ?? 0),
  };
};
