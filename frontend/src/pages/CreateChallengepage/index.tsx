import { useState } from "react";

import NewChallenge from "@/pages/CreateChallengepage/NewChallenge";
import EcogesturesSelect from "@/pages/CreateChallengepage/EcogesturesSelect";

function CreateChallengePage() {
    const [selectedEcogesture, setSelectedEcogesture] = useState("");

  return (
    <>
        <NewChallenge/>
        <EcogesturesSelect
            value={selectedEcogesture}
            onChange={e => setSelectedEcogesture(e.target.value)}
        />
    </>
  );
}

export default CreateChallengePage;
