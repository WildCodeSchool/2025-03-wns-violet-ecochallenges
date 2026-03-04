import { useState } from "react";
import NewChallenge from "@/pages/CreateChallengePage/NewChallenge";
import Protected from "@/components/auth/Protected";

function CreateChallengePage() {
  const [selectedEcogestures, setSelectedEcogestures] = useState<string[]>([]);
  return (
    <Protected>
      {() => (
        <main>
          <NewChallenge
            selectedEcogestures={selectedEcogestures}
            setSelectedEcogestures={setSelectedEcogestures}
          />
        </main>
      )}
    </Protected>
  );
}

export default CreateChallengePage;
