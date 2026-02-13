import { NavLink } from 'react-router-dom';
export const Nav = () => (
  <nav className="bg-base-100 p-2">
    <NavLink to="/exercises" className={({isActive})=>isActive?'font-bold text-primary':'font-normal'}>
      Exercises
    </NavLink>
  </nav>
);
