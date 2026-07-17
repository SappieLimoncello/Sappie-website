import React, { useEffect, useMemo, useState } from 'react';

const STORE_KEY = 'sappie.prospects.v1';
const OPT_KEY = 'sappie.prospects.opts.v1';

const DEFAULT_OPTS = {
  status: ['Verkoopt geen sterk', 'Sappie certified', 'Geen interesse (dom)', 'Proevend', 'Later mogelijk interessant'],
  type: ['Drankspeciaalzaak', 'Slijterij', 'Restaurant', 'Cocktailbar'],
};

const SEED = [
  { id: 'p1', langs: 'Ja', laatst: '2026-07-05', status: 'Proevend', naam: 'Drankgigant', type: 'Slijterij', adres: 'Amsterdamsestraatweg 12' },
  { id: 'p2', langs: 'Ja', laatst: '2026-06-28', status: 'Later mogelijk interessant', naam: 'Bar Beton', type: 'Cocktailbar', adres: 'Stationsplein 7' },
  { id: 'p3', langs: 'Nee', laatst: '', status: 'Verkoopt geen sterk', naam: 'De Kleine Deli', type: 'Drankspeciaalzaak', adres: 'Twijnstraat 30' },
  { id: 'p4', langs: 'Ja', laatst: '2026-07-11', status: 'Geen interesse (dom)', naam: 'Slijterij Centrum', type: 'Slijterij', adres: 'Stadsplein 22' },
  { id: 'p5', langs: 'Ja', laatst: '2026-07-02', status: 'Proevend', naam: 'Restaurant Nova', type: 'Restaurant', adres: 'Oudegracht 210' },
];

function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
}

function ExtSelect({ value, options, onChange, onAddOption, className, label }) {
  const ADD = '__add__';
  const handle = (e) => {
    if (e.target.value === ADD) {
      const nv = (window.prompt(`Nieuwe optie voor ${label}:`) || '').trim();
      if (nv) { onAddOption(nv); onChange(nv); }
      return;
    }
    onChange(e.target.value);
  };
  const has = options.includes(value);
  return (
    <select className={className} value={has ? value : ''} onChange={handle}>
      {!has && <option value="" disabled>Kies…</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
      <option value={ADD}>+ Nieuwe optie…</option>
    </select>
  );
}

function Row({ r, opts, onEdit, onAddOpt, onDelete }) {
  return (
    <tr>
      <td><input className="cell" type="text" value={r.naam} onChange={(e) => onEdit(r.id, 'naam', e.target.value)} placeholder="Naam winkel" /></td>
      <td>
        <select className="cell" style={{ background: r.langs === 'Ja' ? 'var(--sappie-sage)' : 'var(--utrecht-rood)', color: 'var(--warm-wit)', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.66rem', border: '1.5px solid var(--olijf-zwart)', minWidth: '66px' }} value={r.langs} onChange={(e) => onEdit(r.id, 'langs', e.target.value)}>
          <option value="Ja">Ja</option>
          <option value="Nee">Nee</option>
        </select>
      </td>
      <td><input className="cell" type="date" value={r.laatst} onChange={(e) => onEdit(r.id, 'laatst', e.target.value)} /></td>
      <td className="statuscell">
        <ExtSelect className="cell" label="Status" value={r.status} options={opts.status} onChange={(v) => onEdit(r.id, 'status', v)} onAddOption={(v) => onAddOpt('status', v)} />
      </td>
      <td><ExtSelect className="cell" label="Type winkel" value={r.type} options={opts.type} onChange={(v) => onEdit(r.id, 'type', v)} onAddOption={(v) => onAddOpt('type', v)} /></td>
      <td><input className="cell" type="text" value={r.adres} onChange={(e) => onEdit(r.id, 'adres', e.target.value)} placeholder="Adres" /></td>
      <td><button className="del" title="Verwijderen" onClick={() => onDelete(r.id)}>×</button></td>
    </tr>
  );
}

const COLS = [
  { key: 'naam', label: 'Naam winkel' },
  { key: 'langs', label: 'Langsgeweest?' },
  { key: 'laatst', label: 'Laatst bezocht/contact' },
  { key: 'status', label: 'Status' },
  { key: 'type', label: 'Type winkel' },
  { key: 'adres', label: 'Locatie (adres)' },
];

export default function PotentieleKlanten() {
  const [rows, setRows] = useState(() => load(STORE_KEY, SEED));
  const [opts, setOpts] = useState(() => load(OPT_KEY, DEFAULT_OPTS));
  const [sort, setSort] = useState({ key: null, dir: 1 });

  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(rows)); }, [rows]);
  useEffect(() => { localStorage.setItem(OPT_KEY, JSON.stringify(opts)); }, [opts]);

  const edit = (id, field, value) => setRows((rs) => rs.map((r) => r.id === id ? { ...r, [field]: value } : r));
  const addOpt = (group, value) => setOpts((o) => o[group].includes(value) ? o : { ...o, [group]: [...o[group], value] });
  const del = (id) => setRows((rs) => rs.filter((r) => r.id !== id));
  const addRow = () => setRows((rs) => [...rs, {
    id: 'id' + Date.now() + Math.random().toString(36).slice(2, 6),
    langs: 'Nee', laatst: '', status: opts.status[0], naam: '', type: opts.type[0], adres: '',
  }]);

  const toggleSort = (key) => setSort((s) => s.key === key ? { key, dir: -s.dir } : { key, dir: 1 });
  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    return [...rows].sort((a, b) => String(a[sort.key] || '').localeCompare(String(b[sort.key] || ''), 'nl', { sensitivity: 'base' }) * sort.dir);
  }, [rows, sort]);

  return (
    <>
      <header className="ph">
        <div>
          <span className="ph__eyebrow">Ingelogd · Sales</span>
          <h1 className="ph__title">Potentiële <span className="ph__mark ph__mark--blauw">klanten</span></h1>
        </div>
      </header>

      <div className="bar">
        <span className="bar__count">{rows.length} potentiële klanten</span>
        <button className="bar__btn" onClick={addRow}>+ Winkel toevoegen</button>
      </div>

      <div className="tblwrap">
        <table className="pt">
          <thead>
            <tr>
              {COLS.map((c) => (
                <th key={c.key} className={`sortable${sort.key === c.key ? ' is-sorted' : ''}`} onClick={() => toggleSort(c.key)}>
                  {c.label}
                  <span className="pt__arrow">{sort.key === c.key ? (sort.dir === 1 ? '▲' : '▼') : '↕'}</span>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => <Row key={r.id} r={r} opts={opts} onEdit={edit} onAddOpt={addOpt} onDelete={del} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
