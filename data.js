var B1 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var data_exports = {};
  __export(data_exports, {
    SIMS: () => SIMS,
    bare: () => bare,
    grade: () => grade,
    norm: () => norm,
    scorePart: () => scorePart
  });
  const T = "Adevărat (A)";
  const F = "Fals (F)";
  const AF = [T, F];
  const norm = (s) => s.toLowerCase().replace(/ş/g, "ș").replace(/ţ/g, "ț").trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
  const bare = (s) => norm(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function grade(kind, it, v) {
    if (!v || !v.trim()) return "empty";
    if (kind === "choice") return v === it.ans[0] ? "ok" : "bad";
    if (it.ans.some((a) => norm(a) === norm(v))) return "ok";
    if (it.ans.some((a) => bare(a) === bare(v))) return "okd";
    return "bad";
  }
  function scorePart(p, a) {
    let got = 0;
    let total = 0;
    p.exs.forEach((e) => {
      if (e.kind === "open") return;
      e.items.forEach((it) => {
        total += 1;
        const g = grade(e.kind, it, a[it.id] || "");
        if (g === "ok" || g === "okd") got += 1;
      });
    });
    return { got, total };
  }
  const SOMN = `Importanţa somnului pentru organism

Somnul este extrem de important pentru organism. În timp ce dormim, organismul nostru îşi reface rezervele de energie.
La Universitatea din Chicago, un experiment făcut pe 11 tineri sănătoşi a arătat cu claritate care sunt efectele lipsei de somn. Cei 11 tineri au dormit doar patru ore pe noapte, timp de şase zile. La sfârşitul experimentului, celulele corpului lor funcţionau la fel cu celulele unei persoane de 60 de ani. De asemenea, s-a constatat că lipsa somnului creşte riscul apariţiei infecţiilor şi a bolilor aparatului circulator.
Efectele lipsei de somn sunt de două feluri: efecte imediate şi efecte pe termen lung. Printre efectele imediate se numără: somnolenţa, afectarea temporară a memoriei, continua stare de oboseală, schimbarea dispoziţiei, dificultatea de concentrare. A doua categorie de efecte cuprinde: îmbătrânirea mai rapidă decât cea normală, oboseala cronică, pierderea cronică a memoriei, apariţia infecţiilor, a bolilor cardiovasculare şi altele.
Un profesor de la un centru de studiere a somnului din Brazilia spune: „Dacă ar şti ce se întâmplă cu cineva care nu doarme suficient, oamenii s-ar gândi mai mult înainte de a spune că somnul este o pierdere de timp sau că e doar pentru leneşi”.
Ce se întâmplă însă când simţim că vrem să dormim după-amiaza? Acesta nu este un semn că nu dormim suficient noaptea. Somnolenţa de după-amiază este absolut normală, fiindcă este cauzată de o scădere a temperaturii corpului şi de faptul că, după ce mâncăm, creierul nostru nu mai primeşte destul oxigen. Probabil că acesta este motivul pentru care, în unele ţări, după masa de prânz, oamenii îşi fac siesta, adică iau o pauză şi trag un pui de somn.`;
  const TABERE = `Tabere pentru tineri

Pentru vara lui 2007, ANT (Autoritatea Naţională pentru Tineret) pune la dispoziţia tinerilor un număr de aproape şapte mii de locuri de cazare, în 65 de centre de agrement. Clujenii pot beneficia de ofertele ANT prin Direcţia judeţeană pentru Tineret (DJT). Taberele pentru tineri nu mai seamănă deloc cu taberele „tradiţionale”. ANT are o politică mai bună în acest an: centre mai puţine, dar condiţii mai bune. Partea unde s-a lucrat cel mai mult este cea a serviciilor alimentare: tinerii vor cunoaşte dinainte meniul, detaliat, pentru fiecare zi de şedere în vacanţă, ca să nu existe niciun fel de surprize la acest capitol.
Aceste tabere nu sunt destinate doar elevilor şi studenţilor, ci tinerilor, în general. Nu este necesar ca tinerii să fie încadraţi în sistemul de învăţământ. În plus, pentru fiecare zece persoane care se înscriu într-unul din programele Direcţiei judeţene pentru Tineret, a unsprezecea persoană primeşte gratuitate. Ea este considerată însoţitor de grup. Această persoană nu trebuie să fie obligatoriu un profesor, cum a fost înainte, în vechile tabere, ci numai un adult responsabil. El trebuie să rezolve problemele care apar şi să asigure o bună comunicare între centrul de agrement şi DJT.
Oferta prezintă nu numai tabere de odihnă, ci şi tabere tematice, în toată ţara, la preţuri mici. De exemplu, există tabere de engleză, jurnalism, dans, literatură, artă fotografică şi design vestimentar, dar şi tabere de cantonament sportiv, orientare turistică şi turism montan.
Distracţia începe la mijlocul lunii iunie şi continuă pe perioada a 13 serii. Fiecare serie durează câte o săptămână. Preţurile pentru o zi de cazare cu pensiune completă este de 35 de lei şi poate să ajungă până la 43 de lei, în funcţie de destinaţia aleasă. Preţurile sunt puţin mai mari pentru taberele tematice.
(după „Foaia Transilvană”, nr. 20/2007)`;
  const TAB_OPTS = [
    "a. În unele tabere se face o selecţie după specializări.",
    "b. O persoană matură are grijă de fiecare grup.",
    "c. Costul biletelor diferă după locul unde se organizează tabăra.",
    "d. E posibil ca unele persoane să nu plătească biletul.",
    "e. În acest an, tinerilor li se oferă un număr foarte mare de tabere de vară."
  ];
  const SARE = `Sarea, ca multe alte condimente, e esenţială pentru noi. Dacă acum o folosim numai pentru mâncare, în epoca romană sarea a funcţionat ca o adevărată valută, pentru că soldaţii romani au primit mult timp salariul în sare. Acum, sarea e foarte ieftină, însă foarte importantă. Chiar dacă, de obicei, sarea e considerată dăunătoare pentru organism, uneori ea are efecte benefice. Acestea se manifestă în special iarna. Cercetătorii de la Universitatea din St. Petersburg au demonstrat anul trecut că populaţiile europene din ţările nordice, unde iernile sunt mai lungi şi mai friguroase, au nevoie de o cantitate mai mare de sare. Atunci când oamenii stau mai mult în frig, corpul are nevoie de mai mult sodiu, care e folosit în procesele prin care se reglează temperatura corpului. Un organism care nu se poate adapta uşor la frig, va obliga creierul să găsească noi soluţii pentru încălzire. Pentru acest lucru, e nevoie de multă energie şi diferite organe din corp vor fi afectate. În aceste perioade, corpul este mai sensibil, mai fragil şi se îmbolnăveşte mai uşor.
(după „Felicia”, nr. 80/ianuarie 2008)`;
  const JOCURI = `Ziarista: Doamnă psiholog, credeţi că e normal ca orice copil să poată cumpăra jocuri pe calculator sau să le descarce direct de pe internet? Nu credeţi că unii dintre ei sunt prea mici pentru a se distra cu arme în lumea virtuală?
Psihologul: Într-adevăr, mulţi copii cumpără jocuri violente, dar asta numai pentru că vânzătorii nu respectă interdicţia de a vinde aceste produse copiilor sub 16 ani.
Ziarista: Şi eu am crezut că vânzătorii sunt principalii vinovaţi, dar într-o zi, când mă aflam într-un astfel de magazin, am văzut câţiva părinţi care, la sugestia copiilor, cumpărau asemenea jocuri.
Psihologul: E o situaţie regretabilă şi greu de înţeles!
Ziarista: Da, ca şi atunci când părinţii se relaxează, într-o altă cameră, la televizor şi copiii se joacă fără grijă.
Psihologul: Se întâmplă ca părinţii să profite de această pasiune a copiilor pentru a avea puţină linişte. Ei nu realizează cât este de intensă violenţa în aceste jocuri şi consideră că e doar o distracţie.
Ziarista: Care consideraţi că sunt efectele negative ale jocurilor asupra copiilor?
Psihologul: Utilizarea lor excesivă îi afectează destul de grav. Nu îi mai interesează performanţele şcolare, competiţia din viaţa reală, în general. Se poate ajunge la agresiune, iar copiii nu mai comunică deloc cu cei din jur.
Ziarista: E uşor să devină agresivi când multe dintre jocuri nu-i învaţă altceva decât diferite metode de a ucide.
Psihologul: Aceasta este aspectul cel mai tragic al întregii probleme.`;
  const ZP = ["Ziarista", "Psihologul"];
  const ILRB1 = "https://www.ilr.ro/wp-content/uploads/ILR%20-%20Aplicatii%20Lingvistice/Exemple%20teste/Nivel%20B1/";
  const SIM1 = {
    id: "s1",
    name: "סימולציה 1",
    badge: "רשמי – מבחן לדוגמה של ILR (עם מפתח תשובות רשמי)",
    source: "https://www.ilr.ro/category/atestate/aplicatii-si-nivel-prag/",
    intro: "זהו מבחן ההערכה העצמית לרמה B1 שמכון ILR מפרסם באתר שלו, יחד עם מפתח תשובות רשמי. השאלות והטקסטים מועתקים מהמקור, וההסברים בעברית נכתבו על ידינו. הניקוד בפועל: קריאה ודקדוק 25, האזנה 25, כתיבה 25, דיבור 25.",
    parts: [
      {
        id: "s1r",
        name: "חלק 1: הבנת הנקרא ודקדוק (Comprehensiune de lectură şi competenţă gramaticală)",
        minutes: 45,
        note: "25 נקודות במבחן האמיתי: קריאה 10, דקדוק ואוצר מילים 15.",
        exs: [
          { id: "s1rA", title: "קריאה A: נכון / לא נכון", instr: "Citiţi textul şi decideţi dacă enunţurile de mai jos sunt adevărate (A) sau false (F).", kind: "choice", passage: SOMN, items: [
            { id: "s1rA1", q: "1. După experiment, organismele tinerilor testaţi au funcţionat similar cu ale unor persoane în vârstă.", opts: AF, ans: [T], ex: "בטקסט: התאים שלהם תפקדו כמו של אדם בן 60." },
            { id: "s1rA2", q: "2. Lipsa somnului provoacă, pentru o vreme, reducerea capacităţii de memorare.", opts: AF, ans: [T], ex: "בין ההשפעות המיידיות: «afectarea temporară a memoriei», פגיעה זמנית בזיכרון." },
            { id: "s1rA3", q: "3. În general, oamenii nu ştiu ce se întâmplă cu corpul lor atunci când nu dorm destul.", opts: AF, ans: [T], ex: "הפרופסור מברזיל: «Dacă ar şti…», כלומר אנשים לא יודעים." },
            { id: "s1rA4", q: "4. Somnolenţa de după-amiază apare din cauză că, în timpul nopţii, dormim prea puţin.", opts: AF, ans: [F], ex: "הטקסט אומר במפורש: «Acesta nu este un semn că nu dormim suficient noaptea»." },
            { id: "s1rA5", q: "5. Simţim nevoia să dormim după-masă deoarece creşte cantitatea de oxigen din creier.", opts: AF, ans: [F], ex: "להפך: המוח «nu mai primeşte destul oxigen», כלומר מקבל פחות חמצן." }
          ] },
          { id: "s1rB", title: "קריאה B: סדר המידע בטקסט", instr: "Citiţi textul şi aranjaţi informaţiile în ordinea în care ele apar în text.", kind: "choice", passage: TABERE, items: [
            { id: "s1rB6", q: "6. Prima informaţie din text:", opts: TAB_OPTS, ans: [TAB_OPTS[4]], ex: "הפסקה הראשונה: כמעט 7,000 מקומות ב-65 מרכזים." },
            { id: "s1rB7", q: "7. A doua informaţie:", opts: TAB_OPTS, ans: [TAB_OPTS[3]], ex: "«a unsprezecea persoană primeşte gratuitate»: האדם ה-11 לא משלם." },
            { id: "s1rB8", q: "8. A treia informaţie:", opts: TAB_OPTS, ans: [TAB_OPTS[1]], ex: "מלווה הקבוצה הוא «un adult responsabil»." },
            { id: "s1rB9", q: "9. A patra informaţie:", opts: TAB_OPTS, ans: [TAB_OPTS[0]], ex: "מחנות נושא: אנגלית, עיתונות, ריקוד…" },
            { id: "s1rB10", q: "10. A cincea informaţie:", opts: TAB_OPTS, ans: [TAB_OPTS[2]], ex: "35 עד 43 לאי, «în funcţie de destinaţia aleasă»." }
          ] },
          { id: "s1gA", title: "דקדוק A: כינויי גוף (forme pronominale)", instr: "Completaţi spaţiile libere cu formele pronominale corespunzătoare.", kind: "fill", passage: "___(1)-am căutat ieri pe Bogdan să-___(2) spun despre întâlnirea noastră. Am sunat-___(3) şi pe Irina, dar nu era acasă şi ___(4)-am lăsat un mesaj. Dacă ai putea să ___(5) ajuţi să fac afişele până mâine, ar fi foarte bine. Te rog, adu-___(6) CD-ul cu modelul pe care ___(7)-am făcut împreună şi anunţă-___(8) pe fete că ___(9) întâlnim toţi la mine. Avem multe să discutăm. Oh! Era să uit. Te rog, aminteşte-___(10) părinţilor tăi că mâine sunt invitaţi la noi la cină.", items: [
            { id: "s1g1", q: "(1) ___-am căutat ieri pe Bogdan", ans: ["l"], ex: "מושא ישיר, זכר יחיד (îl), לפני «am» מתקצר ל-l-." },
            { id: "s1g2", q: "(2) să-___ spun (lui Bogdan)", ans: ["i"], ex: "מושא עקיף, «לו» (îi), אחרי să- נכתב i." },
            { id: "s1g3", q: "(3) Am sunat-___ şi pe Irina", ans: ["o"], ex: "מושא ישיר, נקבה יחידה, אחרי הפועל: sunat-o." },
            { id: "s1g4", q: "(4) ___-am lăsat un mesaj (Irinei)", ans: ["i"], ex: "«לה», דאטיב (îi), לפני am: i-am." },
            { id: "s1g5", q: "(5) să ___ ajuţi", ans: ["mă"], ex: "a ajuta pe cineva מקבל מושא ישיר: mă ajuţi (תעזור לי)." },
            { id: "s1g6", q: "(6) adu-___ CD-ul", ans: ["mi"], ex: "ציווי + «לי» (דאטיב): adu-mi." },
            { id: "s1g7", q: "(7) pe care ___-am făcut", ans: ["l"], ex: "modelul הוא זכר יחיד: pe care l-am făcut." },
            { id: "s1g8", q: "(8) anunţă-___ pe fete", ans: ["le"], ex: "מושא ישיר, נקבה רבים: le." },
            { id: "s1g9", q: "(9) că ___ întâlnim toţi", ans: ["ne"], ex: "פועל רפלקסיבי בגוף ראשון רבים: ne întâlnim." },
            { id: "s1g10", q: "(10) aminteşte-___ părinţilor tăi", ans: ["le"], ex: "דאטיב רבים («להם»), מוכפל עם părinţilor." }
          ] },
          { id: "s1gB", title: "דקדוק B: צורת המילה (גניטיב/דאטיב)", instr: "Scrieţi cuvintele din paranteză la forma corectă.", kind: "fill", passage: "Victor le-a spus (coleg) ___(11) lui că nu-i convine programul de lucru. (Andrei) ___(12) nu i-a venit să creadă că Victor va fi capabil să-şi exprime nemulţumirea şi în faţa (şef) ___(13) său. De fapt, (ei) ___(14) le era frică de consecinţa (atitudine) ___(15) lui asupra (echipă) ___(16).", items: [
            { id: "s1g11", q: "(11) le-a spus (coleg) ___ lui", ans: ["colegilor"], ex: "le- מסמן דאטיב רבים, ולכן colegilor." },
            { id: "s1g12", q: "(12) (Andrei) ___ nu i-a venit să creadă", ans: ["lui Andrei"], ex: "דאטיב של שם פרטי ממין זכר: lui + השם." },
            { id: "s1g13", q: "(13) în faţa (şef) ___ său", ans: ["şefului"], ex: "în faţa דורש גניטיב: şefului." },
            { id: "s1g14", q: "(14) (ei) ___ le era frică", ans: ["lor"], ex: "דאטיב של «הם»: lor (מוכפל עם le)." },
            { id: "s1g15", q: "(15) consecinţa (atitudine) ___ lui", ans: ["atitudinii"], ex: "גניטיב נקבה יחידה מיודע: atitudinii." },
            { id: "s1g16", q: "(16) asupra (echipă) ___", ans: ["echipei"], ex: "asupra דורש גניטיב: echipei." }
          ] },
          { id: "s1gC", title: "דקדוק C: בחרו את האפשרות הנכונה", instr: "Alegeţi varianta corectă.", kind: "choice", passage: "Azi este 2 ianuarie şi mai sunt doar trei zile până (17) vacanţei. Din păcate, eu trebuie să mă întorc acasă (18) terminarea concediului meu. În 24 decembrie, m-am dus la schi. Am aşteptat atât de mult această vacanţă, încât o lună întreagă m-am gândit numai la ea. (19) mi-am cumpărat mănuşi şi clăpari noi, mi-am luat biletul. Am ajuns în staţiunea mea favorită şi, (20) iarna trecută, totul a fost perfect. Dar (21) m-a sunat vecina mea. Mi-a spus că uşa de la casa mea e deschisă şi că a văzut şi un geam spart. Acum sunt în tren (22) o oră. Sunt îngrijorat şi mă gândesc la ce voi găsi acasă (23) voi ajunge. Desigur, va trebui să chem poliţia şi probabil (24) voi merge la agenţia de asigurări ca să le spun ce s-a întâmplat.", items: [
            { id: "s1g17", q: "(17) până ___ vacanţei", opts: ["la sfârşit", "la sfârşitul", "în sfârşit", "sfârşitul"], ans: ["la sfârşitul"], ex: "până la + שם עצם מיודע בגניטיב: la sfârşitul vacanţei." },
            { id: "s1g18", q: "(18) acasă ___ terminarea concediului", opts: ["înaintea", "înainte", "înainte de", "înainte să"], ans: ["înainte de"], ex: "לפני שם עצם לא מיודע במבנה הזה: înainte de terminarea." },
            { id: "s1g19", q: "(19) ___ mi-am cumpărat mănuşi…, mi-am luat biletul", opts: ["după ce", "după aceea", "după cum", "după"], ans: ["după ce"], ex: "מילת חיבור + פועל: după ce (אחרי ש…)." },
            { id: "s1g20", q: "(20) ___ iarna trecută", opts: ["la fel de", "la fel", "tot aşa cum", "la fel ca"], ans: ["la fel ca"], ex: "השוואה לשם עצם: la fel ca (בדיוק כמו)." },
            { id: "s1g21", q: "(21) Dar ___ m-a sunat vecina", opts: ["aseară", "deseară", "deseori", "câteodată"], ans: ["aseară"], ex: "עבר, פעם אחת: aseară (אתמול בערב). deseară = הערב, בעתיד." },
            { id: "s1g22", q: "(22) în tren ___ o oră", opts: ["peste", "de", "după", "aproape"], ans: ["de"], ex: "משך שעדיין נמשך: de o oră (כבר שעה)." },
            { id: "s1g23", q: "(23) acasă ___ voi ajunge", opts: ["imediat", "imediat ce", "imediat după", "după"], ans: ["imediat ce"], ex: "לפני פועל צריך מילת חיבור: imediat ce (מיד כש…)." },
            { id: "s1g24", q: "(24) probabil ___ voi merge", opts: ["în urmă", "ca urmare a", "în urma", "pe urmă"], ans: ["pe urmă"], ex: "pe urmă = אחר כך." }
          ] },
          { id: "s1gD", title: "דקדוק D: מילים נגזרות", instr: "Completaţi spaţiile libere cu derivate ale cuvintelor din paranteză.", kind: "fill", passage: "O ___(25: a se plimba) prin frumoasa noastră regiune vă va convinge că aţi făcut o ___(26: a alege) bună când aţi decis să vă petreceţi vacanţa aici. Avem, în acest sezon, o ___(27: a oferi) specială pentru oaspeţii noştri: o excursie în zone de o ___(28: frumos) cu totul specială. Veţi avea ___(29: posibil) să admiraţi (şi, dacă doriţi, şi să escaladaţi!) vârful cu cea mai mare înălţime din munţii noştri. Vă dorim o şedere cât mai ___(30: a plăcea)!", items: [
            { id: "s1g25", q: "(25) O ___ (a se plimba)", ans: ["plimbare"], ex: "שם עצם מהפועל: plimbare (טיול)." },
            { id: "s1g26", q: "(26) o ___ bună (a alege)", ans: ["alegere"], ex: "alegere = בחירה." },
            { id: "s1g27", q: "(27) o ___ specială (a oferi)", ans: ["ofertă"], ex: "ofertă = הצעה." },
            { id: "s1g28", q: "(28) de o ___ (frumos)", ans: ["frumuseţe"], ex: "frumuseţe = יופי." },
            { id: "s1g29", q: "(29) Veţi avea ___ (posibil)", ans: ["posibilitatea"], ex: "שם עצם מיודע: posibilitatea." },
            { id: "s1g30", q: "(30) o şedere cât mai ___ (a plăcea)", ans: ["plăcută"], ex: "תואר בנקבה (şedere): plăcută." }
          ] }
        ]
      },
      {
        id: "s1l",
        name: "חלק 2: הבנת הנשמע (Înţelegere după auz)",
        minutes: 20,
        note: "25 נקודות. הקבצים הרשמיים זמינים באתר ILR. האזינו קודם, ורק אחר כך פתחו את התמליל.",
        exs: [
          { id: "s1lA", title: "האזנה A: השלימו מילה אחת", instr: "Ascultaţi câteva informaţii despre sare. Completaţi spaţiile libere cu un singur cuvânt.", kind: "fill", transcript: SARE, audio: ILRB1 + "nivel%20B1%20ex%20A.mp3", items: [
            { id: "s1l1", q: "1a. În epoca romană, sarea a funcţionat ca ___", ans: ["valută"], ex: "«o adevărată valută», מטבע." },
            { id: "s1l2", q: "1b. …soldaţii romani au primit mult timp sare în loc de ___", ans: ["salariu"], ex: "החיילים קיבלו את המשכורת שלהם במלח." },
            { id: "s1l3", q: "2a. Se crede despre sare că e periculoasă pentru ___", ans: ["organism"], ex: "«dăunătoare pentru organism»." },
            { id: "s1l4", q: "2b. …dar ea poate avea şi ___ pozitive", ans: ["efecte"], ex: "«efecte benefice», כלומר השפעות חיוביות." },
            { id: "s1l5", q: "3a. Din cauza iernilor mai lungi şi mai ___", ans: ["friguroase"], ex: "«mai lungi şi mai friguroase»." },
            { id: "s1l6", q: "3b. …nordicii au nevoie de o ___ mai mare de sare", ans: ["cantitate"], ex: "«o cantitate mai mare de sare»." },
            { id: "s1l7", q: "4a. …___ este forţat să găsească…", ans: ["creierul"], ex: "«va obliga creierul»." },
            { id: "s1l8", q: "4b. …să găsească alte ___ pentru încălzirea organismului", ans: ["soluţii"], ex: "«noi soluţii pentru încălzire»." }
          ] },
          { id: "s1lB", title: "האזנה B: מי אמר?", instr: "Ascultaţi conversaţia între o ziaristă şi un psiholog. Cine exprimă ideea?", kind: "choice", transcript: JOCURI, audio: ILRB1 + "nivel%20B1%20ex%20B.mp3", items: [
            { id: "s1lBa", q: "a. Pentru unii copii, jocurile cu arme nu sunt potrivite.", opts: ZP, ans: ["Ziarista"], ex: "העיתונאית שואלת אם חלק מהילדים לא קטנים מדי בשביל משחקי נשק." },
            { id: "s1lBb", q: "b. Jocurile pot fi obţinute de copii pentru că nu se ţine cont de limita de vârstă impusă.", opts: ZP, ans: ["Psihologul"], ex: "הפסיכולוגית: המוכרים לא מכבדים את האיסור למכור למתחת לגיל 16." },
            { id: "s1lBc", q: "c. Multe jocuri violente sunt cumpărate de către adulţi pentru copii.", opts: ZP, ans: ["Ziarista"], ex: "העיתונאית ראתה הורים קונים משחקים כאלה." },
            { id: "s1lBd", q: "d. Părinţii nu-şi dau seama care sunt adevăratele dimensiuni ale agresivităţii din jocuri.", opts: ZP, ans: ["Psihologul"], ex: "«Ei nu realizează cât este de intensă violenţa»." },
            { id: "s1lBe", q: "e. Din cauza jocurilor, copiii nu mai sunt preocupaţi de rezultatele la învăţătură.", opts: ZP, ans: ["Psihologul"], ex: "«Nu îi mai interesează performanţele şcolare»." },
            { id: "s1lBf", q: "f. Majoritatea jocurilor propun diverse moduri de a-ţi omorî adversarul.", opts: ZP, ans: ["Ziarista"], ex: "«nu-i învaţă altceva decât diferite metode de a ucide»." }
          ] }
        ]
      }
    ],
    writing: [
      { title: "כתיבה A: מכתב סירוב (100 מילים)", prompt: "Sunteţi invitat la o conferinţă pe tema „Spaţiul urban în mileniul trei”. Din păcate, nu puteţi onora invitaţia. Scrieţi o scrisoare de refuz în care explicaţi motivele pentru care nu puteţi participa şi prin care prezentaţi scuze gazdelor. (100 de cuvinte)\n\nE-mailul primit (Dora Ardelean ← prof. univ. dr. Marc Anton): Pe data de 15 martie, Institutul de Arhitectură organizează conferinţa „Spaţiul urban în mileniul trei”. Vă invităm să participaţi cu o comunicare. Data limită pentru titlul lucrării: 1 martie. Vă rugăm să confirmaţi participarea cât mai curând.", model: "Stimate domnule profesor Marc Anton,\n\nVă mulțumesc pentru invitația de a participa la conferința „Spațiul urban în mileniul trei”, care va avea loc pe 15 martie. Tema mă interesează foarte mult, dar, din păcate, nu pot onora invitația. În perioada 10–20 martie voi fi în Italia, unde coordonez un proiect important al firmei noastre, și nu pot amâna această călătorie. În plus, nu aș avea timp să pregătesc o comunicare de calitate până la 1 martie.\n\nVă rog să primiți scuzele mele și sper să pot participa la o ediție viitoare. Vă doresc mult succes!\n\nCu stimă,\nDora Ardelean" },
      { title: "כתיבה B: דוח לדיירים (150 מילים)", prompt: "Aţi fost angajat recent ca administrator al unui bloc de locuinţe. Scrieţi un raport adresat locatarilor prin care faceţi câteva propuneri pentru înfrumuseţarea şi întreţinerea spaţiului comun. Menţionaţi materialele de care aveţi nevoie şi perioada de timp necesară pentru a face lucrările respective. (150 de cuvinte)", model: "Stimați locatari,\n\nCa nou administrator al blocului, vă prezint câteva propuneri pentru înfrumusețarea și întreținerea spațiului comun.\n\nÎn primul rând, propun să vopsim pereții de pe scară, care sunt murdari și deteriorați. Avem nevoie de aproximativ 60 de litri de vopsea lavabilă, pensule și role. Lucrarea ar dura două săptămâni.\n\nÎn al doilea rând, aș dori să schimbăm becurile vechi cu becuri LED, care consumă mai puțină energie. Avem nevoie de 20 de becuri și de o zi de lucru.\n\nÎn al treilea rând, propun să amenajăm grădina din fața blocului: să plantăm flori și doi copaci și să punem două bănci noi. Aceste lucrări pot fi făcute în aprilie, în aproximativ zece zile.\n\nCosturile vor fi împărțite în mod egal între apartamente. Vă rog să-mi transmiteți părerea dumneavoastră până la sfârșitul lunii.\n\nCu stimă,\nAdministratorul blocului" }
    ],
    speaking: [
      { title: "A. שיחה מונחית (Conversaţie dirijată)", prompt: "Examinatorul vă pune întrebări despre dumneavoastră. (המקור הרשמי לא מפרט את השאלות. אלה שאלות לדוגמה שלנו.)\n• Cum vă numiţi şi de unde sunteţi?\n• Cu ce vă ocupaţi?\n• De ce învăţaţi limba română?\n• Ce faceţi în timpul liber?", sample: "Mă numesc Daniel Cohen și locuiesc în Haifa. Lucrez ca inginer la o firmă de software. Învăț limba română pentru că bunicii mei s-au născut în România, la Iași, și vreau să obțin cetățenia română. În plus, îmi place să călătoresc și aș vrea să vizitez orașul bunicilor. În timpul liber merg cu bicicleta, citesc și petrec timp cu familia mea." },
      { title: "B. מונולוג (Monolog)", prompt: "Priviţi imaginile reprezentând diferite activităţi pe care copiii le pot face în timpul liber. Descrieţi imaginile şi discutaţi care dintre activităţi sunt mai potrivite, mai benefice sau mai negative pentru copii şi de ce.\n(במבחן מוצגות תמונות. כאן אין תמונות, לכן דמיינו: ילד מול מחשב, ילדים משחקים כדורגל, ילדה קוראת, ילדים מול טלוויזיה.)", sample: "În prima imagine văd un băiat care stă singur în fața calculatorului și se joacă. În a doua imagine, câțiva copii joacă fotbal în parc și par foarte veseli. În a treia, o fetiță citește o carte, iar în ultima, doi copii se uită la televizor.\nDupă părerea mea, cele mai benefice activități sunt sportul și cititul. Sportul îi ajută pe copii să fie sănătoși și să lucreze în echipă, iar cititul le dezvoltă imaginația și vocabularul. Calculatorul și televizorul nu sunt rele în sine, dar devin negative atunci când copiii stau ore întregi în fața ecranului și nu mai comunică cu ceilalți. Cred că părinții trebuie să găsească un echilibru și să limiteze timpul petrecut în fața ecranelor." },
      { title: "C. אינטראקציה (Interacţiune verbală)", prompt: "Studentul A: Sunteţi fotograf profesionist şi aveţi nevoie de un ajutor, care să lucreze pentru dumneavoastră după-masa. La interviu s-a prezentat un tânăr şi vreţi să aflaţi dacă este persoana potrivită pentru acest post.\nStudentul B: V-aţi prezentat la un interviu pentru un post de fotograf. Vorbiţi despre calităţile, experienţa pe care o aveţi şi încercaţi să obţineţi postul. Discutaţi despre programul de lucru, salariu etc.", sample: "A: Bună ziua! Luați loc, vă rog. Ce experiență aveți în fotografie?\nB: Bună ziua! Am lucrat doi ani la un studio foto din Tel Aviv, unde am făcut fotografii la nunți și evenimente.\nA: Foarte bine. Știți să lucrați cu programe de editare?\nB: Da, folosesc zilnic Photoshop și Lightroom. Sunt o persoană răbdătoare și punctuală.\nA: Programul este de luni până vineri, între orele 14 și 19. Vă convine?\nB: Da, îmi convine perfect, dimineața am cursuri. Pot să vă întreb care este salariul?\nA: Oferim 3.000 de lei pe lună pentru început.\nB: Mi se pare corect. Când aș putea să încep?" }
    ]
  };
  const BICI = `Orașul pe două roți

În ultimii ani, tot mai mulți locuitori ai Clujului au renunțat la mașină și au ales bicicleta pentru drumul zilnic la serviciu. Primăria a construit peste 40 de kilometri de piste noi și a introdus un sistem de închiriere: cu un abonament lunar de 20 de lei, oricine poate lua o bicicletă dintr-o stație și o poate lăsa în oricare alta.
Un studiu realizat de o universitate locală arată că cei care merg cu bicicleta cel puțin trei zile pe săptămână se simt mai puțin stresați și ajung la birou mai repede decât colegii lor care conduc, mai ales la orele de vârf. Totuși, nu toată lumea este mulțumită. Unii șoferi se plâng că pistele au ocupat locurile de parcare, iar comercianții din centru se tem că vor avea mai puțini clienți.
Iarna rămâne cea mai mare problemă: când ninge, multe piste nu sunt curățate la timp, iar numărul bicicliștilor scade la jumătate. Primăria promite că, de anul viitor, pistele vor fi curățate la fel de repede ca și străzile.`;
  const BUNICA = `Bunica și internetul

Doamna Elena Popescu are 72 de ani și locuiește singură într-un apartament din Iași. Până anul trecut, nu folosise niciodată un calculator. Totul s-a schimbat când nepoata ei, Ioana, a plecat la studii în Germania. „Voiam s-o văd, nu doar s-o aud la telefon”, povestește doamna Popescu. Așa că s-a înscris la un curs gratuit pentru seniori, organizat de biblioteca din cartier.
La început i-a fost greu: nu știa cum să folosească mouse-ul și uita parolele. Profesorul, un student voluntar, a avut însă multă răbdare. După două luni, doamna Popescu putea să trimită e-mailuri și să vorbească prin video cu nepoata ei. Acum își plătește facturile online și citește ziarele pe tabletă.
„Cel mai mult mă bucură că nu mai depind de vecini pentru orice lucru mărunt”, spune ea. Biblioteca a anunțat că, datorită succesului, va organiza încă două grupe în primăvară.`;
  const METEO = `Bună dimineața! Iată prognoza meteo pentru weekend. Sâmbătă, în București, va fi însorit, cu temperaturi de până la 18 grade. Duminică, însă, vremea se schimbă: de la prânz va începe să plouă, iar vântul va bate puternic în sudul țării. La munte, turiștii trebuie să fie atenți, pentru că se așteaptă chiar ninsoare la peste 1.800 de metri. Meteorologii recomandă șoferilor să circule cu viteză redusă și să verifice starea drumurilor înainte de plecare. Săptămâna viitoare, temperaturile vor scădea în toată țara.`;
  const APART = `Andrei: Bună, Simona! Ai găsit apartament în Cluj?
Simona: Încă nu. Am văzut ieri două, dar unul era prea departe de facultate, iar celălalt era prea scump: 500 de euro pe lună!
Andrei: Sora mea închiriază o cameră lângă parcul central. E mică, dar luminoasă și costă doar 250 de euro, cu tot cu utilități.
Simona: Serios? Pot s-o văd mâine după-amiază? Dimineața am examen.
Andrei: Sigur, o sun diseară și îți trimit adresa pe mesaj.
Simona: Mulțumesc mult! Dacă îmi place, te invit la o cafea.`;
  const SIM2 = {
    id: "s2",
    name: "סימולציה 2",
    badge: "מקורי – פריטי תרגול שכתבנו לפי המבנה הרשמי (לא מבחן אמיתי)",
    source: "נכתב על ידינו לפי הפורמט של ILR",
    intro: "כל הטקסטים והשאלות כאן נכתבו במיוחד לתרגול, לפי סוגי התרגילים שמופיעים במבחנים לדוגמה של ILR. זה לא מבחן שהופיע בפועל.",
    parts: [
      {
        id: "s2r",
        name: "חלק 1: הבנת הנקרא ודקדוק",
        minutes: 45,
        note: "25 נקודות במבחן האמיתי.",
        exs: [
          { id: "s2rA", title: "קריאה A: נכון / לא נכון", instr: "Citiți textul și decideți dacă enunțurile sunt adevărate (A) sau false (F).", kind: "choice", passage: BICI, items: [
            { id: "s2rA1", q: "1. Bicicletele din sistemul de închiriere trebuie returnate la aceeași stație.", opts: AF, ans: [F], ex: "«o poate lăsa în oricare alta»: אפשר להחזיר בכל תחנה." },
            { id: "s2rA2", q: "2. Bicicliștii ajung la serviciu mai repede decât șoferii, mai ales la orele aglomerate.", opts: AF, ans: [T], ex: "«ajung la birou mai repede… mai ales la orele de vârf»." },
            { id: "s2rA3", q: "3. Toți locuitorii orașului sunt de acord cu noile piste.", opts: AF, ans: [F], ex: "«nu toată lumea este mulțumită»." },
            { id: "s2rA4", q: "4. Unii comercianți sunt îngrijorați de efectele pistelor asupra afacerilor lor.", opts: AF, ans: [T], ex: "«se tem că vor avea mai puțini clienți»." },
            { id: "s2rA5", q: "5. Iarna, numărul bicicliștilor crește.", opts: AF, ans: [F], ex: "«scade la jumătate»: יורד בחצי." }
          ] },
          { id: "s2rB", title: "קריאה B: בחירה מרובה", instr: "Citiți textul și alegeți varianta corectă.", kind: "choice", passage: BUNICA, items: [
            { id: "s2rB1", q: "1. Doamna Popescu a învățat să folosească internetul pentru că", opts: ["voia să-și găsească un serviciu", "voia să comunice mai bine cu nepoata", "biblioteca a obligat-o"], ans: ["voia să comunice mai bine cu nepoata"], ex: "«Voiam s-o văd, nu doar s-o aud la telefon»." },
            { id: "s2rB2", q: "2. Cursul a fost", opts: ["scump", "organizat de o universitate", "gratuit"], ans: ["gratuit"], ex: "«un curs gratuit pentru seniori», שאורגן על ידי הספרייה." },
            { id: "s2rB3", q: "3. La început, doamna Popescu", opts: ["învăța foarte repede", "avea probleme cu parolele", "nu avea răbdare cu profesorul"], ans: ["avea probleme cu parolele"], ex: "«uita parolele». המורה הוא זה שהיה סבלני." },
            { id: "s2rB4", q: "4. Acum, doamna Popescu", opts: ["își plătește facturile pe internet", "lucrează la bibliotecă", "predă și ea cursuri"], ans: ["își plătește facturile pe internet"], ex: "«își plătește facturile online»." },
            { id: "s2rB5", q: "5. Cel mai important lucru pentru ea este că", opts: ["a cunoscut oameni noi", "este mai independentă", "citește mai multe cărți"], ans: ["este mai independentă"], ex: "«nu mai depind de vecini»: עצמאות." }
          ] },
          { id: "s2gA", title: "דקדוק A: כינויי גוף", instr: "Completați spațiile libere cu formele pronominale corespunzătoare.", kind: "fill", items: [
            { id: "s2g1", q: "1. Ieri ___-am întâlnit pe Mihai în parc.", ans: ["l"], ex: "מושא ישיר זכר יחיד לפני am: l-am." },
            { id: "s2g2", q: "2. ___-am spus (lui Mihai) că plec în vacanță.", ans: ["i"], ex: "דאטיב «לו»: i-am spus." },
            { id: "s2g3", q: "3. Cartea? Am citit-___ deja.", ans: ["o"], ex: "נקבה יחידה, מושא ישיר: citit-o." },
            { id: "s2g4", q: "4. Pe părinții mei ___ vizitez în fiecare duminică.", ans: ["îi"], ex: "זכר רבים, מושא ישיר: îi vizitez." },
            { id: "s2g5", q: "5. Dă-___, te rog, sarea!", ans: ["mi"], ex: "ציווי + «לי»: dă-mi." },
            { id: "s2g6", q: "6. Pe noi nu ___ invită nimeni.", ans: ["ne"], ex: "מושא ישיר גוף ראשון רבים: ne." },
            { id: "s2g7", q: "7. Spune-___ copiilor să vină la masă!", ans: ["le"], ex: "דאטיב רבים מוכפל: spune-le copiilor." },
            { id: "s2g8", q: "8. Pe tine ___ caută cineva la telefon.", ans: ["te"], ex: "מושא ישיר גוף שני יחיד: te caută." }
          ] },
          { id: "s2gB", title: "דקדוק B: צורת המילה", instr: "Scrieți cuvintele din paranteză la forma corectă.", kind: "fill", items: [
            { id: "s2g9", q: "1. Am dat cadoul (prietenă) ___ mele.", ans: ["prietenei"], ex: "דאטיב נקבה יחידה: prietenei." },
            { id: "s2g10", q: "2. Casa (bunici) ___ mei este la țară.", ans: ["bunicilor"], ex: "גניטיב רבים: bunicilor." },
            { id: "s2g11", q: "3. Directorul (școală) ___ a vorbit cu părinții.", ans: ["școlii"], ex: "גניטיב נקבה יחידה: școlii." },
            { id: "s2g12", q: "4. I-am mulțumit (doamna Ionescu) ___.", ans: ["doamnei Ionescu"], ex: "דאטיב: doamnei Ionescu." },
            { id: "s2g13", q: "5. Culoarea (mașină) ___ noi este roșie.", ans: ["mașinii"], ex: "גניטיב נקבה יחידה: mașinii." },
            { id: "s2g14", q: "6. Le-am explicat (studenți) ___ regulile.", ans: ["studenților"], ex: "דאטיב רבים: studenților." }
          ] },
          { id: "s2gC", title: "דקדוק C: בחרו את האפשרות הנכונה", instr: "Alegeți varianta corectă.", kind: "choice", items: [
            { id: "s2g15", q: "1. ___ am terminat lucrul, am plecat acasă.", opts: ["Imediat ce", "Imediat", "Înainte", "După aceea"], ans: ["Imediat ce"], ex: "לפני משפט עם פועל: imediat ce (מיד כש…)." },
            { id: "s2g16", q: "2. Nu am venit la petrecere ___ eram bolnav.", opts: ["deși", "pentru că", "ca să", "dacă"], ans: ["pentru că"], ex: "סיבה: pentru că (כי)." },
            { id: "s2g17", q: "3. Învăț româna ___ să pot vorbi cu rudele mele.", opts: ["ca", "pentru că", "deoarece", "încât"], ans: ["ca"], ex: "מטרה: ca să (כדי ש…)." },
            { id: "s2g18", q: "4. ___ ploua, am ieșit la plimbare.", opts: ["Pentru că", "Deși", "Dacă", "Ca să"], ans: ["Deși"], ex: "ניגוד: deși (למרות ש…)." },
            { id: "s2g19", q: "5. Te sun ___ ajung acasă.", opts: ["când", "de când", "până", "decât"], ans: ["când"], ex: "זמן: când (כש…)." },
            { id: "s2g20", q: "6. Locuiesc în Tel Aviv ___ zece ani.", opts: ["de", "peste", "după", "pentru"], ans: ["de"], ex: "משך שעדיין נמשך: de zece ani." },
            { id: "s2g21", q: "7. Ne vedem ___ o săptămână.", opts: ["de", "peste", "pe", "la"], ans: ["peste"], ex: "בעתיד: peste o săptămână (בעוד שבוע)." },
            { id: "s2g22", q: "8. Dacă aș avea timp, ___ mai mult.", opts: ["citesc", "voi citi", "aș citi", "citeam"], ans: ["aș citi"], ex: "משפט תנאי: dacă aș avea… aș citi (condițional)." }
          ] },
          { id: "s2gD", title: "דקדוק D: מילים נגזרות", instr: "Completați cu derivate ale cuvintelor din paranteză.", kind: "fill", items: [
            { id: "s2g23", q: "1. O ___ (a călători) cu trenul durează 5 ore.", ans: ["călătorie"], ex: "călătorie = נסיעה." },
            { id: "s2g24", q: "2. Am primit o ___ (a invita) la nuntă.", ans: ["invitație"], ex: "invitație = הזמנה." },
            { id: "s2g25", q: "3. ___ (sănătos) este cel mai important lucru.", ans: ["sănătatea"], ex: "שם עצם מיודע: sănătatea." },
            { id: "s2g26", q: "4. Am avut o ___ (a discuta) lungă cu șeful.", ans: ["discuție"], ex: "discuție = שיחה." },
            { id: "s2g27", q: "5. Este o carte foarte ___ (a interesa).", ans: ["interesantă"], ex: "תואר בנקבה: interesantă." },
            { id: "s2g28", q: "6. Vă mulțumim pentru ___ (a ajuta)!", ans: ["ajutor"], ex: "ajutor = עזרה." }
          ] }
        ]
      },
      {
        id: "s2l",
        name: "חלק 2: הבנת הנשמע (תמליל בלבד)",
        minutes: 20,
        note: "אין קובץ שמע לחלק הזה. בקשו ממישהו להקריא את התמליל פעמיים, או קראו אותו פעם אחת בלבד ואז ענו בלי להסתכל.",
        exs: [
          { id: "s2lA", title: "האזנה A: השלימו מילה אחת", instr: "Ascultați prognoza meteo. Completați cu un singur cuvânt.", kind: "fill", transcript: METEO, items: [
            { id: "s2l1", q: "1. Sâmbătă, la București, vremea va fi ___.", ans: ["însorită", "însorit"], ex: "«va fi însorit»." },
            { id: "s2l2", q: "2. Duminică va începe să ___ de la prânz.", ans: ["plouă"], ex: "«va începe să plouă»." },
            { id: "s2l3", q: "3. În sud, ___ va bate puternic.", ans: ["vântul"], ex: "«vântul va bate puternic»." },
            { id: "s2l4", q: "4. La munte se așteaptă ___.", ans: ["ninsoare"], ex: "«ninsoare la peste 1.800 de metri»." },
            { id: "s2l5", q: "5. Șoferii trebuie să circule cu ___ redusă.", ans: ["viteză"], ex: "«cu viteză redusă»." },
            { id: "s2l6", q: "6. Săptămâna viitoare, temperaturile vor ___.", ans: ["scădea"], ex: "«temperaturile vor scădea»." }
          ] },
          { id: "s2lB", title: "האזנה B: נכון / לא נכון", instr: "Ascultați dialogul și decideți dacă enunțurile sunt adevărate (A) sau false (F).", kind: "choice", transcript: APART, items: [
            { id: "s2lB1", q: "1. Simona a văzut deja două apartamente.", opts: AF, ans: [T], ex: "«Am văzut ieri două»." },
            { id: "s2lB2", q: "2. Primul apartament era prea scump.", opts: AF, ans: [F], ex: "הראשונה הייתה רחוקה מדי. השנייה הייתה יקרה מדי." },
            { id: "s2lB3", q: "3. Prețul camerei include utilitățile.", opts: AF, ans: [T], ex: "«cu tot cu utilități»." },
            { id: "s2lB4", q: "4. Simona poate vedea camera mâine dimineață.", opts: AF, ans: [F], ex: "בבוקר יש לה מבחן, היא תבוא אחר הצהריים." },
            { id: "s2lB5", q: "5. Andrei îi va trimite adresa printr-un mesaj.", opts: AF, ans: [T], ex: "«îți trimit adresa pe mesaj»." }
          ] }
        ]
      }
    ],
    writing: [
      { title: "כתיבה A: מייל תלונה (100 מילים)", prompt: "Ați cumpărat online o pereche de pantofi, dar ați primit o mărime greșită. Scrieți un e-mail magazinului în care explicați problema și cereți o soluție. (100 de cuvinte)", model: "Subiect: Comanda nr. 45821 – mărime greșită\n\nBună ziua,\n\nPe 3 noiembrie am comandat de pe site-ul dumneavoastră o pereche de pantofi negri din piele, mărimea 42. Coletul a sosit ieri, dar, când l-am deschis, am văzut că pantofii sunt mărimea 40 și nu îmi vin. Am păstrat cutia și bonul fiscal.\n\nVă rog să-mi trimiteți pantofii la mărimea corectă sau, dacă nu mai aveți această mărime, să-mi returnați banii. Aș dori să știu, de asemenea, cum pot trimite înapoi coletul și cine plătește transportul.\n\nVă mulțumesc anticipat.\n\nCu stimă,\nDavid Cohen" },
      { title: "כתיבה B: חג משפחתי (150 מילים)", prompt: "Scrieți un text despre o sărbătoare de familie importantă pentru dumneavoastră: când are loc, cine participă, ce se mănâncă și de ce este importantă. (150 de cuvinte)", model: "Sărbătoarea mea preferată este Paștele evreiesc, Pesah, care are loc primăvara, de obicei în aprilie. Prima seară se numește Seder și este cea mai importantă. În fiecare an, toată familia se adună la bunicii mei: părinții, unchii, mătușile și verii mei. Uneori suntem peste douăzeci de persoane la masă!\n\nÎnainte de cină, citim împreună Hagada, o carte care povestește cum au ieșit evreii din Egipt. Copiii pun patru întrebări, iar adulții le răspund. Apoi mâncăm mâncăruri tradiționale: matza, adică pâine nedospită, supă de pui cu găluște, pește umplut și prăjituri fără făină. Bunica gătește și câteva rețete aduse din România, de exemplu salată de vinete.\n\nPentru mine, această sărbătoare este importantă pentru că este singura ocazie din an în care toată familia stă la aceeași masă. Este un moment de bucurie, dar și de amintire a istoriei noastre." }
    ],
    speaking: [
      { title: "A. שיחה מונחית", prompt: "• Unde locuiți și cu cine?\n• Descrieți orașul dumneavoastră.\n• Ce legătură aveți cu România?\n• Ce planuri aveți pentru anul viitor?", sample: "Locuiesc în Rishon LeZion, împreună cu soția mea și cu cei doi copii ai noștri. Este un oraș mare, aproape de mare, cu multe parcuri și magazine. Legătura mea cu România vine de la bunicul meu, care s-a născut la Bacău și a venit în Israel în 1962. Acasă vorbea uneori românește și de aceea înțeleg câteva cuvinte de când eram mic. Anul viitor vreau să termin dosarul de cetățenie și să vizitez România cu toată familia." },
      { title: "B. מונולוג", prompt: "Vorbiți despre avantajele și dezavantajele vieții la oraș față de viața la sat. Unde ați prefera să locuiți și de ce?", sample: "Viața la oraș are multe avantaje: sunt mai multe locuri de muncă, școli bune, spitale, teatre și transport public. Totuși, orașul este zgomotos și poluat, iar chiriile sunt foarte mari. La sat, aerul este curat, oamenii se cunosc între ei și viața este mai liniștită, dar este greu să găsești un serviciu și uneori trebuie să mergi mult până la un medic. Eu aș prefera să locuiesc într-un oraș mic, aproape de natură, pentru că așa aș avea liniște, dar și tot ce îmi trebuie în apropiere." },
      { title: "C. אינטראקציה (משחק תפקידים)", prompt: "Studentul A: Vreți să închiriați un apartament și sunați la proprietar. Întrebați despre preț, cartier, mobilă și când vă puteți muta.\nStudentul B: Sunteți proprietarul. Răspundeți la întrebări și cereți informații despre chiriaș.", sample: "A: Bună ziua! Sun pentru apartamentul din anunț. Mai este liber?\nB: Da, este liber. Are două camere și este în centru, lângă parc.\nA: Cât costă chiria pe lună?\nB: 400 de euro, plus utilitățile. Apartamentul este complet mobilat.\nA: Când m-aș putea muta?\nB: De la 1 decembrie. Dar spuneți-mi, cu ce vă ocupați? Aveți animale?\nA: Sunt profesor și nu am animale. Pot să văd apartamentul mâine?\nB: Sigur, vă aștept mâine la ora 17." }
    ]
  };
  const ROMAN = `Cum citim un roman?

Iată o întrebare aparent simplă, la care toţi credem că ştim să răspundem. Dintotdeauna mi-a fost frică de întrebările simple. Cum par să fie, de exemplu, acelea de la testele de inteligenţă. În cazul întrebării din titlul articolului, dificultatea ascunsă a răspunsului este de un tip special: nu ţine nici de logică sau de bunul-simţ, nici de informaţie stricto sensu.
Cu alte cuvinte, nici de natura, nici de cultura umană. De ce ţine, totuşi? Lato sensu, ţine de cultură. Însă nu în mod direct, precum, să zicem, ţine de cultura noastră lingvistică să cunoaştem înţelesul celor două expresii latineşti pe care le-am subliniat sau să folosim forma corectă a celei de-a doua şi nu pe aceea, întâlnită deseori, largo sensu.
Poate că ar fi potrivit să vorbim de o deprindere intuitivă, dobândită prin experienţă proprie de lectură. Se poate şi învăţa, desigur. Însă partea care se învaţă nu garantează aplicaţia în toate cazurile posibile. Rămâne loc pentru descoperiri pe cont propriu sau pentru confuzii.

Întrebări folositoare, întrebări greşite

Am profitat la un moment dat, în cariera mea de profesor de literatură, de efectul euristic al unor asemenea situaţii. Dar, înainte de a le pune întrebări (aparent simple!) studenţilor, aveam grijă să le furnizez anumite date legate, în cazul de faţă, de tipurile de roman pe care le întâlniseră, chiar fără să fi fost ei înşişi conştienţi de diferenţă.
Le atrăgeam, bunăoară, atenţia că romanele în care acţiunea ne este relatată la persoana a treia şi cele în care ne este relatată la persoana întâi comportă abordări diferite: cititorul nu-şi pune neapărat cu privire la toate aceleaşi întrebări şi nici nu se poate aştepta la aceleaşi răspunsuri.
Există întrebări de pe urma cărora nu putem trage niciun folos în înţelegerea romanului sau chiar întrebări greşite, care conduc la răspunsuri greşite.
Două erau exemplele mele favorite, având în vedere (în cazul în speţă, căci existau, fireşte, nenumărate altele) particularităţile diferite ale romanelor la persoana a treia, cu narator impersonal şi omniscient, şi ale romanelor la persoana întâi, cu narator care e, de obicei, şi un personaj identificabil.
Discutam romanul lui G. Ibrăileanu, „Adela”, roman la persoana întâi, în care naratorul este unul dintre protagonişti, doctorul cvadragenar Emil Codrescu, îndrăgostit de mult mai tânăra Adela. Le ceream studenţilor să facă un portret al tinerei femei (Adela fusese măritată şi divorţase după două săptămâni).
Fără excepţie, Adela le apărea ca o făptură încântătoare, dulce şi suavă ca o garofiţă. Îi întrebam pe ce se bazează. Se bazau pe felul în care o vedea Codrescu, dar îl interpretau ca şi cum naratorul ar fi fost acela impersonal şi total creditabil din romanul la persoana a treia. Nu păreau conştienţi de faptul că naratorul era un bărbat îndrăgostit şi complet lipsit de experienţă erotică. Nu se întrebau dacă el nu cumva se înşală. Nu luau în discuţie mariajul neobişnuit de scurt al Adelei şi nici eventualitatea ca divorţul să fi fost din vina ei. Ideea că n-o putem portretiza în mod clar pe Adela li se părea ciudată.

Ela îl înşela pe Gheorghidiu?

După un timp, verificam ce înţeleseseră, întrebându-i dacă socotesc că Ela îl înşală pe Gheorghidiu în romanul lui Camil Petrescu, „Ultima noapte de dragoste, întâia noapte de război”.
Răspunsurile erau împărţite şi clare: da sau nu. Puţini erau aceia care ştiau că răspunsul este ipotetic, de vreme ce naratorul este Gheorghidiu însuşi, un bărbat gelos din cale afară, ale cărui constatări puteau fi foarte bine subiective şi tendenţioase. Cu atât mai mult cu cât el e martor doar la scene de cochetărie, în public, ale nevestei, care pot spune totul sau nimic.
Mi-am dat seama că explicaţiile mele îi convingeau pe cei mai mulţi, dar că puţini erau aceia care profitau de ele când citeau un alt roman de acelaşi tip, ca să nu spun că erau şi destui gata să se complice punând întrebări precum cele de mai sus la lectura unor romane obiective.
Vă daţi seama cât de pretenţios şi caraghios suna întrebarea dacă Ion al Glanetaşului o iubea sau o ura pe Ana. Cum citim un roman e o întrebare simplă, dar cu un răspuns complicat.
(Nicolae Manolescu)`;
  const SIM3 = {
    id: "s3",
    name: "מבחן נובמבר 2019",
    badge: "רשמי – מבחן שפורסם מהמושב בבוקרשט, נובמבר 2019 (ללא מפתח רשמי)",
    source: "https://www.ilr.ro/category/atestate/aplicatii-si-nivel-prag/",
    intro: "ILR פרסם את המבחן הזה ממושב ההסמכה שנערך בבוקרשט בנובמבר 2019. ILR לא פרסם מפתח תשובות, ולכן התשובות כאן הן הצעה שלנו בלבד. בשאלות 3 ו-4 יש מקום לפרשנות. רמת הקריאה כאן גבוהה מבמבחנים לדוגמה, ולכן זה אימון טוב לתרחיש קשה.",
    parts: [
      {
        id: "s3r",
        name: "חלק 1: הבנת הנקרא ודקדוק",
        minutes: 45,
        note: "בחלק הדקדוק מנסחים מחדש משפטים פתוחים. אין לו בדיקה אוטומטית: כתבו את התשובה והשוו לפתרון המוצע.",
        exs: [
          { id: "s3rA", title: "קריאה: נכון / לא נכון", instr: "Hotărâţi dacă următoarele constatări sunt adevărate sau false.", kind: "choice", passage: ROMAN, items: [
            { id: "s3r1", q: "1. Toţi oamenii ştiu să răspundă la întrebarea „cum citim un roman”.", opts: AF, ans: [F], ex: "«toţi credem că ştim»: אנחנו רק חושבים שאנחנו יודעים." },
            { id: "s3r2", q: "2. După autor, modul în care se citeşte un roman nu se poate învăţa.", opts: AF, ans: [F], ex: "«Se poate şi învăţa, desigur»." },
            { id: "s3r3", q: "3. Autorul crede că studenţii lui erau de părere că nu există întrebări greşite când este vorba despre înţelegerea unui roman.", opts: AF, ans: [F], ex: "תשובה מוצעת: הטקסט לא אומר שזו הייתה דעת הסטודנטים. המחבר הוא שמסביר שיש שאלות שגויות." },
            { id: "s3r4", q: "4. Autorul este de părere că fiecare cititor abordează în mod individual un roman.", opts: AF, ans: [T], ex: "תשובה מוצעת: «deprindere intuitivă, dobândită prin experienţă proprie», «descoperiri pe cont propriu»." },
            { id: "s3r5", q: "5. Pentru a demonstra specificul întregii literaturi, Nicolae Manolescu a folosit două exemple favorite…", opts: AF, ans: [F], ex: "הדוגמאות באו להמחיש את ההבדל בין רומן בגוף ראשון לרומן בגוף שלישי, לא את «כל הספרות»." },
            { id: "s3r6", q: "6. Ştim că divorţul Adelei a fost din vina ei.", opts: AF, ans: [F], ex: "זו רק «eventualitatea», אפשרות שהסטודנטים לא שקלו." },
            { id: "s3r7", q: "7. Niciun student n-a considerat că Emil Codrescu este un narator necredibil.", opts: AF, ans: [T], ex: "«Fără excepţie»: כולם קיבלו את נקודת המבט שלו." },
            { id: "s3r8", q: "8. Nicolae Manolescu este convins că naratorul romanului „Ultima noapte…” este tendenţios.", opts: AF, ans: [F], ex: "«puteau fi foarte bine… tendenţioase». זו השערה, לא ודאות." },
            { id: "s3r9", q: "9. Autorul ne spune că studenţii lui nu ştiau dacă Ela a fost înşelată sau nu de Gheorghidiu.", opts: AF, ans: [F], ex: "השאלה הייתה אם אֵלָה בגדה בו, והסטודנטים ענו «כן» או «לא» בביטחון." },
            { id: "s3r10", q: "10. În general studenţii ajungeau să înţeleagă explicaţiile, dar numai puţini le puneau în practică.", opts: AF, ans: [T], ex: "«îi convingeau pe cei mai mulţi, dar… puţini… profitau de ele»." }
          ] },
          { id: "s3g", title: "דקדוק: המשיכו את המשפט ושמרו על המשמעות", instr: "Continuaţi următoarele fraze, păstrând sensul şi făcând schimbările necesare.", kind: "open", items: [
            { id: "s3g1", q: "1. El este noul meu prieten. → Uite-l …", ans: ["Uite-l pe noul meu prieten!"], ex: "Uite-l + pe + מושא." },
            { id: "s3g2", q: "2. A luat-o la sănătoasa când a dat ochii cu fantoma. → A …", ans: ["A fugit (repede) când a văzut fantoma."], ex: "a o lua la sănătoasa = לברוח. a da ochii cu = לראות." },
            { id: "s3g3", q: "3. După ce-l întâlnisem, mi-am dat seama cine era cu adevărat. → Când l- …", ans: ["Când l-am întâlnit, mi-am dat seama cine era cu adevărat."], ex: "după ce + עבר מושלם → când + perfect compus." },
            { id: "s3g4", q: "4. Fă-i pe voie dacă se poate. → Ascultă- …", ans: ["Ascultă-l dacă se poate."], ex: "a face cuiva pe voie = לעשות כרצונו, כלומר לשמוע בקולו." },
            { id: "s3g5", q: "5. S-a scumpit benzina. → Benzina a …", ans: ["Benzina a devenit mai scumpă."], ex: "a se scumpi = להתייקר." },
            { id: "s3g6", q: "6. Maşina va fi adusă mâine. → Se …", ans: ["Se va aduce maşina mâine."], ex: "סביל עם se (diateza reflexiv-pasivă)." },
            { id: "s3g7", q: "7. El face numai ce îi spune soţia. → Soţia …", ans: ["Soţia hotărăşte tot ce face el. / Soţia îi spune ce să facă."], ex: "הופכים את הנושא ושומרים על המשמעות." },
            { id: "s3g8", q: "8. De ce nu m-ai aşteptat unde ne-am înţeles? → Trebuia …", ans: ["Trebuia să mă aştepţi unde ne-am înţeles."], ex: "trebuia + să + conjunctiv." },
            { id: "s3g9", q: "9. Dacă-mi cerea bani, îi dădeam. → Dacă mi-ar …", ans: ["Dacă mi-ar fi cerut bani, i-aş fi dat."], ex: "condițional perfect: ar fi cerut / aş fi dat." },
            { id: "s3g10", q: "10. O să te aştept la gară. → Te …", ans: ["Te voi aştepta la gară."], ex: "עתיד ספרותי: voi + שם פועל." }
          ] }
        ]
      },
      {
        id: "s3l",
        name: "חלק 2: הבנת הנשמע (שמע רשמי, אין תמליל)",
        minutes: 20,
        note: "הקובץ הרשמי: https://www.ilr.ro/wp-content/uploads/2020/06/B1.mp3. ILR לא פרסם תמליל, ולכן התשובות כאן הן תשובות כלליות על שפעת לבדיקה עצמית.",
        exs: [
          { id: "s3lA", title: "האזנה: שאלות פתוחות על שפעת (gripa)", instr: "Ascultați materialul și răspundeți la următoarele întrebări.", kind: "open", items: [
            { id: "s3l1", q: "1. Ce este gripa?", ans: ["Gripa este o boală infecțioasă/virală a căilor respiratorii."], ex: "בדקו מול ההקלטה." },
            { id: "s3l2", q: "2. Ce provoacă gripa?", ans: ["Gripa este provocată de un virus (virusul gripal)."], ex: "בדקו מול ההקלטה." },
            { id: "s3l3", q: "3. Care sunt simptomele gripei?", ans: ["Febră, dureri de cap, dureri musculare, tuse, oboseală, frisoane."], ex: "בדקו מול ההקלטה." },
            { id: "s3l4", q: "4. Care este modalitatea eficientă de prevenire a gripei?", ans: ["Vaccinul antigripal / vaccinarea."], ex: "בדקו מול ההקלטה." },
            { id: "s3l5", q: "5. Cum se numeşte rubrica audio ascultată?", ans: ["(se aude la începutul înregistrării)"], ex: "שם הפינה נאמר בהקלטה עצמה." }
          ] }
        ]
      }
    ],
    writing: [
      { title: "כתיבה 1: מייל ל-ILR", prompt: "Scrieţi un email adresat Institutului Limbii Române, prin care solicitaţi informaţii despre următoarea sesiune de testare a limbii române şi în care expuneţi motivul pentru care aveţi nevoie de un atestat la nivel B1.", model: "Subiect: Informații despre următoarea sesiune de atestare B1\n\nStimată doamnă / Stimate domn,\n\nMă numesc Yael Levi, locuiesc în Israel și aș dori să susțin examenul de limba română la nivelul B1. Vă rog să-mi spuneți când va avea loc următoarea sesiune de testare, care este perioada de înscriere, ce documente trebuie să trimit și cât costă examenul. Aș vrea să știu, de asemenea, dacă examenul se poate susține și în Israel.\n\nAm nevoie de atestatul de nivel B1 pentru dosarul de cetățenie română. Bunicii mei s-au născut la Iași și pentru mine este important să păstrez legătura cu țara și cu limba lor.\n\nVă mulțumesc anticipat pentru răspuns.\n\nCu stimă,\nYael Levi" },
      { title: "כתיבה 2: סיפור לפי תמונה (200 מילים)", prompt: "Pornind de la imaginea dată, scrieţi o naraţiune despre cuplul din fotografie, imaginându-vă circumstanţele în care a fost făcută fotografia. (200 de cuvinte)\n(התמונה המקורית מופיעה בקובץ של ILR. בתשובה לדוגמה דמיינו זוג מבוגר על חוף ים.)", model: "Fotografia a fost făcută în vara anului 1975, pe plaja de la Mamaia. Cei doi tineri din imagine, Ana și Mihai, se cunoscuseră cu doar o săptămână înainte, într-un tren aglomerat care mergea de la București spre mare. Mihai îi oferise locul lui, iar Ana îi mulțumise cu un zâmbet timid.\n\nÎn ziua fotografiei, Mihai a împrumutat aparatul foto al unui prieten și l-a rugat pe un pescar să-i fotografieze. Ana purta o rochie albă cu flori, iar Mihai o pălărie de paie pe care o cumpărase chiar în dimineața aceea. Râdeau amândoi pentru că vântul tocmai îi luase pălăria și o aruncase în valuri.\n\nSeara, au mâncat pește la un mic restaurant de pe faleză și au vorbit ore întregi despre planurile lor. Mihai voia să devină inginer, iar Ana visa să fie profesoară de muzică.\n\nDoi ani mai târziu s-au căsătorit. Astăzi, după aproape cincizeci de ani, fotografia stă pe peretele din sufrageria lor, iar nepoții le cer mereu să le povestească istoria pălăriei pierdute în mare." }
    ],
    speaking: [
      { title: "דיאלוג: עצות לחולי שפעת", prompt: "Construiți un dialog cu colegul/colega dvs. prin care să solicitați și să oferiți sfaturi pentru persoanele gripate.", sample: "A: Of, nu mă simt deloc bine. Am febră și mă doare capul. Cred că am gripă. Ce să fac?\nB: Îmi pare rău! În primul rând, ar trebui să stai acasă și să te odihnești.\nA: Și ce să iau? Am nevoie de antibiotice?\nB: Nu, antibioticele nu ajută la viroze. Bea multe lichide, ceai cald cu lămâie și miere, și ia un medicament pentru febră.\nA: Dacă febra nu scade?\nB: Atunci du-te la medic. Și data viitoare fă-ți vaccinul antigripal în toamnă!\nA: Ai dreptate. Mulțumesc pentru sfaturi!" }
    ]
  };
  const SIMS = [SIM1, SIM2, SIM3];
  return __toCommonJS(data_exports);
})();
