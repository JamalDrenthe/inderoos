const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="mono text-[#D61C1C] mb-4 block">JURIDISCH</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacyverklaring</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Inleiding</h2>
              <p className="text-[#A7A7AB] mb-4">
                Gang2Bang respecteert de privacy van alle bezoekers en deelnemers aan onze evenementen. 
                In deze privacyverklaring leggen we uit welke persoonlijke gegevens we verzamelen, 
                hoe we deze gebruiken en welke rechten je hebt.
              </p>
              <p className="text-[#A7A7AB]">
                Deze privacyverklaring is conform de Algemene Verordening Gegevensbescherming (AVG).
              </p>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Verwerkingsverantwoordelijke</h2>
              <p className="text-[#A7A7AB] mb-4">
                Gang2Bang is de verwerkingsverantwoordelijke voor de verwerking van jouw persoonsgegevens. 
                Voor vragen over deze privacyverklaring kun je contact opnemen via:
              </p>
              <ul className="space-y-2 text-[#A7A7AB]">
                <li>E-mail: info@gang2bang.nl</li>
                <li>Website: www.gang2bang.nl</li>
              </ul>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Welke gegevens verzamelen we?</h2>
              <p className="text-[#A7A7AB] mb-4">
                We verzamelen alleen de gegevens die noodzakelijk zijn voor de organisatie van onze evenementen:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li>Naam en voornaam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Geboortedatum (voor leeftijdsverificatie)</li>
                <li>Reserveringsgeschiedenis</li>
              </ul>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Waarom verzamelen we deze gegevens?</h2>
              <p className="text-[#A7A7AB] mb-4">
                We gebruiken jouw gegevens voor de volgende doeleinden:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li>Het verwerken van reserveringen</li>
                <li>Het versturen van bevestigingen en herinneringen</li>
                <li>Leeftijdsverificatie bij evenementen</li>
                <li>Het verwerken van betalingen</li>
                <li>Het beantwoorden van vragen</li>
                <li>Het verbeteren van onze diensten</li>
              </ul>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Grondslag voor verwerking</h2>
              <p className="text-[#A7A7AB] mb-4">
                We verwerken jouw gegevens op basis van:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li><strong>Uitvoering van overeenkomst:</strong> Voor het organiseren van evenementen waarvoor je hebt gereserveerd.</li>
                <li><strong>Wettelijke verplichting:</strong> Voor leeftijdsverificatie (18+).</li>
                <li><strong>Toestemming:</strong> Voor het versturen van nieuwsbrieven (alleen met jouw expliciete toestemming).</li>
                <li><strong>Gerechtvaardigd belang:</strong> Voor het verbeteren van onze diensten.</li>
              </ul>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Hoe lang bewaren we je gegevens?</h2>
              <p className="text-[#A7A7AB] mb-4">
                We bewaren je gegevens niet langer dan noodzakelijk:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li>Reserveringsgegevens: 2 jaar na het laatste evenement</li>
                <li>Contactgegevens: zolang je actief bent als deelnemer</li>
                <li>Financiële gegevens: 7 jaar (wettelijke bewaarplicht)</li>
              </ul>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Delen met derden</h2>
              <p className="text-[#A7A7AB] mb-4">
                We delen je gegevens alleen met derden wanneer dit noodzakelijk is:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li>Betaalproviders (Tikkie) voor het verwerken van betalingen</li>
                <li>Overheidsinstanties wanneer wettelijk verplicht</li>
              </ul>
              <p className="text-[#A7A7AB] mt-4">
                We verkopen je gegevens nooit aan derden.
              </p>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Beveiliging</h2>
              <p className="text-[#A7A7AB] mb-4">
                We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen 
                tegen verlies, misbruik en onbevoegde toegang:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li>Versleutelde verbindingen (HTTPS/SSL)</li>
                <li>Beveiligde servers</li>
                <li>Toegangsbeperking tot geautoriseerd personeel</li>
                <li>Reguliere beveiligingsupdates</li>
              </ul>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Jouw rechten</h2>
              <p className="text-[#A7A7AB] mb-4">
                Onder de AVG heb je de volgende rechten:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li><strong>Recht op inzage:</strong> Je mag weten welke gegevens we van je hebben.</li>
                <li><strong>Recht op correctie:</strong> Je mag onjuiste gegevens laten corrigeren.</li>
                <li><strong>Recht op verwijdering:</strong> Je mag vragen om verwijdering van je gegevens.</li>
                <li><strong>Recht op beperking:</strong> Je mag vragen om beperking van de verwerking.</li>
                <li><strong>Recht op bezwaar:</strong> Je mag bezwaar maken tegen de verwerking.</li>
                <li><strong>Recht op dataportabiliteit:</strong> Je mag je gegevens in een machineleesbaar formaat ontvangen.</li>
              </ul>
              <p className="text-[#A7A7AB] mt-4">
                Om deze rechten uit te oefenen, kun je contact opnemen via info@gang2bang.nl.
              </p>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
              <p className="text-[#A7A7AB] mb-4">
                Onze website maakt gebruik van cookies voor de volgende doeleinden:
              </p>
              <ul className="space-y-2 text-[#A7A7AB] list-disc list-inside">
                <li><strong>Functionele cookies:</strong> Noodzakelijk voor het werken van de website.</li>
                <li><strong>Analytische cookies:</strong> Om het gebruik van de website te analyseren.</li>
              </ul>
              <p className="text-[#A7A7AB] mt-4">
                Je kunt cookies uitschakelen in je browserinstellingen, maar dit kan de werking van de website beïnvloeden.
              </p>
            </div>

            <div className="card-dark p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Wijzigingen</h2>
              <p className="text-[#A7A7AB]">
                We kunnen deze privacyverklaring van tijd tot tijd wijzigen. 
                Wijzigingen worden op deze pagina gepubliceerd. We raden je aan om deze verklaring regelmatig te raadplegen.
              </p>
            </div>

            <div className="card-dark p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p className="text-[#A7A7AB] mb-4">
                Voor vragen over deze privacyverklaring of het uitoefenen van je rechten, 
                kun je contact opnemen via:
              </p>
              <ul className="space-y-2 text-[#A7A7AB]">
                <li>E-mail: info@gang2bang.nl</li>
                <li>Website: www.gang2bang.nl/contact</li>
              </ul>
              <p className="text-[#A7A7AB] mt-4">
                Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.
              </p>
            </div>
          </div>

          <p className="text-[#A7A7AB] text-sm mt-8 text-center">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
