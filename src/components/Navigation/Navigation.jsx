import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => (
  <div className={css.header}>
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(css.link, isActive && css.isActive)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => clsx(css.link, isActive && css.isActive)}
      >
        Movies
      </NavLink>
    </nav>
  </div>
);

export default Navigation;
