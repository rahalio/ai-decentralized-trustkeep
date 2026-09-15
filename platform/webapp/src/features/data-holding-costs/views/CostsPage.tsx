import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { dataHoldingCostsService } from '@/services/domains/data-holding-costs';
import { HoldingCostCurve } from '@/features/shared/components/HoldingCostCurve';

type Cost = {
  id: string;
  datasetName: string;
  inactiveRecords: number;
  annualCostPerRecord: number;
  estimatedAnnualCost: number;
  burnDownTargetRecords?: number;
  cleansedRecords?: number;
};

export function CostsPage() {
  const [items, setItems] = useState<Cost[]>([]);
  const [datasetName, setDatasetName] = useState('Inactive CRM profiles');
  const [inactiveRecords, setInactiveRecords] = useState(100000);
  const [rate, setRate] = useState(1.5);

  async function reload() {
    const res = await dataHoldingCostsService.listDataHoldingCosts();
    setItems(((res as { data?: { items?: Cost[] } }).data?.items ?? []) as Cost[]);
  }

  useEffect(() => {
    reload().catch(console.error);
  }, []);

  async function onUpsert(e: FormEvent) {
    e.preventDefault();
    await dataHoldingCostsService.upsertDataHoldingCost({
      datasetName,
      inactiveRecords,
      annualCostPerRecord: rate,
      burnDownTargetRecords: Math.round(inactiveRecords * 0.3),
      cleansedRecords: 0,
    });
    await reload();
  }

  return (
    <div>
      <h1 className="tk-page-title">Data holding cost inventory</h1>
      <p className="tk-page-sub">
        Estimate inactive PII holding cost and track burn-down for CFO-readable ROI (BR-3).
      </p>
      <form className="tk-form" onSubmit={onUpsert}>
        <input value={datasetName} onChange={(e) => setDatasetName(e.target.value)} />
        <input
          type="number"
          value={inactiveRecords}
          onChange={(e) => setInactiveRecords(Number(e.target.value))}
        />
        <input
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <button className="tk-btn tk-btn-primary" type="submit">
          Upsert cost model
        </button>
      </form>
      <div className="tk-band">
        {items.map((c) => (
          <div key={c.id} className="tk-journey-band">
            <strong>{c.datasetName}</strong>
            <HoldingCostCurve
              inactiveRecords={c.inactiveRecords}
              annualCostPerRecord={c.annualCostPerRecord}
              estimatedAnnualCost={
                c.estimatedAnnualCost ?? c.inactiveRecords * c.annualCostPerRecord
              }
              burnDownTargetRecords={c.burnDownTargetRecords}
              cleansedRecords={c.cleansedRecords}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
