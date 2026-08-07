import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiteNav } from '../../components/SiteNav.jsx';
import '../../styles/legal.css';

function PageHead() {
  return (
    <header className="ph ph--statement">
      <h1 className="ph__title ph__title--big">Algemene voorwaarden</h1>
      <p className="ph__body ph__body--medium">
        Hieronder vindt u de algemene voorwaarden van Sappie limoncello, u kunt deze ook{' '}
        <a href="/docs/algemene-voorwaarden-sappie-v1.0-06-11-25.pdf" download className="ph__link">downloaden</a>{' '}
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
        <p className="legal__meta-version">Laatste wijziging: 06-11-2025</p>
      </div>

      <section className="legal__section">
        <h2 className="legal__section-title">2. Totstandkoming van de overeenkomst &amp; bestelproces</h2>
        <h3 className="legal__sub-title">2.1 - Bestelproces</h3>
        <p>
          De overeenkomst tussen Sappie limoncello en de klant komt tot stand op het moment dat
          de klant een bestelling plaatst via de website www.sappie-limoncello.nl en de bestelling
          met levertijd is overeengekomen op de mail.
        </p>
        <p>
          Tijdens het bestelproces krijgt de klant de mogelijkheid om de ingevoerde gegevens te
          controleren en eventuele fouten te corrigeren voordat de bestelling wordt afgerond.
        </p>
        <h3 className="legal__sub-title">2.2 - Bestellen met betaalplicht</h3>
        <p>
          De klant voltooit de bestelling door te klikken op de knop &ldquo;Bestelling bevestigen&rdquo; (of
          een gelijkluidende duidelijke aanduiding). Door op deze knop te klikken gaat de klant een
          betalingsverplichting aan en bevestigt hij/zij de algemene voorwaarden te hebben gelezen
          en geaccepteerd.
        </p>
        <h3 className="legal__sub-title">2.3 - Bevestiging van de bestelling</h3>
        <p>
          Na het plaatsen van de bestelling ontvangt de klant per e-mail een orderbevestiging op
          het opgegeven e-mailadres.
        </p>
        <p>In deze bevestiging staan:</p>
        <ul className="legal__list">
          <li>Een overzicht van de bestelde producten;</li>
          <li>De totale prijs inclusief btw en verzendkosten;</li>
          <li>De leveringsinformatie;</li>
          <li>Een kopie of link naar de algemene voorwaarden en het herroepingsformulier (indien van toepassing).</li>
        </ul>
        <h3 className="legal__sub-title">2.4 - Opslag en toegankelijkheid van de overeenkomst</h3>
        <p>
          Sappie limoncello bewaart de overeenkomst zolang dit wettelijk vereist is en stelt deze op
          verzoek van de klant beschikbaar in leesbare vorm.
        </p>
        <h3 className="legal__sub-title">2.5 - Taal van de overeenkomst</h3>
        <p>
          De overeenkomst wordt gesloten in het Nederlands. Communicatie en documentatie
          vinden eveneens in het Nederlands plaats, tenzij anders overeengekomen.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">3. Aanbod en productinformatie</h2>
        <h3 className="legal__sub-title">3.1 - Beschrijving van het aanbod</h3>
        <p>
          Het aanbod van Sappie limoncello omvat de producten die op de website
          www.sappie-limoncello.nl of in andere offici&euml;le uitingen van het bedrijf worden
          gepresenteerd.
        </p>
        <p>
          Ieder aanbod bevat een duidelijke en volledige omschrijving van het aangeboden product,
          zodat de klant een goede beoordeling kan maken voordat hij een overeenkomst aangaat.
        </p>
        <h3 className="legal__sub-title">3.2 - Essenti&euml;le kenmerken van de producten</h3>
        <p>Bij elk product worden de volgende gegevens vermeld:</p>
        <ul className="legal__list">
          <li>De naam en omschrijving van het product;</li>
          <li>De inhoud;</li>
          <li>Het alcoholpercentage;</li>
          <li>De ingredi&euml;nten en eventuele allergenen informatie;</li>
          <li>De houdbaarheidstermijn of productiedatum indien relevant.</li>
        </ul>
        <h3 className="legal__sub-title">3.3 - Prijzen en bijkomende kosten</h3>
        <p>
          Alle prijzen die door Sappie limoncello worden vermeld, zijn exclusief btw, tenzij
          uitdrukkelijk anders is vermeld. Eventuele extra kosten, zoals verzendkosten,
          verpakkingskosten of cadeauverpakkingen, worden v&oacute;&oacute;r het afronden van de bestelling
          duidelijk weergegeven. Er worden geen verborgen kosten in rekening gebracht.
        </p>
        <h3 className="legal__sub-title">3.4 - Beschikbaarheid van het aanbod</h3>
        <p>
          Het aanbod geldt zolang de voorraad strekt. Indien een product niet langer beschikbaar is,
          wordt dit duidelijk vermeld op de website of bij het bestelproces. Sappie limoncello
          behoudt zich het recht voor om het aanbod te wijzigen of te verwijderen zonder
          voorafgaande kennisgeving.
        </p>
        <h3 className="legal__sub-title">3.5 - Druk- en zetfouten</h3>
        <p>
          Kennelijke vergissingen of fouten in het aanbod (zoals typefouten, drukfouten of
          kennelijke prijsfouten) binden Sappie limoncello niet. In dat geval wordt de klant
          hierover ge&iuml;nformeerd en krijgt deze de mogelijkheid om de bestelling kosteloos te
          annuleren of te bevestigen tegen de juiste prijs.
        </p>
        <h3 className="legal__sub-title">3.6 - Afbeeldingen en presentatie</h3>
        <p>
          De afbeeldingen op de website dienen uitsluitend ter illustratie. Vanwege het
          ambachtelijke karakter kunnen kleur, etiket of verpakking licht afwijken van de getoonde
          foto&rsquo;s.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">4. Leveringstermijn &amp; uitvoering</h2>
        <p>
          Omdat Sappie limoncello een kleine producent is, wordt de levertermijn in overleg met
          de klant vastgesteld. Na ontvangst van de bestelling neemt Sappie limoncello contact op
          via e-mail om de verwachte leverdatum af te stemmen. De levering vindt plaats binnen de
          overeengekomen termijn, tenzij partijen anders afspreken.
        </p>
        <p>
          In elk geval zal levering uiterlijk binnen 30 dagen na het sluiten van de overeenkomst
          plaatsvinden, tenzij schriftelijk een andere termijn is overeengekomen. Als levering
          binnen deze termijn niet mogelijk blijkt, wordt de klant daar tijdig over ge&iuml;nformeerd en
          heeft deze het recht de overeenkomst kosteloos te ontbinden.
        </p>
        <p>
          Levering van alcoholhoudende dranken vindt uitsluitend plaats aan personen van 18 jaar
          of ouder. De bezorger controleert dit bij aflevering; zonder geldig legitimatiebewijs wordt
          de levering geweigerd. Het risico van verlies of beschadiging van het product gaat over
          op de klant zodra deze (of een door hem aangewezen derde) de bestelling in ontvangst
          neemt.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">5. Betaling &amp; betaalmethoden</h2>
        <p>
          Betaling dient te geschieden overeenkomstig de op de factuur vermelde instructies van
          Sappie Limoncello, tenzij schriftelijk anders is overeengekomen. De standaard
          betalingstermijn bedraagt 30 dagen na factuurdatum.
        </p>
        <p>
          Alle betalingen dienen plaats te vinden zonder korting of verrekening, op de door Sappie
          Limoncello opgegeven bankrekening. De afnemer is niet gerechtigd betalingen op te
          schorten of bedragen te verrekenen met eventuele tegenvorderingen, tenzij Sappie
          Limoncello daar schriftelijk mee heeft ingestemd.
        </p>
        <p>
          Indien betaling niet binnen de gestelde termijn plaatsvindt, is de afnemer van rechtswege
          in verzuim. Vanaf dat moment is Sappie Limoncello gerechtigd wettelijke handelsrente
          (art. 6:119a BW) en redelijke buitengerechtelijke incassokosten in rekening te brengen.
        </p>
        <p>
          Alle geleverde producten blijven eigendom van Sappie Limoncello tot het moment
          waarop de afnemer volledig aan al zijn betalingsverplichtingen heeft voldaan.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">6. Leeftijdsverificatie &amp; ID-check</h2>
        <p>
          Sappie Limoncello verkoopt haar producten uitsluitend aan zakelijke afnemers die
          beschikken over een geldig KvK-nummer en btw-identificatienummer.
        </p>
        <p>
          Bij het aangaan van de overeenkomst verklaart de afnemer te handelen in de uitoefening
          van een beroep of bedrijf en bevoegd te zijn om namens dat bedrijf bestellingen te
          plaatsen. De bepalingen uit de consumentenwetgeving, waaronder regels over
          leeftijdsverificatie bij online aankoop en het herroepingsrecht, zijn niet van toepassing.
        </p>
        <p>
          Sappie limoncello levert alcoholhoudende producten uitsluitend aan bedrijven die
          voldoen aan de vereisten van de Alcoholwet. De afnemer is zelf verantwoordelijk voor
          naleving van de wettelijke leeftijdsgrens (18+) bij de verkoop of verstrekking aan derden.
        </p>
        <p>
          Indien Sappie limoncello gerede twijfel heeft over de hoedanigheid van de afnemer
          (bijvoorbeeld bij een bestelling op naam van een particulier of zonder bedrijfsgegevens),
          behoudt zij zich het recht voor om de bestelling te weigeren of aanvullende informatie te
          vragen.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">7. Herroepingsrecht &amp; retournering</h2>
        <p>
          De bepalingen over het herroepingsrecht uit de consumentenwetgeving (artikelen 6:230o
          tot en met 6:230p Burgerlijk Wetboek) zijn niet van toepassing op overeenkomsten tussen
          Sappie limoncello en haar zakelijke afnemers. Bestellingen die door zakelijke klanten
          worden geplaatst zijn bindend en kunnen niet zonder voorafgaande schriftelijke
          toestemming van Sappie limoncello worden geannuleerd of geretourneerd.
        </p>
        <p>
          Eventuele retourzendingen, ruilingen of annuleringen kunnen uitsluitend plaatsvinden na
          schriftelijke goedkeuring van Sappie limoncello en onder de voorwaarden die partijen
          daarover afzonderlijk overeenkomen. Indien retourzending wordt toegestaan, blijven de
          kosten en het risico van verzending voor rekening van de afnemer, tenzij schriftelijk
          anders is overeengekomen.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">8. Klachtenregeling/ contactpunt</h2>
        <p>
          Sappie Limoncello streeft naar een zorgvuldige productie en levering van haar producten.
          Eventuele klachten over geleverde producten of de uitvoering van de overeenkomst
          dienen binnen een redelijke termijn na constatering schriftelijk te worden gemeld aan:
        </p>
        <p>
          Sappie Limoncello<br />
          T.a.v. Klantenservice / Afhandeling klachten<br />
          E-mail: info@sappie-limoncello.nl<br />
          Adres: Kariboestraat 97, 3523 PB te Utrecht
        </p>
        <p>
          De melding dient een zo volledig mogelijke omschrijving van de klacht te bevatten, zodat
          Sappie Limoncello in staat is adequaat te reageren. Na ontvangst van de klacht ontvangt
          de afnemer een bevestiging van ontvangst. Sappie Limoncello zal de klacht vervolgens
          binnen 5 tot 10 werkdagen behandelen en de afnemer schriftelijk informeren over de
          uitkomst of voorgestelde oplossing.
        </p>
        <p>
          Klachten over zichtbare gebreken aan producten dienen binnen 48 uur na levering te
          worden gemeld; klachten over verborgen gebreken dienen zo spoedig mogelijk na
          ontdekking te worden gemeld. Indien een klacht gegrond wordt bevonden, zal Sappie
          Limoncello naar eigen keuze overgaan tot herstel, vervanging of (gedeeltelijke)
          terugbetaling.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">9. Conformiteit en wettelijke garantie</h2>
        <p>
          Sappie Limoncello staat ervoor in dat de door haar geleverde producten voldoen aan de
          overeengekomen specificaties en aan de eisen die redelijkerwijs aan producten van dit
          type mogen worden gesteld. Omdat Sappie Limoncello uitsluitend aan zakelijke afnemers
          levert, gelden de wettelijke bepalingen omtrent consumentenkoop en
          consumentengarantie niet.
        </p>
        <p>
          De afnemer is verplicht de geleverde producten bij ontvangst te controleren op zichtbare
          gebreken, afwijkingen in hoeveelheid of andere tekortkomingen. Klachten over zichtbare
          gebreken dienen binnen 48 uur na levering schriftelijk aan Sappie Limoncello te worden
          gemeld. Klachten over verborgen gebreken dienen binnen een redelijke termijn na
          ontdekking schriftelijk te worden gemeld.
        </p>
        <p>
          Indien een product aantoonbaar niet voldoet aan de overeenkomst en de klacht tijdig en
          terecht is gemeld, zal Sappie Limoncello naar eigen inzicht overgaan tot vervanging,
          herstel of (gedeeltelijke) terugbetaling.
        </p>
        <p>Deze verplichting vervalt indien:</p>
        <ul className="legal__list">
          <li>De afnemer het product onjuist heeft behandeld, opgeslagen of gebruikt;</li>
          <li>Het gebrek het gevolg is van externe omstandigheden (zoals transport- of opslagomstandigheden bij de afnemer); of</li>
          <li>Het product inmiddels is verwerkt of doorverkocht.</li>
        </ul>
        <p>
          Voor zover wettelijk toegestaan, sluit Sappie Limoncello elke verdere aansprakelijkheid
          voor schade door non-conformiteit uit.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">10. Privacy &amp; gegevensverwerking</h2>
        <p>
          Sappie Limoncello verwerkt persoonsgegevens uitsluitend in overeenstemming met de
          geldende wetgeving, waaronder de Algemene Verordening Gegevensbescherming (AVG).
          Persoonsgegevens worden alleen gebruikt voor zover dit noodzakelijk is voor de
          uitvoering van overeenkomsten, het onderhouden van klantrelaties en het voldoen aan
          wettelijke verplichtingen.
        </p>
        <p>
          In de privacyverklaring op de website wordt uitgelegd welke gegevens worden
          verzameld, voor welke doeleinden deze worden gebruikt en welke rechten betrokkenen
          hebben. Door een overeenkomst aan te gaan met Sappie Limoncello verklaart de afnemer
          kennis te hebben genomen van deze privacyverklaring.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">11. Terhandstelling van de algemene voorwaarden</h2>
        <p>
          De algemene voorwaarden van Sappie Limoncello zijn te allen tijde raadpleegbaar via de
          website en worden v&oacute;&oacute;r of bij het sluiten van de overeenkomst aan de afnemer ter
          beschikking gesteld.
        </p>
        <p>
          Bij het plaatsen van een bestelling via de website of per e-mail krijgt de afnemer de
          mogelijkheid om van de algemene voorwaarden kennis te nemen en deze te downloaden
          of op te slaan. Daarnaast worden de algemene voorwaarden meegestuurd met de
          orderbevestiging per e-mail.
        </p>
        <p>
          Door een bestelling te plaatsen verklaart de afnemer kennis te hebben genomen van de
          algemene voorwaarden van Sappie Limoncello en deze te hebben aanvaard. Indien de
          algemene voorwaarden onverhoopt niet (meer) toegankelijk zijn via de website, zal
          Sappie Limoncello deze op eerste verzoek kosteloos per e-mail of post toezenden.
        </p>
        <p>
          De meest recente versie van de algemene voorwaarden, zoals gepubliceerd op de website,
          is van toepassing op alle overeenkomsten, tenzij schriftelijk anders is overeengekomen.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">12. Toepasselijk recht &amp; bevoegde rechter</h2>
        <p>
          Op alle overeenkomsten, offertes en leveringen van Sappie Limoncello is uitsluitend
          Nederlands recht van toepassing. Eventuele geschillen tussen Sappie Limoncello en de
          afnemer zullen uitsluitend worden voorgelegd aan de bevoegde rechter in de
          vestigingsplaats waarin Sappie Limoncello is gevestigd, tenzij dwingendrechtelijke
          bepalingen anders voorschrijven of partijen schriftelijk anders overeenkomen.
        </p>
        <p>
          Indien een bepaling in deze algemene voorwaarden nietig of vernietigbaar blijkt, tast dit
          de geldigheid van de overige bepalingen niet aan. In dat geval zal de nietige bepaling
          worden vervangen door een bepaling die zoveel mogelijk aansluit bij het doel en de
          strekking van de oorspronkelijke bepaling.
        </p>
      </section>

      <section className="legal__section">
        <h2 className="legal__section-title">13. Wijziging algemene voorwaarden</h2>
        <p>
          Sappie Limoncello behoudt zich het recht voor om deze algemene voorwaarden te
          wijzigen of aan te vullen. Gewijzigde voorwaarden gelden ook voor bestaande
          overeenkomsten, met inachtneming van een termijn van 30 dagen na bekendmaking,
          tenzij schriftelijk anders is overeengekomen.
        </p>
        <p>
          De meest recente versie van de algemene voorwaarden, zoals gepubliceerd op de website,
          is van toepassing op alle overeenkomsten, tenzij schriftelijk anders is overeengekomen.
        </p>
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

export default function AlgemeneVoorwaarden() {
  return (
    <>
      <SiteNav />
      <PageHead />
      <Inhoud />
      <SiteFooter />
    </>
  );
}
