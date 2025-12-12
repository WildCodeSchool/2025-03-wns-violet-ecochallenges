import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHALLENGE_MUTATION } from "@/graphql/mutations/challenge";
import EcogesturesSelect from "@/pages/CreateChallengepage/EcogesturesSelect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

function NewChallenge({
  selectedEcogestures,
  setSelectedEcogestures,
}: {
  selectedEcogestures: string[];
  setSelectedEcogestures: (value: string[]) => void;
}) {
  const [form, setForm] = useState({
    label: "",
    description: "",
    startingDate: "",
    endingDate: "",
    picture: ""
  });

  const [createChallenge, { loading, error, data }] = useMutation(CHALLENGE_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChallenge({
        variables: {
          data: {
            label: form.label,
            description: form.description,
            startingDate: new Date(form.startingDate).toISOString(),
            endingDate: new Date(form.endingDate).toISOString(),
            picture: form.picture,
            ecogestureIds: selectedEcogestures,
          }
        }
      });
      // Optionnel: reset form or show success
      setForm({ label: "", description: "", startingDate: "", endingDate: "", picture: "" });
      setSelectedEcogestures([]);
    } catch (err) {
      // Optionnel: gérer l'erreur
      console.error("Full error:", err);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header avec preview image */}
        <Card className="overflow-hidden p-0">
          <div
            className="w-full h-48 relative flex items-center justify-center"
            style={{
              backgroundImage: `url(${form.picture || 'https://picsum.photos/600/400'})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <h1 className="relative text-3xl font-bold text-white drop-shadow-lg">
              Créer un nouveau challenge
            </h1>
          </div>
        </Card>

        {/* Informations principales */}
        <Card className="bg-[hsl(var(--secondary-foreground))]">
          <CardHeader>
            <CardTitle className="text-black">Informations du challenge</CardTitle>
            <CardDescription className="text-black">
              Définissez le titre, la description, l'image et la période de votre challenge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne gauche - Informations */}
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label" className="text-black">Titre du challenge *</Label>
                  <Input
                    id="label"
                    name="label"
                    value={form.label}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Défi zéro déchet"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-black">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez votre challenge en quelques mots..."
                    className="bg-white"
                  />
                </div>
                {/* //TODO Intégrer l'upload */}
              </div>

              {/* Colonne droite - Période */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startingDate" className="text-black">Date de début *</Label>
                  <Input
                    id="startingDate"
                    name="startingDate"
                    type="datetime-local"
                    value={form.startingDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endingDate" className="text-black">Date de fin *</Label>
                  <Input
                    id="endingDate"
                    name="endingDate"
                    type="datetime-local"
                    value={form.endingDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sélection des écogestes */}
        <Card className="bg-[hsl(var(--secondary-foreground))]">
          <CardHeader>
            <CardTitle className="text-black">Écogestes associés</CardTitle>
            <CardDescription className="text-black">
              Sélectionnez les écogestes que les participants devront réaliser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EcogesturesSelect
              value={selectedEcogestures ?? []}
              onChange={setSelectedEcogestures}
            />
          </CardContent>
        </Card>

        {/* Messages de feedback */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Erreur : {error.message}
            </AlertDescription>
          </Alert>
        )}

        {data && (
          <Alert className="bg-green-50 text-green-900 border-green-200">
            <AlertDescription>
              ✓ Challenge créé avec succès !
            </AlertDescription>
          </Alert>
        )}

        {/* Bouton de soumission */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setForm({ label: "", description: "", startingDate: "", endingDate: "", picture: "" });
              setSelectedEcogestures([]);
            }}
          >
            Réinitialiser
          </Button>
          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Création en cours..." : "Créer le challenge"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewChallenge;