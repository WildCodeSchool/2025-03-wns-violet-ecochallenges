import { useState } from "react";
import NewChallenge from "@/pages/CreateChallengepage/NewChallenge";
// import EcogesturesSelect from "@/pages/CreateChallengepage/EcogesturesSelect";

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