import React, { useEffect, useState } from 'react';

const STORE_KEY = 'sappie.taken.v1';
const TYPES_KEY = 'sappie.taken.types.v1';
const DEFAULT_TYPES = ['Verkoop', 'Financiën', 'Social media', 'Inkoop', 'Productie'];

const TYPE_COLOR = {
  Verkoop: 'var(--citroengeel)',
  'Financiën': 'var(--sappie-sage)',
  'Social media': 'var(--lucht-blauw)',
  Inkoop: 'var(--baksteen)',
  Productie: 'var(--water-groen)',
};

const SEED = [
  { id: 't1', voor: 'oscar', taak: 'Offerte Goodguys nabellen', door: 'Oscar', gemaakt: '2026-07-09', deadline: '2026-07-18', type: 'Verkoop', status: 'open' },
  { id: 't2', voor: 'oscar', taak: 'BTW-aangifte Q2 klaarzetten', door: 'Jesse', gemaakt: '2026-07-08', deadline: '2026-07-31', type: 'Financiën', status: 'open' },
  { id: 't3', voor: 'oscar', taak: 'Etiketten batch B18 bestellen', door: 'Oscar', gemaakt: '2026-07-02', deadline: '', type: 'Inkoop', status: 'klaar' },
  { id: 't4', voor: 'jesse', taak: 'Reels plannen voor juli', door: 'Jesse', gemaakt: '2026-07-10', deadline: '2026-07-15', type: 'Social media', status: 'open' },
  { id: 't5', voor: 'jesse', taak: 'Citroenen bijbestellen bij leverancier', door: 'Oscar', gemaakt: '2026-07-07', deadline: '2026-07-14', type: 'Inkoop', status: 'open' },
  { id: 't6', voor: 'jesse', taak: 'Batch B20 bottelen inplannen', door: 'Jesse', gemaakt: '2026-07-01', deadline: '', type: 'Productie', status: 'klaar' },
];

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

