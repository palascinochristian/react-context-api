import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home Page</NavLink>
      </li>
      <li>
        <NavLink to="/recipes">Ricette</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">Chi siamo</NavLink>
      </li>
    </ul>
  );
}
