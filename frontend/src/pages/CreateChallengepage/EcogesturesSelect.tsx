import { useGetEcogesturesQuery } from "@/generated/graphql-types";
import { Button } from "@/components/ui/button";

function EcogesturesSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const { data, loading, error } = useGetEcogesturesQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  const handleCheckbox = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (!data?.getEcogestures?.ecogestures?.length) {
    return <p>Aucun challenge à selectionner</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.getEcogestures.ecogestures.map((eco) => (
          <div
            key={eco.id}
            className="border rounded p-3 flex flex-col gap-3 items-start bg-gray-50"
          >
            <div className="flex items-center gap-3 w-full">
              {eco.pictureUrl && (
                <img
                  src={eco.pictureUrl}
                  alt={eco.label}
                  className="w-10 h-10 object-contain"
                />
              )}
              <span className="font-semibold text-lg">{eco.label}</span>
            </div>
            <p className="text-sm text-gray-700">{eco.description}</p>
            <ul className="text-xs text-gray-600 list-disc ml-5">
              <li>Niveau 1 : {eco.level1Expectation}</li>
              <li>Niveau 2 : {eco.level2Expectation}</li>
              <li>Niveau 3 : {eco.level3Expectation}</li>
            </ul>
            <Button
              type="button"
              onClick={() => handleCheckbox(eco.id)}
              className={`mt-2 px-4 py-2 rounded font-semibold transition-colors ${
                value.includes(eco.id)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {value.includes(eco.id) ? "✓ Sélectionné" : "Sélectionner"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EcogesturesSelect;