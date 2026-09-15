import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { journeysService } from '@/services/domains/journeys';
import { trustScoresService } from '@/services/domains/trust-scores';

type Journey = {
  id: string;
  name: string;
  journeyKey: string;
  trustThreshold: number;
  valuePropositions?: string[];
  status: string;
};

export function JourneysPage() {
  const [items, setItems] = useState<Journey[]>([]);
  const [name, setName] = useState('');
  const [journeyKey, setJourneyKey] = useState('acquire');
  const [msg, setMsg] = useState<string | null>(null);

  async function reload() {
    const res = await journeysService.listJourneys();
    setItems(((res as { data?: { items?: Journey[] } }).data?.items ?? []) as Journey[]);
  }

  useEffect(() => {
    reload().catch((e) => setMsg(String(e)));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await journeysService.createJourney({ name, journeyKey, trustThreshold: 60 });
    setName('');
    await reload();
    setMsg('Journey created');
  }

  return (
    <div>
      <h1 className="tk-page-title">Journeys</h1>
      <p className="tk-page-sub">Prioritised workstreams — not 100-node compliance trees.</p>
      <form className="tk-form" onSubmit={onCreate}>
        <input
          placeholder="Journey name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={journeyKey} onChange={(e) => setJourneyKey(e.target.value)}>
          <option value="acquire">acquire</option>
          <option value="service">service</option>
          <option value="win_back">win_back</option>
          <option value="custom">custom</option>
        </select>
        <button className="tk-btn tk-btn-primary" type="submit">
          Create journey
        </button>
      </form>
      {msg ? <p className="tk-meta">{msg}</p> : null}
      <table className="tk-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Key</th>
            <th>Threshold</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((j) => (
            <tr key={j.id}>
              <td>{j.name}</td>
              <td className="tk-mono">{j.journeyKey}</td>
              <td className="tk-mono">{j.trustThreshold}</td>
              <td>
                <Link to={`/journeys/${j.id}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function JourneyDetailPage() {
  const { journeyId = '' } = useParams();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [gate, setGate] = useState<string>('open');

  useEffect(() => {
    (async () => {
      const j = await journeysService.getJourney(journeyId);
      setJourney((j as { data?: Journey }).data ?? null);
      const s = await trustScoresService.computeTrustScore(journeyId, {
        optInRate: 0.72,
        revokeRate: 0.08,
        periodLabel: new Date().toISOString().slice(0, 7),
      });
      const data = (s as { data?: { score: number; gateState: string } }).data;
      setScore(data?.score ?? null);
      setGate(data?.gateState ?? 'open');
    })().catch(console.error);
  }, [journeyId]);

  if (!journey) return <p className="tk-meta">Loading journey…</p>;

  return (
    <div>
      <h1 className="tk-page-title">{journey.name}</h1>
      <p className="tk-page-sub">
        Consent hygiene and trust trend for this prioritised journey.
      </p>
      <div className="tk-meta">Value props: {(journey.valuePropositions ?? []).join(', ') || '—'}</div>
      <p>
        Latest score:{' '}
        <span className="tk-score">{score != null ? score.toFixed(1) : '—'}</span>{' '}
        <span className={`tk-chip ${gate === 'blocked' ? 'warn' : ''}`}>{gate}</span>
      </p>
      <button
        className="tk-btn"
        onClick={() =>
          trustScoresService
            .computeTrustScore(journeyId, { optInRate: 0.8, revokeRate: 0.05 })
            .then((s) => {
              const data = (s as { data?: { score: number; gateState: string } }).data;
              setScore(data?.score ?? null);
              setGate(data?.gateState ?? 'open');
            })
        }
      >
        Recompute trust score
      </button>
    </div>
  );
}
