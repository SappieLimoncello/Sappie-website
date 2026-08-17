import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiteNav } from '../../components/SiteNav.jsx';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/siroop.css';

const siroopFles = '/images/siroop-fles.jpg';
const lekkerBootjeVaren = '/images/lekker-bootje-varen.png';

const PRIJS_PER_FLES = 8.99;

// Tijdelijk: siroop-bestellen staat on hold terwijl deze pagina wordt
// bijgewerkt. Op false zetten herstelt meteen de volledige bestelflow.
const SIROOP_COMING_SOON = true;

function euro(bedrag) {
  return bedrag.toFixed(2).replace('.', ',');
}

function PageHead() {
  const markColor = useRandomMark();
  if (SIROOP_COMING_SOON) {
    return (
      <header className="ph ph--statement">
        <span className="ph__eyebrow">Bestellen</span>
        <h1 className="ph__title ph__title--big">
          Sappie <span className={`ph__mark ${markColor}`}>siroop</span>
        </h1>
      </header>
    );
  }
  return (
    <header className="ph ph--statement">
      <span className="ph__eyebrow">Bestellen</span>
      <h1 className="ph__title ph__title--big">
        Hoeveel <span className={`ph__mark ${markColor}`}>siroop</span> wil je bestellen?
      </h1>
      <p className="ph__body ph__body--medium">
        Kies hieronder je aantal flessen. Je bestelling wordt persoonlijk door ons bevestigd
        voordat er iets verzonden wordt.
      </p>
    </header>
  );
}

function ComingSoon() {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: '1rem 1.5rem 6rem', textAlign: 'center' }}>
      <div style={{
        border: '2px solid var(--olijf-zwart)', backgroundColor: 'var(--creme)',
        padding: '2.5rem 2rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.06em', fontSize: '1.1rem', margin: '0 0 0.75rem', color: 'var(--olijf-zwart)',
        }}>
          Binnenkort beschikbaar
        </p>
        <p style={{ margin: 0, color: 'var(--olijf-zwart)', lineHeight: 1.6 }}>
          Binnenkort kun je Sappie limonade siroop bestellen bij ons op de website. Hou de{' '}
          <a
            href="https://www.instagram.com/sappie_limoncello/"
            target="_blank"
            rel="noreferrer"
            className="ph__link"
          >
            Instagram
          </a>{' '}
          in de gaten voor meer informatie.
        </p>
      </div>
    </div>
  );
}

function SiroopCard({ aantal, onMinder, onMeer }) {
  return (
    <div className="siroop__prod">
      <div className="siroop__prod-photo">
        <img src={siroopFles} alt="Sappie Siroop" className="siroop__prod-img" />
      </div>
      <div className="siroop__prod-body">
        <h2 className="siroop__prod-name">Sappie Siroop <span className="siroop__prod-ml">- 700ml</span></h2>
        <p className="siroop__prod-text">
          Onze huisgemaakte limonadesiroop, gemaakt met het citroensap van onze Amalficitroenen.
        </p>
        <div className="siroop__prod-pricerow">
          <button type="button" className="siroop__prod-qtybtn" onClick={onMinder} disabled={aantal === 0} aria-label="Minder">&minus;</button>
          <p className="siroop__prod-price">&euro;{euro(PRIJS_PER_FLES)}</p>
          <button type="button" className="siroop__prod-qtybtn" onClick={onMeer} aria-label="Meer">+</button>
        </div>
        <p className="siroop__prod-vat">(Inclusief BTW)</p>
      </div>
    </div>
  );
}

