import { ModernNav } from "./ModernNav";

interface NavbarProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  onLogout?: () => void;
}

export function Navbar(props: NavbarProps) {
  return <ModernNav {...props} />;
}