function Check({ done, onClick }) {
  return (
    <button className={`chk${done ? ' chk--on' : ''}`} onClick={onClick} title={done ? 'Markeer als open' : 'Markeer als klaar'} aria-pressed={done}>
      {done && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
    </button>
  );
}

function TaskRow({ t, onToggle }) {
  return (
    <tr className={t.status === 'klaar' ? 'tr--done' : ''}>
      <td className="is-check"><Check done={t.status === 'klaar'} onClick={() => onToggle(t.id)} /></td>
      <td className="tt__task">{t.taak}</td>
      <td className="tt__meta">{t.door}</td>
      <td className="tt__meta">{fmtDate(t.gemaakt)}</td>
      <td className="tt__meta">{fmtDate(t.deadline)}</td>
      <td><span className="type-tag" style={{ background: TYPE_COLOR[t.type] || 'var(--creme)' }}>{t.type}</span></td>
    </tr>
  );
}

function AddForm({ voor, types, me, onAdd, onNewType }) {
  const [taak, setTaak] = useState('');
  const [deadline, setDeadline] = useState('');
  const [type, setType] = useState(types[0]);
  const submit = (e) => {
    e.preventDefault();
    if (!taak.trim()) return;
    onAdd({ voor, taak: taak.trim(), door: me, gemaakt: todayISO(), deadline, type, status: 'open' });
    setTaak(''); setDeadline('');
  };
  return (
    <form className="add" onSubmit={submit}>
      <label>
        <span className="add__lbl">Taak</span>
        <input className="field" type="text" value={taak} onChange={(e) => setTaak(e.target.value)} placeholder="Omschrijving van de taak" />
      </label>
      <div className="add__row">
        <label>
          <span className="add__lbl">Deadline (optioneel)</span>
          <input className="field" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </label>
        <div className="add__type-row">
          <label>
            <span className="add__lbl">Type</span>
            <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
              {types.map((ty) => <option key={ty} value={ty}>{ty}</option>)}
            </select>
          </label>
          <button type="button" className="add__newtype" title="Nieuw type toevoegen" onClick={() => { const nt = onNewType(); if (nt) setType(nt); }}>+</button>
        </div>
      </div>
      <button type="submit" className="add__btn" disabled={!taak.trim()}>Taak toevoegen</button>
    </form>
  );
}

function TaskList({ voor, label, tasks, types, me, onToggle, onAdd, onNewType }) {
  const [openDone, setOpenDone] = useState(false);
  const mine = tasks.filter((t) => t.voor === voor);
  const open = mine.filter((t) => t.status === 'open');
  const done = mine.filter((t) => t.status === 'klaar');

  return (
    <section className="list">
      <div className={`list__head list__head--${voor}`}>
        <h2 className="list__title">{label}</h2>
        <span className="list__count">{open.length} open</span>
      </div>
      <table className="tt">
        <thead>
          <tr>
            <th className="is-check"></th>
            <th>Taak</th>
            <th>Toegevoegd door</th>
            <th>Aangemaakt op</th>
            <th>Deadline</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {open.length === 0 && <tr className="tt__empty"><td colSpan={6}>Geen open taken.</td></tr>}
          {open.map((t) => <TaskRow key={t.id} t={t} onToggle={onToggle} />)}
        </tbody>
      </table>

      {done.length > 0 && (
        <div className="donebar">
          <button className="donebar__btn" onClick={() => setOpenDone(!openDone)}>
            <span className={`donebar__caret${openDone ? ' donebar__caret--open' : ''}`}>▶</span>
            {openDone ? 'Verberg' : 'Toon'} afgeronde taken ({done.length})
          </button>
          {openDone && (
            <table className="tt">
              <tbody>{done.map((t) => <TaskRow key={t.id} t={t} onToggle={onToggle} />)}</tbody>
            </table>
          )}
        </div>
      )}

      <AddForm voor={voor} types={types} me={me} onAdd={onAdd} onNewType={onNewType} />
    </section>
  );
}

export default function Taken() {
  const [tasks, setTasks] = useState(() => load(STORE_KEY, SEED));
  const [types, setTypes] = useState(() => load(TYPES_KEY, DEFAULT_TYPES));
  const [me, setMe] = useState('Oscar');

  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem(TYPES_KEY, JSON.stringify(types)); }, [types]);

  const toggle = (id) => setTasks((ts) => ts.map((x) => x.id === id ? { ...x, status: x.status === 'open' ? 'klaar' : 'open' } : x));
  const add = (task) => setTasks((ts) => [{ ...task, id: 'id' + Date.now() + Math.random().toString(36).slice(2, 6) }, ...ts]);
  const newType = () => {
    const name = (window.prompt('Naam van het nieuwe type:') || '').trim();
    if (!name) return null;
    if (!types.includes(name)) setTypes((ty) => [...ty, name]);
    return name;
  };

  return (
    <>
      <header className="ph ph--statement">
        <div className="ph__row">
          <div>
            <span className="ph__eyebrow">Ingelogd · Taken</span>
            <h1 className="ph__title">Wie doet <span className="ph__mark">wat</span>?</h1>
          </div>
          <div className="who">
            <span className="who__label">Ingelogd als</span>
            <div className="who__seg">
              <button className={`who__btn${me === 'Oscar' ? ' who__btn--on' : ''}`} onClick={() => setMe('Oscar')}>Oscar</button>
              <button className={`who__btn${me === 'Jesse' ? ' who__btn--on' : ''}`} onClick={() => setMe('Jesse')}>Jesse</button>
            </div>
          </div>
        </div>
      </header>

      <main className="board">
        <TaskList voor="oscar" label="Taken van Oscar" tasks={tasks} types={types} me={me} onToggle={toggle} onAdd={add} onNewType={newType} />
        <TaskList voor="jesse" label="Taken van Jesse" tasks={tasks} types={types} me={me} onToggle={toggle} onAdd={add} onNewType={newType} />
      </main>
    </>
  );
}
