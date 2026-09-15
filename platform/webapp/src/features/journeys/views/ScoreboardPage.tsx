import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { journeysService } from '@/services/domains/journeys';
import { trustScoresService } from '@/services/domains/trust-scores';
import { monetizationGatesService } from '@/services/domains/monetization-gates';
import { platformRisksService } from '@/services/domains/platform-risks';
import { JourneyTrustBand } from '@/features/shared/components/JourneyTrustBand';
import { MonetizationGateBanner } from '@/features/shared/components/MonetizationGateBanner';
import { ForgetVolumeSignal } from '@/features/shared/components/ForgetVolumeSignal';
import { PlatformExclusionChip } from '@/features/shared/components/PlatformExclusionChip';

type Journey = {
  id: string;
  name: string;
  forgetVolumeOpen?: number;
  trustThreshold?: number;
};
type Score = {
  journeyId: string;
  score: number;
  gateState: 'open' | 'blocked';
  consent?: { optInRate?: number; revokeRate?: number };
};
type Risk = { status: string; title: string };

export function ScoreboardPage() {
  const navigate = useNavigate();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [blockedProposals, setBlockedProposals] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [j, s, p, r] = await Promise.all([
          journeysService.listJourneys(),
          trustScoresService.listTrustScores(),
          monetizationGatesService.listMonetizationProposals(),
          platformRisksService.listPlatformRisks(),
        ]);
        if (cancelled) return;
        const jItems = ((j as { data?: { items?: Journey[] } }).data?.items ??
          []) as Journey[];
        const sItems = ((s as { data?: { items?: Score[] } }).data?.items ??
          []) as Score[];
        const pItems = ((p as { data?: { items?: { status: string }[] } }).data
          ?.items ?? []) as { status: string }[];
        const rItems = ((r as { data?: { items?: Risk[] } }).data?.items ??
          []) as Risk[];
        setJourneys(jItems);
        setScores(sItems);
        setRisks(rItems);
        setBlockedProposals(pItems.filter((x) => x.status === 'blocked').length);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const scoreByJourney = useMemo(() => {
    const map = new Map<string, Score>();
    for (const s of scores) map.set(s.journeyId, s);
    return map;
  }, [scores]);

  const forgetVolume = journeys.reduce((n, j) => n + (j.forgetVolumeOpen ?? 0), 0);
  const blockedBands = [...scoreByJourney.values()].filter(
    (s) => s.gateState === 'blocked'
  ).length;
  const topRisk = risks[0];

  return (
    <div>
      <h1 className="tk-page-title">Trust scoreboard</h1>
      <p className="tk-page-sub">
        Which journeys still earn lawful access — and where is monetisation blocked?
      </p>
      <MonetizationGateBanner blockedCount={blockedProposals || blockedBands} />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        {topRisk ? (
          <PlatformExclusionChip status={topRisk.status} title={topRisk.title} />
        ) : (
          <PlatformExclusionChip status="monitored_clear" />
        )}
        <ForgetVolumeSignal openCount={forgetVolume} />
      </div>
      {error ? <p className="tk-meta">{error}</p> : null}
      {!error && journeys.length === 0 ? (
        <p className="tk-meta">
          Empty scoreboard — define three starter journeys (acquire, service, win-back).
        </p>
      ) : null}
      <div className="tk-band">
        {journeys.map((j) => {
          const s = scoreByJourney.get(j.id);
          return (
            <JourneyTrustBand
              key={j.id}
              name={j.name}
              score={s?.score ?? 0}
              gateState={s?.gateState ?? 'open'}
              optInRate={s?.consent?.optInRate}
              revokeRate={s?.consent?.revokeRate}
              onOpen={() => navigate(`/journeys/${j.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
