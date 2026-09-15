import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['/', 'Trust scoreboard'],
  ['/journeys', 'Journeys'],
  ['/trust-scores', 'Trust scores'],
  ['/breach', 'Breach playbooks'],
  ['/costs', 'Data holding costs'],
  ['/gates', 'Monetisation gates'],
  ['/decisions', 'Decision log'],
  ['/export', 'Board export'],
  ['/risks', 'Platform risks'],
] as const;

export function AppShell() {
  return (
    <div className="tk-shell">
      <nav className="tk-nav" aria-label="Trustkeep">
        <div className="tk-brand">Trustkeep</div>
        {links.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="tk-main">
        <Outlet />
      </main>
    </div>
  );
}
