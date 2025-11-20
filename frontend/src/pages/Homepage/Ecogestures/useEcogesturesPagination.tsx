import { useState, useEffect, useCallback } from "react";
import {
  useGetEcogesturesQuery,
  type Ecogesture,
} from "@/generated/graphql-types";

export const useEcogesturesPagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEcogestures, setAllEcogestures] = useState<
    Array<Pick<Ecogesture, "id" | "label" | "pictureUrl">>
  >([]);

  const { data, loading } = useGetEcogesturesQuery({
    variables: {
      input: {
        page: currentPage,
        limit: itemsPerPage,
      },
    },
  });

  useEffect(() => {
    if (data?.getEcogestures.ecogestures) {
      setAllEcogestures((prev) => [
        ...prev,
        // Filter to avoid duplicates when useEffect is triggered
        // (for example by navigating back)
        ...data.getEcogestures.ecogestures.filter(
          (ecogesture) => !prev.some((e) => e.id === ecogesture.id)
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
    totalCount: data?.getEcogestures.totalCount ?? 0,
    loadMore,
    hasMore: allEcogestures.length < (data?.getEcogestures.totalCount ?? 0),
  };
};
