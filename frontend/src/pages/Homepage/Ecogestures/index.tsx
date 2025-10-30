import { TypographyH2 } from "@/components/ui/typographyH2";
import { useGetEcogesturesQuery } from "@/generated/graphql-types";
import EcogestureCard from "./EcogestureCard";

const Ecogestures = () => {
  const { data, loading, error } = useGetEcogesturesQuery({
    variables: {
      input: {
        page: 1,
        limit: 3,
      },
    },
  });

  const ecogestures = data?.getEcogestures.ecogestures ?? [];

  console.log(data);

  return (
    <div className="max-w-7xl m-auto flex p-4 flex-col items-center gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>
      <div className="flex justify-center gap-12">
        {ecogestures.map((ecogesture) => (
          <EcogestureCard key={ecogesture.id} ecogesture={ecogesture} />
        ))}
      </div>
    </div>
  );
};

export default Ecogestures;
