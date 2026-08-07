import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiteNav } from '../../components/SiteNav.jsx';
import '../../styles/homepage.css';
import sappieMark from '../../assets/marks/sappie-mark.png';
import iwsc93 from '../../assets/badges/iwsc-93.png';
import oscarEnJesseDomtuin from '../../assets/photos/oscar-en-jesse-domtuin.jpg';

const heroImg = '/images/hero-gracht.jpg';
const beeldmerk9 = '/images/beeldmerk-9.png';
const beeldmerk8 = '/images/beeldmerk-8.png';
const productBottle = '/images/product-bottle.jpg';
const productBottleKlassiek = '/images/product-bottle-klassiek.jpg';

const HEADLINES = [
  [{ text: 'Jochie' }, { text: 'Wijfie' }, { text: 'Sappie', dot: true }],
  [{ text: 'Gewoon' }, { text: 'Goed' }, { text: 'Sappie', dot: true }],
  [{ text: 'Sappie' }, { text: 'Doen', accentMark: '?' }],
  [{ text: 'Geen' }, { text: 'Gedoe' }, { text: 'Gewoon' }, { text: 'Sappie', dot: true }],
];
const HEADLINE_INTERVAL = 4000;

function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % HEADLINES.length);
    }, HEADLINE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const lines = HEADLINES[headlineIndex];

  return (
    <section className="hero">
      <img
        className="hero__img"
        src={heroImg}
        alt="Utrechtse gracht met de Dom op de achtergrond"
      />
      <div className="hero__overlay">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__headline" key={headlineIndex}>
              {lines.map((line, i) => (
                <React.Fragment key={i}>
                  {line.text}
                  {line.dot && <img src={sappieMark} alt="" className="hero__dot-logo" />}
                  {line.accentMark && (
                    <span className="qmark">
                      {line.accentMark}
                      <img src={sappieMark} alt="" className="qmark__dot" />
                    </span>
                  )}
                  {i < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </div>
          <div className="tiles">
            <Link to="/bestellen" className="tile tile--mark tile--mark-geel">
              <img src={beeldmerk9} alt="" className="tile__bg" />
              <span className="tile__text">Bestel<br />hier</span>
              <span className="arr">&rarr;</span>
            </Link>
            <Link to="/productie" className="tile tile--mark tile--mark-blauw">
              <img src={beeldmerk8} alt="" className="tile__bg" />
              <span className="tile__text">Ontdek<br />Sappie</span>
              <span className="arr">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waterline() {
  return (
    <div className="waterline" aria-hidden="true">
      <i className="a"></i>
      <i className="b"></i>
      <i className="c"></i>
      <i className="d"></i>
      <i className="e"></i>
    </div>
  );
}

function VariantWerf() {
  return (
    <>
      <section className="intro">
        <h2 className="intro__title">De beste van <span className="hl-red">Utereg</span> en omstreken.</h2>
        <p className="intro__body">
          In 2026 behaalde Sappie maar liefst <a href="https://www.iwsc.net/results/detail/173259/limoncello" target="_blank" rel="noreferrer">93/100 punten</a> bij de International
          Wine &amp; Spirit Competition. Hiermee zijn we niet alleen de beste van
          Utrecht en omstreken, maar de twee na beste van Nederland!
        </p>
      </section>

      <div className="stack">
        <div className="panel panel--sage">
          <span className="panel__num">01</span>
          <h3 className="panel__title">Bereiding</h3>
          <div className="panel__body panel__body--wide">
            <p className="panel__text">
              Sappie Limoncello wordt volledig met de hand gemaakt, wij schillen,
              bottelen, labelen &amp; bezorgen alles zelf! Zo garanderen we kwaliteit
              en blijven we persoonlijk betrokken bij ons product.
            </p>
          </div>
        </div>
        <div className="panel panel--blauw">
          <span className="panel__num">02</span>
          <h3 className="panel__title">Ingredi&euml;nten</h3>
          <div className="panel__body panel__body--wide">
            <p className="panel__text">
              Voor ons Sappie gebruiken wij slechts vier ingredi&euml;nten, zo houden we
              het zo natuurlijk mogelijk! Amalficitroenen, suiker, alcohol &amp; water.
            </p>
          </div>
        </div>
        <div className="panel panel--olijf">
          <span className="panel__num">03</span>
          <h3 className="panel__title">Duurzaamheid</h3>
          <div className="panel__body panel__body--wide">
            <p className="panel__text">
              We proberen zo veel mogelijk van onze grondstoffen te gebruiken, zo
              maken we van het citroensap heerlijke limonade! Ook leveren wij alle
              Sappies met elektrisch vervoer, zo houden we onze impact laag.
            </p>
          </div>
        </div>
        <div className="panel panel--geel">
          <span className="panel__num">04</span>
          <h3 className="panel__title">Waarom kiezen voor Sappie?</h3>
          <div className="panel__body panel__body--wide">
            <p className="panel__text">
              Omdat je kiest voor lokale Uteregse ondernemers! Elke fles wordt
              door ons (Jesse &amp; Oscar) gemaakt, zonder fabriek of tussenpersonen.
              Daardoor houden we het simpel en puur: <strong>Geen gedoe, gewoon Sappie!</strong>
            </p>
          </div>
        </div>
      </div>

      <section className="shop shop--home">
        <h2 className="shop__title">Welke <span className="hl-blauw">Sappies</span> kan ik kopen?</h2>
        <p className="shop__intro">
          Als ondernemer kun je onze limoncello direct kopen vanaf onze website. Klik op één
          van de onderstaande producten om naar de bestelpagina te gaan. Als particulier kun je
          ons Sappie vinden bij een van onze verschillende <Link to="/winkels-en-restaurants">verkooppunten</Link> in Utrecht.
        </p>
        <div className="shop__grid">
          <Link to="/bestellen" className="prod prod--geel">
            <div className="prod__photo">
              <img src={productBottle} alt="Klein Sappie" className="prod__img" />
            </div>
            <div className="prod__body prod__body--geel">
              <h3 className="prod__name">Klein Sappie <span className="prod__ml">- 100ml</span></h3>
              <p className="prod__text">De kleinste van onze flesjes, ideaal voor in cadeau- of kerstpakketten.</p>
              <p className="prod__price">&euro;5,50</p>            </div>
          </Link>
          <Link to="/bestellen" className="prod prod--blauw">
            <div className="prod__photo">
              <img src={productBottleKlassiek} alt="Klassiek Sappie" className="prod__img" />
              <img src={iwsc93} alt="IWSC 93 punten, iwsc.net 2026" className="prod__badge" />
            </div>
            <div className="prod__body prod__body--blauw">
              <h3 className="prod__name">Klassiek Sappie <span className="prod__ml">- 500ml</span></h3>
              <p className="prod__text">Onze klassieke halve liter fles, zoals verkrijgbaar bij de winkels en slijterijen.</p>
              <p className="prod__price">&euro;18,50</p>            </div>
          </Link>
          <Link to="/bestellen" className="prod prod--sage">
            <div className="prod__photo">
              <img src={productBottle} alt="Groot Sappie" className="prod__img" />
            </div>
            <div className="prod__body prod__body--sage">
              <h3 className="prod__name">Groot Sappie <span className="prod__ml">- 1000ml</span></h3>
              <p className="prod__text">Een liter Sappie, voor jezelf of om uit te delen aan vrienden en familie.</p>
              <p className="prod__price">&euro;32,95</p>            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

function MakersFoto() {
  return (
    <figure className="hp-story__photo">
      <img src={iwsc93} alt="IWSC 93 punten, iwsc.net 2026" className="hp-story__badge" />
      <img src={oscarEnJesseDomtuin} alt="Oscar &amp; Jesse in de Domtuin" className="hp-story__img" />
      <figcaption className="hp-story__cap">Oscar &amp; Jesse</figcaption>
    </figure>
  );
}

function MakersVerhaal() {
  return (
    <section className="hp-story">
      <h2 className="hp-story__title">Wie maakt mijn <span className="hl-geel">Sappie</span> eigenlijk?</h2>
      <MakersFoto />
      <div className="hp-story__body">
        <p className="hp-story__name">Jesse van de Veen</p>
        <p>
          Ciao! Ik ben Jesse, medeoprichter van Sappie. Ik werk al meer dan 3 jaar in de wondere
          wereld van de slijterij, bij de Una M&aacute;s in Utrecht. In deze tijd heb ik de nodige
          limoncello&rsquo;s geproefd om te weten wat er nodig is om een citroen &eacute;cht tot
          leven te brengen. Naast mijn liefde voor smaak heb ik een passie voor taal. Bij Sappie
          houd ik me daarom veel bezig met marketing, communicatie en eigenlijk alles wat er om
          het goudgele flesje heen draait voor de verkoop.
        </p>
        <p>
          Ik ben ambitieus en fiets als fijnproever door het leven. Elke dag moet smaken alsof je
          verse citroenrasp aan je vingers ruikt. Niets minder! Ook gezelligheid vertaal ik maar al
          te graag naar een goede borrel; misschien dat Oscar en ik daarom vaak in de gelegenheid
          zijn om over onze limoncello te praten&hellip; Proost!
        </p>
        <p className="hp-story__name">Oscar den Uijl</p>
        <p>
          Hoi! Ik ben Oscar, tevens medeoprichter van Sappie. Overdag werk ik als adviseur
          ruimtelijke ordening bij Oranje Uil en binnen Sappie houd ik me bezig met alles achter
          de schermen: van de inkoop en administratie tot de website en de dagelijkse organisatie.
        </p>
        <p>
          Ik hou ervan om dingen goed te regelen en hoop Sappie zo verder te kunnen laten groeien.
          In mijn vrije tijd sport ik graag, maar nog liever sluit ik aan bij een goeie borrel.
        </p>
      </div>
    </section>
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

export default function Homepage() {
  return (
    <>
      <SiteNav />
      <Hero />
      <Waterline />
      <VariantWerf />
      <MakersVerhaal />
      <SiteFooter />
    </>
  );
}
