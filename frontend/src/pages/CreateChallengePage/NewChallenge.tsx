import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { CREATE_CHALLENGE } from "@/graphql/mutations/challenge";
import { GET_MY_CHALLENGES } from "@/graphql/queries/challenge";
import { ChallengeFilter } from "@/generated/graphql-types";
import EcogesturesSelect from "@/pages/CreateChallengePage/EcogesturesSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import AddParticipants, {
  type Participant,
} from "@/pages/CreateChallengePage/AddParticipants";
import { CalendarPopover } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";

function NewChallenge({
  selectedEcogestures,
  setSelectedEcogestures,
}: {
  selectedEcogestures: string[];
  setSelectedEcogestures: (value: string[]) => void;
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    label: "",
    description: "",
    startingDate: "",
    endingDate: "",
    picture: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [createChallenge, { loading }] = useMutation(CREATE_CHALLENGE, {
    refetchQueries: [
      {
        query: GET_MY_CHALLENGES,
        variables: {
          input: {
            filter: ChallengeFilter.InProgress,
          },
        },
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // // Upload image (placeholder)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Pour l'instant, on utilise un preview local
      const url = URL.createObjectURL(e.target.files[0]);
      setForm({ ...form, picture: url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const variables = {
      data: {
        label: form.label,
        description: form.description,
        startingDate: new Date(form.startingDate).toISOString(),
        endingDate: new Date(form.endingDate).toISOString(),
        picture: form.picture,
        ecogestureIds: selectedEcogestures.map(Number),
        participantIds: participants.map((p: Participant) => p.id),
      },
    };

    try {
      await createChallenge({ variables });
      setForm({
        label: "",
        description: "",
        startingDate: "",
        endingDate: "",
        picture: "",
      });
      setSelectedEcogestures([]);
      setParticipants([]);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0 bg-primary-foreground w-full">
          <div className="w-full h-40 sm:h-56 md:h-72 relative flex items-center justify-center">
            <img
              src={form.picture || "https://picsum.photos/600/400"}
              alt="Challenge preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <label htmlFor="picture-upload">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Upload size={18} />
                  Charger une photo
                </Button>
                <input
                  id="picture-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </Card>
        <Card className="bg-secondary-foreground  w-full">
          <CardHeader>
            <CardTitle className="text-black">
              Informations du challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label" className="text-black">
                  Titre du challenge{" "}
                  <span className="text-red-600 italic">*</span>
                </Label>
                <Input
                  id="label"
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Défi zéro déchet"
                  className="bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-black">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Décrivez votre challenge..."
                  className="bg-white text-black min-h-[100px] px-3 py-1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">
                  Période du Challenge{" "}
                  <span className="text-red-600 italic">*</span>
                </Label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
                    <div className="w-full sm:w-1/2">
                      <CalendarPopover
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange(range);
                          setForm((prev) => ({
                            ...prev,
                            startingDate: range?.from
                              ? range.from.toISOString()
                              : "",
                            endingDate: range?.to ? range.to.toISOString() : "",
                          }));
                        }}
                        numberOfMonths={2}
                        className="rounded-lg border shadow-sm w-full"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 min-w-[180px] p-3 bg-white border rounded-lg shadow-sm">
                      <div className="text-sm text-gray-700">
                        {dateRange?.from
                          ? `Début : ${dateRange.from.toLocaleDateString()}`
                          : "Date de début : non renseignée"}
                        <br />
                        {dateRange?.to
                          ? `Fin : ${dateRange.to.toLocaleDateString()}`
                          : "Date de fin : non renseignée"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="italic text-red-600 text-sm mt-2">
                * : informations obligatoires
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary-foreground  w-full">
          <CardHeader>
            <CardTitle className="text-black">
              Ajouter des écogestes à votre challenge
            </CardTitle>
            <CardDescription className="text-black">
              Sélectionnez les écogestes dans la liste déroulante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EcogesturesSelect
              value={selectedEcogestures ?? []}
              onChange={setSelectedEcogestures}
            />
          </CardContent>
        </Card>

        <AddParticipants
          participants={participants}
          setParticipants={setParticipants}
        />
        <div className="flex justify-end gap-4 mt-2">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Création en cours..." : "Créer le challenge"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewChallenge;
