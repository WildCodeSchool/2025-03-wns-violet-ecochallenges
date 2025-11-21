import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHALLENGE_MUTATION } from "@/graphql/mutations/challenge";


function NewChallenge() {
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Créer un nouveau challenge</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="label">Titre</label>
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
        <div>
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
        <div>
          <label className="block mb-1 font-medium" htmlFor="picture">Image (optionnel)</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={form.picture}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Télécharger votre image (max 3Mo) aux formats suivants: jpeg,jpg,png."
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