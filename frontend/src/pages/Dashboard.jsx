import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
  return (
    <div>
      <Appbar />
      <div style={{ padding: 40 }}>
        <Balance value={10000} />
        <Users />
      </div>
    </div>
  );
}
