import { useGetEcogesturesQuery } from "@/generated/graphql-types";

const Ecogestures = () => {
  const { data, loading, error } = useGetEcogesturesQuery();

  console.log(data);

  return (
    <div>
      <h2>Ecogestures Component</h2>
      {/* Add your ecogestures content here */}
    </div>
  );
};

export default Ecogestures;
