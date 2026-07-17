import React from 'react';

const KPIS = [
  { label: 'Totaal batches', value: '148', bg: 'var(--citroengeel)', fg: 'var(--olijf-zwart)' },
  { label: 'Verkocht dit jaar', value: '3.240', unit: 'L', bg: 'var(--lucht-blauw)', fg: 'var(--olijf-zwart)' },
  { label: 'Totaal geschilde citroenen', value: '52.800', bg: 'var(--sappie-sage)', fg: 'var(--warm-wit)' },
];

const BATCHES = [
  { nr: 'B20', productie: '08 jul 2026', vul: '10 jul 2026', volume: '312', status: 'in-productie' },
  { nr: 'B19', productie: '01 jul 2026', vul: '03 jul 2026', volume: '298', status: 'in-productie' },
  { nr: 'B18', productie: '24 jun 2026', vul: '26 jun 2026', volume: '305', status: 'gebotteld' },
  { nr: 'B17', productie: '17 jun 2026', vul: '19 jun 2026', volume: '289', status: 'gebotteld' },
  { nr: 'B16', productie: '10 jun 2026', vul: '12 jun 2026', volume: '321', status: 'uitverkocht' },
];

const STATUS_LABEL = { 'in-productie': 'In productie', gebotteld: 'Gebotteld', uitverkocht: 'Uitverkocht' };

const WEEKS = ['W23', 'W24', 'W25', 'W26', 'W27', 'W28', 'W29', 'W30'];
const SERIES = [
  { naam: 'Sappie', kleur: '#F0CE4A', data: [82, 90, 78, 96, 104, 112, 108, 124] },
  { naam: 'Goodguys', kleur: '#C0392B', data: [48, 52, 60, 55, 64, 58, 72, 76] },
  { naam: 'Fiorito', kleur: '#5E6A3A', data: [30, 36, 34, 44, 40, 52, 49, 58] },
  { naam: 'Utrechts Zonnetje', kleur: '#B16A45', data: [18, 22, 20, 28, 33, 30, 38, 42] },
];

function KpiCards() {
  return (
    <div className="kpis">
      {KPIS.map((k) => (
        <div key={k.label} className="kpi" style={{ background: k.bg, color: k.fg }}>
          <p className="kpi__value">{k.value}{k.unit && <span className="kpi__unit">{k.unit}</span>}</p>
          <p className="kpi__label">{k.label}</p>
        </div>
      ))}
    </div>
  );
}

function BatchTable() {
  return (
    <section className="panel">
      <div className="panel__head">
        <h2 className="panel__title">Totaal batches</h2>
        <span className="panel__hint">5 van 148</span>
      </div>
      <table className="tbl">
        <thead>
          <tr>
            <th>Batch</th>
            <th>Productiedatum</th>
            <th>Vuldatum</th>
            <th className="is-right">Eindvolume (L)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {BATCHES.map((b) => (
            <tr key={b.nr}>
              <td className="tbl__batch">{b.nr}</td>
              <td>{b.productie}</td>
              <td>{b.vul}</td>
              <td className="is-right tbl__num">{b.volume}</td>
              <td>
                <span className={`badge badge--${b.status}`}>
                  <span className="badge__dot"></span>
                  {STATUS_LABEL[b.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SalesChart() {
  const W = 760, H = 300;
  const padL = 44, padR = 16, padT = 16, padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allVals = SERIES.flatMap((s) => s.data);
  const maxV = Math.ceil(Math.max(...allVals) / 20) * 20;
  const n = WEEKS.length;

  const x = (i) => padL + (plotW * i) / (n - 1);
  const y = (v) => padT + plotH - (plotH * v) / maxV;

  const ticks = [];
  for (let v = 0; v <= maxV; v += maxV / 4) ticks.push(v);

  return (
    <div className="chart__wrap">
      <svg className="chart__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Wekelijkse verkoop per verkooppunt in liters">
        {ticks.map((v) => (
          <g key={v}>
            <line className="chart__grid" x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} />
            <text className="chart__axislabel" x={padL - 10} y={y(v) + 4} textAnchor="end">{v}</text>
          </g>
        ))}
        <line className="chart__axis" x1={padL} y1={y(0)} x2={W - padR} y2={y(0)} />
        {WEEKS.map((w, i) => (
          <text key={w} className="chart__axislabel" x={x(i)} y={H - 12} textAnchor="middle">{w}</text>
        ))}
        {SERIES.map((s) => {
          const d = s.data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
          return (
            <g key={s.naam}>
              <path className="chart__line" d={d} style={{ stroke: s.kleur }} />
              {s.data.map((v, i) => (
                <circle key={i} className="chart__dot" cx={x(i)} cy={y(v)} r="3.5" style={{ fill: s.kleur }} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="legend">
        {SERIES.map((s) => (
          <span key={s.naam} className="legend__item">
            <span className="legend__swatch" style={{ background: s.kleur }}></span>
            {s.naam}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Overzicht() {
  return (
    <>
      <header className="ph ph--statement">
        <span className="ph__eyebrow">Ingelogd · Overzicht</span>
        <h1 className="ph__title ph__title--big">Welkom terug bij <span className="ph__mark">Sappie</span>, Jesse</h1>
        <p className="ph__body">Je stookt, wij tellen mee. Dit is de stand van zaken van vandaag.</p>
      </header>
      <main className="dash">
        <KpiCards />
        <BatchTable />
        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Wekelijkse verkoop per verkooppunt</h2>
            <span className="panel__hint">Liters · laatste 8 weken</span>
          </div>
          <SalesChart />
        </section>
      </main>
    </>
  );
}
