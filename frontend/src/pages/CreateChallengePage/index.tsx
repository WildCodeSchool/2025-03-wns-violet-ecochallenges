import { useState } from "react";
import NewChallenge from "@/pages/CreateChallengePage/NewChallenge";

function CreateChallengePage() {
const [selectedEcogestures, setSelectedEcogestures] = useState<string[]>([]);
  return (
    <NewChallenge
      selectedEcogestures={selectedEcogestures}
      setSelectedEcogestures={setSelectedEcogestures}
    />
  );
}

export default CreateChallengePage;