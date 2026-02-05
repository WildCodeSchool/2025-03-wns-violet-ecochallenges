import { useState } from "react";
import NewChallenge from "@/pages/CreateChallengePage/NewChallenge";

function CreateChallengePage() {
const [selectedEcogestures, setSelectedEcogestures] = useState<string[]>([]);
  return (
    <main>
      <NewChallenge
        selectedEcogestures={selectedEcogestures}
        setSelectedEcogestures={setSelectedEcogestures}
      />
    </main>
  );
}

export default CreateChallengePage;