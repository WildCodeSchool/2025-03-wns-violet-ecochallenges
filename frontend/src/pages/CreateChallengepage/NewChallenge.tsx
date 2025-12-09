import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHALLENGE_MUTATION } from "@/graphql/mutations/challenge";
import EcogesturesSelect from "@/pages/CreateChallengepage/EcogesturesSelect";

function NewChallenge({
  selectedEcogestures,
  setSelectedEcogestures,
}: {
  selectedEcogestures: string[];
  setSelectedEcogestures: (value: string[]) => void;
}) {
  const [form, setForm] = useState({
    label: "",
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
            startingDate: new Date(form.startingDate).toISOString(),
            endingDate: new Date(form.endingDate).toISOString(),
            picture: form.picture,
          }
        }
      });
      // Optionnel: reset form or show success
      setForm({ label: "", startingDate: "", endingDate: "", picture: "" });
    } catch (err) {
      // Optionnel: gérer l'erreur
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div>
            <div
              className="rounded-lg p-4 mb-4 flex items-center gap-4"
              style={{
                backgroundImage: "url('https://picsum.photos/600/200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
            <h2 className="text-xl font-bold text-white drop-shadow">Créer un nouveau challenge</h2>
          </div>
          <label className="block mb-1 font-medium" htmlFor="label">Titre</label>
        </div>
        <input
          type="text"
          id="label"
          name="label"
          value={form.label}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Mon challenge"
        />
      </div>
      <div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="startingDate">Date de début</label>
            <input
              type="datetime-local"
              id="startingDate"
              name="startingDate"
              value={form.startingDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="endingDate">Date de fin</label>
            <input
              type="datetime-local"
              id="endingDate"
              name="endingDate"
              value={form.endingDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <label className="block mb-1 font-medium">Sélectionnez vos écogestes : </label>
        <EcogesturesSelect
          value={selectedEcogestures ?? []}
          onChange={setSelectedEcogestures}
        />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold" disabled={loading}>
          {loading ? "Création..." : "Créer un challenge"}
        </button>
        {error && <p className="text-red-500">Erreur: {error.message}</p>}
        {data && <p className="text-green-500">Challenge créé !</p>}
      </form>
    </div>
  );
}

export default NewChallenge;