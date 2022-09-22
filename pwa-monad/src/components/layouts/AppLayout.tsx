import { WithChildren } from "types/utils";

export function AppLayout({ children }: WithChildren) {
  return <div className="App">{children}</div>;
}
