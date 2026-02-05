import { useState } from "react";
import { useGetEcogesturesQuery } from "@/generated/graphql-types";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

const ecogestureDetailStyle = {
  backgroundColor: "white !important",
  borderColor: "#e5e7eb !important",
};

function EcogesturesSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const { data, loading, error } = useGetEcogesturesQuery();
  const [selectedId, setSelectedId] = useState<string>("");
  const [openCombobox, setOpenCombobox] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const maxSelectionToShow = 4;

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  const ecogestures = data?.getEcogestures?.ecogestures ?? [];
  const selectedEco = ecogestures.find(
    (eco) => eco.id.toString() === selectedId,
  );

  const currentIndex = ecogestures.findIndex(
    (eco) => eco.id.toString() === selectedId,
  );
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < ecogestures.length - 1;
  const goPrev = () => {
    if (canGoPrev) setSelectedId(ecogestures[currentIndex - 1].id.toString());
  };
  const goNext = () => {
    if (canGoNext) setSelectedId(ecogestures[currentIndex + 1].id.toString());
  };

  const handleAdd = () => {
    if (selectedId && !value.includes(selectedId)) {
      onChange([...value, selectedId]);
    }
  };
  const handleRemove = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:max-w-4xl md:mx-auto">
      <div className="w-full md:w-1/2">
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCombobox}
              className="w-full justify-between mb-2 border border-black text-black bg-white"
              type="button"
              onClick={() => setOpenCombobox((prev) => !prev)}
            >
              {selectedId
                ? ecogestures.find((eco) => eco.id.toString() === selectedId)
                    ?.label
                : "Sélectionner un écogeste..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {ecogestures.map((eco) => (
                    <CommandItem
                      key={eco.id}
                      value={eco.id.toString()}
                      onSelect={(currentValue: string) => {
                        if (currentValue) {
                          setSelectedId(currentValue);
                          setOpenCombobox(false);
                        }
                      }}
                    >
                      {eco.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedId === eco.id.toString()
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Détail de l'écogeste sélectionné */}
        {selectedEco && (
          <div
            className="border rounded bg-white p-3 mb-2 w-full max-w-full break-words relative ecogesture-detail-card"
            style={ecogestureDetailStyle}
          >
            {/* Flèches de navigation */}
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Précédent"
            >
              <ArrowLeft
                size={20}
                className={canGoPrev ? "text-gray-700" : "text-gray-300"}
              />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Suivant"
            >
              <ArrowRight
                size={20}
                className={canGoNext ? "text-gray-700" : "text-gray-300"}
              />
            </button>
            <div className="flex items-center gap-3 mb-2">
              {selectedEco.pictureUrl && (
                <img
                  src={selectedEco.pictureUrl}
                  alt={selectedEco.label}
                  className="w-10 h-10 object-contain"
                />
              )}
              <span className="font-semibold text-lg text-black">
                {selectedEco.label}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              {selectedEco.description}
            </p>
            <ul className="text-xs text-gray-600 list-disc ml-5">
              <li>Niveau 1 : {selectedEco.level1Expectation}</li>
              <li>Niveau 2 : {selectedEco.level2Expectation}</li>
              <li>Niveau 3 : {selectedEco.level3Expectation}</li>
            </ul>
            <div className="flex justify-center mt-3">
              <Button
                type="button"
                disabled={value.includes(selectedEco.id.toString())}
                onClick={handleAdd}
              >
                {value.includes(selectedEco.id.toString())
                  ? "Déjà sélectionné"
                  : "Ajouter à la liste"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Liste des écogestes sélectionnés */}
      <div className="w-full md:w-1/2 ">
        <div
          className="w-full mb-2 p-3 bg-white border rounded-lg shadow-sm"
          style={ecogestureDetailStyle}
        >
          <div className="text-center font-semibold text-black">
            Votre sélection
          </div>
        </div>
        {value.length > 0 && (
          <ul
            className="flex flex-col gap-2 bg-white p-2 rounded"
            style={ecogestureDetailStyle}
          >
            {(showAll ? value : value.slice(0, maxSelectionToShow)).map(
              (ecoId) => {
                const eco = ecogestures.find((e) => e.id.toString() === ecoId);
                if (!eco) return null;
                return (
                  <li
                    key={ecoId}
                    className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2 text-black hover:bg-gray-200"
                  >
                    <span className="flex-1 text-black text-sm">
                      {eco.label}
                    </span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemove(ecoId)}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </li>
                );
              },
            )}
          </ul>
        )}
        {value.length > maxSelectionToShow && (
          <div className="flex justify-center mt-2">
            <Button
              size="sm"
              type="button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Voir moins"
                : `Voir plus (${value.length - maxSelectionToShow})`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EcogesturesSelect;
