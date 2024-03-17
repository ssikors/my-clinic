import { Wrapper } from "./components/layout/Wrapper";
import { Visits } from "./components/visits/Visits";

export default function Page() {
  return <Wrapper>
      <h1 className="text-xl">Available visits:</h1>
      <Visits/>
  </Wrapper>
}