function SiroopInfo() {
  return (
    <div className="siroop__info">
      <h3 className="siroop__info-title">Belangrijk om te weten</h3>
      <ul className="siroop__info-list">
        <li>Let op! Sappie siroop bezorgen we niet thuis.</li>
        <li>
          Na bestellen krijg je een unieke afhaalcode. Hiermee kun je de siroop afhalen bij Lekkerbootjevaren
          (<a href="https://www.google.com/maps/search/?api=1&query=Wittevrouwensingel+95%2C+3514+AL+Utrecht" target="_blank" rel="noreferrer" className="siroop__info-link">Wittevrouwensingel 95, 3514 AL Utrecht</a>).
        </li>
        <li>Ophalen kan op maandag tussen xx:xx en xx:xx, en op woensdag tussen xx:xx en xx:xx.</li>
      </ul>
      <img src={lekkerBootjeVaren} alt="" className="siroop__info-boat" />
    </div>
  );
}

function SiroopKassabon({ aantal, totaal }) {
  return (
    <div className="siroop__cart-col">
      <aside className="siroop__cart">
        <h3 className="siroop__cart-title">Jouw kassabon</h3>
        {aantal === 0 ? (
          <p className="siroop__cart-empty">Nog niets geselecteerd.</p>
        ) : (
          <ul className="siroop__cart-list">
            <li className="siroop__cart-item">
              <span className="siroop__cart-item-name">{aantal}&times; Sappie Siroop</span>
              <span>&euro;{euro(totaal)}</span>
            </li>
          </ul>
        )}
        <div className="siroop__cart-subtotal">
          <span>Totaal incl. btw</span>
          <span>&euro;{euro(totaal)}</span>
        </div>
      </aside>
      <button type="button" className="siroop__cart-cta">Verder met bestellen</button>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="foot foot--home">
      <div className="foot__in">
        <div className="foot__brand">
          <p className="foot__word">Sappie Limoncello<span className="drop">.</span></p>
          <p className="foot__text foot__kvk">KVK 98649167<br className="foot__kvk-break" /><span className="foot__dot"> &bull; </span>BTW NL868584344B01</p>
          <div className="foot__legal">
            <Link to="/algemene-voorwaarden" className="foot__legal-link">Algemene voorwaarden</Link>
            <span className="foot__legal-sep">&bull;</span>
            <Link to="/privacy-statement" className="foot__legal-link">Privacy statement</Link>
          </div>
        </div>
        <div className="foot__col foot__col--contact">
          <p className="foot__col-title">Contact</p>
          <a href="mailto:info@sappie-limoncello.nl" className="foot__link">info@sappie-limoncello.nl</a>
          <a href="tel:+31657966718" className="foot__link">Jesse: 06 57 96 67 18</a>
          <a href="tel:+31619365416" className="foot__link">Oscar: 06 19 36 54 16</a>
        </div>
        <div className="foot__col foot__col--menu">
          <p className="foot__col-title">Menu</p>
          <Link to="/" className="foot__link">Home</Link>
          <Link to="/productie" className="foot__link">Productie</Link>
          <Link to="/winkels-en-restaurants" className="foot__link">Verkooppunten</Link>
          <Link to="/reviews" className="foot__link">Reviews</Link>
          <Link to="/contact" className="foot__link">Contact</Link>
        </div>
        <div className="foot__col foot__col--social">
          <div className="foot__social-wrap">
            <p className="foot__col-title">Volg ons</p>
            <a
              href="https://www.instagram.com/sappie_limoncello/"
              className="foot__social"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={44} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SiroopBestellen() {
  const [aantal, setAantal] = useState(0);
  const minder = () => setAantal((n) => Math.max(0, n - 1));
  const meer = () => setAantal((n) => Math.min(24, n + 1));
  const totaal = PRIJS_PER_FLES * aantal;

  return (
    <>
      <SiteNav />
      <PageHead />
      {SIROOP_COMING_SOON ? (
        <ComingSoon />
      ) : (
        <div className="siroop">
          <div className="siroop__row">
            <SiroopCard aantal={aantal} onMinder={minder} onMeer={meer} />
            <SiroopInfo />
            <SiroopKassabon aantal={aantal} totaal={totaal} />
          </div>
        </div>
      )}
      <SiteFooter />
    </>
  );
}
