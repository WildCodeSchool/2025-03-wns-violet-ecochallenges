import { useGetEcogesturesQuery } from "@/generated/graphql-types";

function EcogesturesSelect({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  const { data, loading, error } = useGetEcogesturesQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  return (
    <select name="ecogesture" value={value} onChange={onChange} className="w-full border rounded px-3 py-2">
      <option value="">Sélectionnez un écogeste</option>
      {data?.getEcogestures.ecogestures.map((eco) => (
        <option key={eco.id} value={eco.id}>
          {eco.label}
        </option>
      ))}
    </select>
  );
}

export default EcogesturesSelect;