import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiteNav } from '../../components/SiteNav.jsx';
import '../../styles/legal.css';

function PageHead() {
  return (
    <header className="ph ph--statement">
      <h1 className="ph__title ph__title--big">Privacy statement</h1>
      <p className="ph__body ph__body--medium">
        Hieronder vindt u het privacy statement van Sappie limoncello, u kunt deze ook{' '}
        <a href="/docs/privacy-statement-sappie-v1.0-10-11-25.pdf" download className="ph__link">downloaden</a>{' '}
        voor mogelijk betere leesbaarheid. Vragen? Mail naar{' '}
        <a href="mailto:info@sappie-limoncello.nl" className="ph__link">info@sappie-limoncello.nl</a>.
      </p>
    </header>
  );
}

function Inhoud() {
  return (
    <div className="legal">
      <div className="legal__meta">
        <p><strong>Naam onderneming:</strong> Sappie limoncello</p>
        <p><strong>Rechtsvorm:</strong> VOF</p>
        <p><strong>KvK-nummer:</strong> 98649167</p>
        <p><strong>Btw-identificatienummer:</strong> NL868584344B01</p>
        <p><strong>Vestigingsadres:</strong> Kariboestraat 97, 3523 PB te Utrecht</p>
        <p><strong>E-mailadres:</strong> info@sappie-limoncello.nl</p>
        <p><strong>Website:</strong> www.sappie-limoncello.nl</p>
        <p><strong>Contactpersonen:</strong> Oscar den Uijl &amp; Jesse van de Veen</p>
        <p className="legal__meta-version">Versie: 1.0 - November 2025</p>
        <p className="legal__meta-version">Laatste wijziging: 10-11-2025</p>
      </div>

      <section className="legal__section">
        <h2 className="legal__section-title">2. Identiteit en contactgegevens van de verwerkingsverantwoordelijke</h2>
        <p>
          De organisatie die deze privacyverklaring publiceert is verantwoordelijk voor de verwerking van
          persoonsgegevens. Zij zorgt ervoor dat alle persoonsgegevens zorgvuldig en in overeenstemming
          met de Algemene Verordening Gegevensbescherming (AVG) en de Uitvoeringswet AVG
          (UAVG) worden verwerkt. De organisatie is bereikbaar voor vragen over privacy of
          gegevensbescherming via:
        </p>
        <p>
          Kariboestraat 97, 3523 PB te Utrecht<br />
          Oscar den Uijl &amp; Jesse van de Veen<br />
          info@sappie-limoncello.nl
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">3. Welke persoonsgegevens worden verwerkt</h2>
        <p>
          Wij verwerken alleen persoonsgegevens die noodzakelijk zijn voor het uitvoeren van onze
          bedrijfsactiviteiten en het onderhouden van contact met klanten, leveranciers en andere relaties.
          De gegevens die wij kunnen verwerken zijn onder meer:
        </p>
        <ul className="legal__list">
          <li>Naam en contactgegevens: zoals voor- en achternaam, bedrijfsnaam, e-mailadres en telefoonnummer;</li>
          <li>Adres- en factuurgegevens: waaronder straatnaam, postcode, plaats, land en eventueel afleveradres;</li>
          <li>Betaalgegevens: zoals een bankrekeningnummer, betaalstatus of factuurnummer, uitsluitend voor het verwerken van betalingen en het voeren van een juiste administratie;</li>
          <li>Communicatiegegevens: informatie die wordt verstrekt via e-mail, telefonisch contact of via formulieren op de website;</li>
        </ul>
        <p>
          Wij verwerken geen bijzondere of gevoelige persoonsgegevens, zoals informatie over ras,
          gezondheid, religie, politieke voorkeur, seksuele geaardheid of strafrechtelijke gegevens.
        </p>
        <p>
          Wanneer wij persoonsgegevens verwerken die niet rechtstreeks van de betrokkene afkomstig zijn
          (bijvoorbeeld contactgegevens die door een bedrijf worden opgegeven voor leveringen of
          facturatie), gaan wij ervan uit dat deze gegevens met toestemming of op rechtmatige grondslag
          zijn verstrekt.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">4. Ontvangers van persoonsgegevens</h2>
        <p>
          Wij verwerken persoonsgegevens in principe zelf en delen deze niet met derden, tenzij dit
          noodzakelijk is voor de uitvoering van onze dienstverlening of om te voldoen aan wettelijke
          verplichtingen.
        </p>
        <p>
          Wanneer derden toch betrokken zijn bij de verwerking van persoonsgegevens, bijvoorbeeld
          partijen die zorg dragen voor hosting, boekhouding, betalingen of verzending dan gebeurt dit
          uitsluitend voor zover dat nodig is voor de overeengekomen dienstverlening. Deze partijen
          verwerken persoonsgegevens uitsluitend in onze opdracht en zijn verplicht de gegevens veilig en
          vertrouwelijk te behandelen.
        </p>
        <p>
          Waar dat wettelijk vereist is, sluiten wij met deze partijen een verwerkersovereenkomst om te
          waarborgen dat persoonsgegevens zorgvuldig worden verwerkt en niet voor andere doeleinden
          worden gebruikt.
        </p>
        <p>
          Wij verkopen of verhuren persoonsgegevens nooit aan derden. Gegevens worden alleen verstrekt
          als wij daartoe wettelijk verplicht zijn, bijvoorbeeld aan de Belastingdienst of
          opsporingsinstanties.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">5. Bewaartermijnen</h2>
        <p>
          Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor het doel waarvoor deze zijn
          verzameld of verwerkt. De duur van de bewaartermijn is afhankelijk van de aard van de gegevens
          en het doel van de verwerking. Daarbij worden de volgende richtlijnen gehanteerd:
        </p>
        <ul className="legal__list">
          <li>Administratieve en factuurgegevens: worden tot maximaal 7 jaar na de laatste transactie bewaard, om te voldoen aan de fiscale bewaarplicht vanuit de Belastingwetgeving;</li>
          <li>Communicatie- en klantcontactgegevens: worden bewaard zolang de zakelijke relatie bestaat, of totdat een verzoek tot verwijdering wordt ontvangen en er geen wettelijke verplichting bestaat om de gegevens langer te bewaren;</li>
          <li>Technische en website gerelateerde gegevens (zoals cookies, IP-adressen en statistieken) worden bewaard conform de bewaartermijnen die zijn opgenomen in het cookiebeleid en/of de instellingen van gebruikte analysetools.</li>
        </ul>
        <p>
          Na afloop van de toepasselijke bewaartermijn worden persoonsgegevens veilig verwijderd,
          geanonimiseerd of gearchiveerd op een manier die voorkomt dat ze nog langer voor identificatie
          van personen kunnen worden gebruikt. In uitzonderlijke gevallen kunnen persoonsgegevens
          langer worden bewaard, bijvoorbeeld wanneer dit noodzakelijk is voor het afhandelen van
          geschillen, juridische procedures of om te voldoen aan wettelijke verplichtingen.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">6. Doorgifte van gegevens buiten de Europese Economische Ruimte (EER)</h2>
        <p>
          Persoonsgegevens worden in principe alleen verwerkt binnen Nederland of binnen de Europese
          Economische Ruimte (EER). Wanneer persoonsgegevens toch buiten de EER worden opgeslagen
          of verwerkt, bijvoorbeeld doordat gebruik wordt gemaakt van internationale IT- of
          cloud-diensten, gebeurt dit uitsluitend als het betreffende land een passend beschermingsniveau
          biedt volgens de AVG.
        </p>
        <p>
          Als dat niet het geval is, worden passende waarborgen getroffen, zoals het gebruik van door de
          Europese Commissie goedgekeurde standaard contractbepalingen of deelname aan het EU&ndash;VS
          Data Privacy Framework.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">7. Wijziging van het privacy statement</h2>
        <p>
          Deze privacyverklaring kan van tijd tot tijd worden gewijzigd. Eventuele aanpassingen worden
          gepubliceerd op deze website met vermelding van de datum van de laatste wijziging. Bij
          ingrijpende wijzigingen of wanneer dit wettelijk verplicht is, wordt dit tevens via e-mail of een
          andere directe kennisgeving aan betrokkenen gecommuniceerd.
        </p>
        <p>De meest recente versie van de privacyverklaring is altijd van toepassing.</p>
      </section>
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
          <a href="tel:+31657966718" className="foot__link foot__tel"><span className="foot__tel-name">Jesse</span>06 57 96 67 18</a>
          <a href="tel:+31619365416" className="foot__link foot__tel"><span className="foot__tel-name">Oscar</span>06 19 36 54 16</a>
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

export default function PrivacyStatement() {
  return (
    <>
      <SiteNav />
      <PageHead />
      <Inhoud />
      <SiteFooter />
    </>
  );
}
