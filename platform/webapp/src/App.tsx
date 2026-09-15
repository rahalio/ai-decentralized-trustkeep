import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { LoginPage } from './app/LoginPage';
import { ScoreboardPage } from './features/journeys/views/ScoreboardPage';
import {
  JourneyDetailPage,
  JourneysPage,
} from './features/journeys/views/JourneysPage';
import { TrustScoresPage } from './features/trust-scores/views/TrustScoresPage';
import { BreachPage } from './features/breach-playbooks/views/BreachPage';
import { CostsPage } from './features/data-holding-costs/views/CostsPage';
import { GatesPage } from './features/monetization-gates/views/GatesPage';
import { DecisionsPage } from './features/decision-logs/views/DecisionsPage';
import { ExportPage } from './features/board-exports/views/ExportPage';
import { RisksPage } from './features/platform-risks/views/RisksPage';

function RequireSession({ children }: { children: ReactNode }) {
  const ok =
    typeof window !== 'undefined' && localStorage.getItem('trustkeep_session');
  if (!ok) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireSession>
            <AppShell />
          </RequireSession>
        }
      >
        <Route index element={<ScoreboardPage />} />
        <Route path="journeys" element={<JourneysPage />} />
        <Route path="journeys/:journeyId" element={<JourneyDetailPage />} />
        <Route path="trust-scores" element={<TrustScoresPage />} />
        <Route path="breach" element={<BreachPage />} />
        <Route path="costs" element={<CostsPage />} />
        <Route path="gates" element={<GatesPage />} />
        <Route path="decisions" element={<DecisionsPage />} />
        <Route path="export" element={<ExportPage />} />
        <Route path="risks" element={<RisksPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
