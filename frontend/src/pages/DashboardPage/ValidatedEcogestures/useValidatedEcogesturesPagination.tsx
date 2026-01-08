import { useState, useEffect, useCallback } from "react";
import {
  useGetValidatedEcogesturesQuery,
  type UserEcogesture,
  type Ecogesture,
} from "@/generated/graphql-types";

export const useValidatedEcogesturesPagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEcogestures, setAllEcogestures] = useState<
    Array<
      Pick<UserEcogesture, "id" | "level_validated" | "validated_at"> & {
        ecogesture: Pick<Ecogesture, "id" | "label" | "pictureUrl">;
      }
    >
  >([]);

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
