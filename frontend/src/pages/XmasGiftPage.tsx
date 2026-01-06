import { TypographyH1 } from "@/components/ui/typographyH1";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import {
  CLEAN_ECOGESTURES,
  SEED_ECOGESTURES,
} from "@/graphql/mutations/ecogestures";
import { useState } from "react";
import type { Ecogesture } from "@/generated/graphql-types";

const XmasGiftPage = () => {
  const navigate = useNavigate();
  const [seedEcogestures, { loading }] = useMutation(SEED_ECOGESTURES);
  const [cleanEcogestures, { loading: cleaning }] =
    useMutation(CLEAN_ECOGESTURES);
  const [message, setMessage] = useState<string>("");
  const [ecogesture, setEcogesture] = useState<Ecogesture[] | null>(null);

  const handleSeedEcogestures = async () => {
    try {
      setMessage("");
      const result = await seedEcogestures();
      const data = result.data?.seedEcogestures || [];
      setEcogesture(data);
      setMessage(`✅ Seeding réussi ! ${data.length} écogestes ajoutés.`);
    } catch (error) {
      console.error("Erreur lors du seeding:", error);
      setMessage("❌ Erreur lors du seeding des écogestes");
    }
  };

  const handleCleanEcogestures = async () => {
    try {
      setMessage("");
      await cleanEcogestures();
      setEcogesture(null);
      setMessage("✅ Nettoyage réussi ! Tous les écogestes ont été supprimés.");
    } catch (error) {
      console.error("Erreur lors du nettoyage:", error);
      setMessage("❌ Erreur lors du nettoyage des écogestes");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-5 text-white">
      <TypographyH1>Ici on sème des écogestes !</TypographyH1>
      <img
        src="/xmas-gift.png"
        alt="Crew Planet - Illustration challenge écologique"
      />
      <div className="flex gap-4 mt-4">
        <Button
          onClick={handleSeedEcogestures}
          variant="default"
          disabled={loading || !!ecogesture}
        >
          {loading ? "Seeding en cours..." : "Lancer le seeding des écogestes"}
        </Button>
        <Button
          onClick={handleCleanEcogestures}
          variant="destructive"
          disabled={cleaning || !ecogesture}
        >
          {loading ? "Nettoyage en cours..." : "Nettoyer les écogestes semés"}
        </Button>
      </div>
      <div className="mt-4">
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="outline"
        >
          Retour à l'accueil
        </Button>
      </div>
      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
    </div>
  );
};

export default XmasGiftPage;
