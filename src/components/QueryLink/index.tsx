import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QueryNavLink({ to, ...props }: any) {
    const location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
  }