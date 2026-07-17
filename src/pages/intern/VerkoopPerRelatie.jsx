import React, { useEffect, useState } from 'react';

const STORE_KEY = 'sappie.verkopen.v1';

const RELATIES = [
  { id: 'una-mas', naam: 'Una Más', type: 'Restaurant', adres: 'Oudegracht 12', stad: 'Utrecht' },
  { id: 'una-mas-nieuwegein', naam: 'Una Más Nieuwegein', type: 'Restaurant', adres: 'Stadsplein 4', stad: 'Nieuwegein' },
  { id: 'hygge', naam: 'Hygge', type: 'Café', adres: 'Voorstraat 20', stad: 'Utrecht' },
  { id: 'besseling-booze', naam: 'Besseling Booze', type: 'Slijterij', adres: 'Amsterdamsestraatweg 55', stad: 'Utrecht' },
  { id: 'biltstraat-wijn-whisky', naam: 'Biltstraat Wijn & Whisky', type: 'Slijterij', adres: 'Biltstraat 100', stad: 'Utrecht' },
];

const SEED = {
  'una-mas': [
    { id: 'u1', datum: '2026-02-14', aantal: 24 },
    { id: 'u2', datum: '2026-03-09', aantal: 36 },
    { id: 'u3', datum: '2026-04-02', aantal: 30 },
    { id: 'u4', datum: '2026-04-28', aantal: 48 },
    { id: 'u5', datum: '2026-05-20', aantal: 42 },
    { id: 'u6', datum: '2026-06-15', aantal: 54 },
    { id: 'u7', datum: '2026-07-08', aantal: 60 },
  ],
  'una-mas-nieuwegein': [
    { id: 'n1', datum: '2026-05-12', aantal: 18 },
    { id: 'n2', datum: '2026-06-18', aantal: 24 },
    { id: 'n3', datum: '2026-07-06', aantal: 30 },
  ],
  hygge: [
    { id: 'h1', datum: '2026-06-02', aantal: 12 },
    { id: 'h2', datum: '2026-07-01', aantal: 18 },
  ],
  'besseling-booze': [
    { id: 'b1', datum: '2026-05-22', aantal: 24 },
    { id: 'b2', datum: '2026-06-25', aantal: 30 },
  ],
  'biltstraat-wijn-whisky': [
    { id: 'w1', datum: '2026-06-10', aantal: 15 },
    { id: 'w2', datum: '2026-07-04', aantal: 21 },
  ],
};

function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
}
function fmtDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  const mnd = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  return `${d} ${mnd[+m - 1]} ${y}`;
}
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtNum = (n) => n.toLocaleString('nl-NL');

function Sparkline({ verkopen }) {
  if (verkopen.length < 2) return null;
  const rows = [...verkopen].sort((a, b) => a.datum.localeCompare(b.datum));
  const W = 640, H = 150, padL = 30, padR = 12, padT = 12, padB = 22;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const maxV = Math.max(...rows.map((r) => r.aantal));
  const n = rows.length;
  const x = (i) => padL + (plotW * i) / (n - 1);
  const y = (v) => padT + plotH - (plotH * v) / maxV;
  const d = rows.map((r, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(r.aantal).toFixed(1)}`).join(' ');
  return (
    <div className="spark">
      <svg className="spark__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Verkoop over tijd">
        <line className="spark__axis" x1={padL} y1={y(0)} x2={W - padR} y2={y(0)} />
        <path className="spark__line" d={d} />
        {rows.map((r, i) => <circle key={r.id} className="spark__dot" cx={x(i)} cy={y(r.aantal)} r="3.5" />)}
        {rows.map((r, i) => (i === 0 || i === n - 1 || n <= 6) && (
          <text key={'t' + r.id} className="spark__label" x={x(i)} y={H - 6} textAnchor="middle">{fmtDate(r.datum).slice(0, 6)}</text>
        ))}
      </svg>
    </div>
  );
}

function AddSale({ onAdd }) {
  const [datum, setDatum] = useState(todayISO());
  const [aantal, setAantal] = useState('');
  const submit = (e) => {
    e.preventDefault();
    const n = parseInt(aantal, 10);
    if (!datum || !n || n <= 0) return;
    onAdd({ datum, aantal: n });
    setAantal('');
  };
  return (
    <form className="add" onSubmit={submit}>
      <label>
        <span className="add__lbl">Verkoopdatum</span>
        <input className="field" type="date" value={datum} onChange={(e) => setDatum(e.target.value)} />
      </label>
      <label>
        <span className="add__lbl">Aantal flessen</span>
        <input className="field" type="number" min="1" value={aantal} onChange={(e) => setAantal(e.target.value)} placeholder="bv. 24" />
      </label>
      <button type="submit" className="add__btn" disabled={!aantal || parseInt(aantal, 10) <= 0}>Verkoop toevoegen</button>
    </form>
  );
}

export default function VerkoopPerRelatie() {
  const [active, setActive] = useState(RELATIES[0].id);
  const [byRel, setByRel] = useState(() => load(STORE_KEY, SEED));

  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(byRel)); }, [byRel]);

  const rel = RELATIES.find((r) => r.id === active);
  const verkopen = (byRel[active] || []).slice().sort((a, b) => b.datum.localeCompare(a.datum));
  const totaal = verkopen.reduce((s, v) => s + v.aantal, 0);

  const add = (sale) => setByRel((m) => ({
    ...m,
    [active]: [...(m[active] || []), { ...sale, id: 'id' + Date.now() + Math.random().toString(36).slice(2, 6) }],
  }));

  return (
    <>
      <div className="pick">
        <span className="pick__label">Sappie certified relaties</span>
        {RELATIES.map((r) => (
          <button key={r.id} className={`pick__chip${r.id === active ? ' pick__chip--on' : ''}`} onClick={() => setActive(r.id)}>{r.naam}</button>
        ))}
      </div>

      <header className="rel">
        <span className="rel__eyebrow">Relatie</span>
        <h1 className="rel__name">{rel.naam}</h1>
        <div className="rel__meta">
          <div className="rel__field"><span className="rel__field-lbl">Type winkel</span><span className="rel__field-val">{rel.type}</span></div>
          <div className="rel__field"><span className="rel__field-lbl">Locatie</span><span className="rel__field-val">{rel.adres}, {rel.stad}</span></div>
        </div>
      </header>

      <main className="wrap">
        <div className="grid">
          <div>
            <div className="total">
              <p className="total__value">{fmtNum(totaal)}</p>
              <p className="total__label">Flessen verkocht</p>
              <p className="total__sub">{verkopen.length} {verkopen.length === 1 ? 'verkoop' : 'verkopen'} geregistreerd</p>
            </div>
            <section className="panel">
              <div className="panel__head"><h2 className="panel__title">Verkoop toevoegen</h2></div>
              <AddSale onAdd={add} />
            </section>
          </div>

          <section className="panel">
            <div className="panel__head">
              <h2 className="panel__title">Losse verkopen</h2>
              <span className="panel__hint">{rel.naam}</span>
            </div>
            <table className="st">
              <thead>
                <tr>
                  <th>Verkoopdatum</th>
                  <th className="is-right">Aantal flessen</th>
                </tr>
              </thead>
              <tbody>
                {verkopen.length === 0 && <tr className="st__empty"><td colSpan={2}>Nog geen verkopen geregistreerd.</td></tr>}
                {verkopen.map((v) => (
                  <tr key={v.id}>
                    <td>{fmtDate(v.datum)}</td>
                    <td className="st__num">{fmtNum(v.aantal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Sparkline verkopen={verkopen} />
          </section>
        </div>
      </main>
    </>
  );
}
