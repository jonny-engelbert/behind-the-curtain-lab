/* Book companion: editorial questions, not additional claims by the author. */
(function () {
  const L = LAB;
  const questions = [
    {id:'godel', title:'What does Gödel establish here?', pages:'Part III · pp. 161–192', unit:'godel',
      case:'Fried compares the relation between a proof system and its metatheory with the relation between atoms and a functioning machine.',
      rival:'Incompleteness concerns provability in specified formal systems. A Gödel sentence can be constructed algorithmically; extending the theorem to physical organization requires a separate argument.',
      task:'State the strongest version of the analogy. Then name the extra premise needed to turn it into a claim about what physical processes can produce.'},
    {id:'selection', title:'Where does natural selection fit?', pages:'Parts III–V · pp. 141–161, 231, 328–329', unit:'function',
      case:'Fried locates the emergence of autonomous functional organization in multistate stabilization. He acknowledges evolution, but leaves its relationship to this new process underdeveloped.',
      rival:'Heritable variation and differences in reproductive success can accumulate adaptations across generations. That account of adaptation is distinct from the still-open details of life’s origin and from the question of subjective experience.',
      task:'Does stabilization generate variation, enable the first evolving systems, or change selection itself? Choose one reading, explain your reason, and name an observation that would separate it from the standard account.'},
    {id:'prediction', title:'What observation would distinguish stabilization?', pages:'Part V · pp. 315, 325–329', unit:'ladder',
      case:'Fried proposes that multistate character can reappear at a higher organized level. The ladder illustrates this proposal; it does not simulate a derived physical law.',
      rival:'Ordinary quantum dynamics and environmental interactions already predict some coherence and its loss. Collapse models add specified dynamics with experimentally testable parameters.',
      task:'Define the observable, comparison system, preparation, environment, timescale and predicted difference. Name a result that would count against the proposal. A living-versus-inert comparison is a possible research question, not a quantitative prediction derived in the book.'},
    {id:'experience', title:'What does the mental dimension add?', pages:'Parts IV and VI · pp. 235–240, 355–356', unit:'quantum',
      case:'Fried describes actualization as choice conditioned by a system’s history and experience. This gives his account an experiential interpretation.',
      rival:'Standard quantum theory can already predict correlations between successive measurements through state preparation, dynamics and measurement updates. The Born rule does not by itself require independent outcomes across time.',
      task:'Is the proposed addition a different interpretation, different dynamics, or both? If you propose a statistical test, specify a standard quantum model first and say exactly which prediction would change.'},
    {id:'particularity', title:'How can a science of particularity accumulate knowledge?', pages:'Parts I and VI · pp. 57, 63–64, 383–386', unit:'meaning',
      case:'Fried asks for a science sensitive to singular histories, meaning and novelty, and closes with poetry as a possible language for it.',
      rival:'Historical sciences already compare records, reconstruct causes and test competing accounts of events that cannot be repeated. A new method needs to explain what it adds to those practices.',
      task:'Choose a particular organism or event. List the record you would keep, two competing explanations, a way another investigator could challenge your reading, and what would lead you to revise it.'}
  ];
  L.discussionQuestions = questions;
  L.downloadNotebook = function (text) {
    const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'behind-the-curtain-notebook.txt';
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  L.welcome = function () {
    const last = L.units.find(u => u.id === L.get('last-unit','') && !u.resource && u.id !== 'start');
    return `<section class="entry-paths" aria-labelledby="entry-title"><div class="kicker">A companion to your reading</div><h2 id="entry-title">Choose a way in</h2>
      <div class="path-grid"><a href="#start" class="path-link" id="try-cube"><span class="small">10 minutes · start exploring</span><strong>Try Rachel’s cube</strong><span>Begin with something you can see. No physics background needed.</span></a>
      <a href="#companion" class="path-link"><span class="small">Alongside the book</span><strong>Find your place in the argument</strong><span>Match the six Parts to labs and questions.</span></a>
      <a href="#ladder" class="path-link"><span class="small">30 minutes · the central proposal</span><strong>Explore Fried’s ladder</strong><span>Follow suppression and stabilization, then ask what would test them.</span></a></div>
      ${last ? `<a class="resume-link" href="#${last.id}">Resume your last unit: ${L.esc(last.short)} →</a>` : ''}
      <p class="small">The full course takes roughly four hours. Use one lab at a time, or follow the units in order. Simulations illustrate stated models; they are not experiments on nature.</p></section>`;
  };
  const parts = [
    ['I','Science','13–73','Assumptions, evidence and first-person experience',[['start','Start here'],['synthesis','Assess the premises']]],
    ['II','Mechanism','74–140','How far ordinary physical explanations reach',[['mechanism','Oscillation and chaos'],['entropy','Open systems and entropy']]],
    ['III','Reason','141–192','Function, machines and the Gödel analogy',[['function','Motion and function'],['godel','Limits of proof']]],
    ['IV','Organism','193–255','Quantum properties, interpretation and non-separability',[['quantum','Possibility and measurement'],['wholes','The CHSH game']]],
    ['V','Evolution','256–337','Fried’s proposed route to organized systems',[['ladder','Suppression and stabilization'],['quantum','The measurement problem']]],
    ['VI','Language','338–386','Symbolic evolution, reproduction and self',[['meaning','Meaning, life and self'],['synthesis','Rebuild and evaluate']]]
  ];
  L.add({id:'companion', num:'Guide', resource:true, short:'Book guide & five questions', minutes:'Read at your own pace', pages:'printed page numbers',
    title:'Read the book. Follow the argument. Ask what would settle it.',
    lede:'A reading map and five discussion questions for Behind the Curtain. Represent Fried’s argument fairly, compare the alternatives, and keep track of what evidence would change your view.',
    html() { return `<section class="case"><h2>Find the lab for your reading</h2><p class="small">References use the page numbers printed in the book, not your PDF viewer’s page count. The course follows the argument across Parts rather than reproducing each section in sequence.</p>
      <div class="reading-map">${parts.map(p => `<article><div class="small mono">Part ${p[0]} · pp. ${p[2]}</div><h3>${p[1]}</h3><p>${p[3]}</p><div class="row">${p[4].map(([id,t])=>`<a href="#${id}">${t} →</a>`).join('')}</div></article>`).join('')}</div></section>
      <section class="section"><div class="kicker">From the book assessment</div><h2>Five questions worth working through</h2><div class="prose"><p>These are editorial prompts adapted from the supplied assessment. They are not statements of Fried’s own position. Write your answer before opening the comparison, then revise it if needed.</p><p class="small">A fair test needs both an accurate account of the proposal and a strong alternative. Disagreement is useful when you can say which premise or observation matters.</p></div>
      ${questions.map((q,i)=>`<article class="case discussion"><div class="small mono">Question ${i+1} · ${q.pages}</div><h3>${q.title}</h3>${L.claim('prop',q.case)}<details><summary>Compare with an alternative</summary><p>${q.rival}</p></details>${L.note('discussion-'+q.id,q.task)}<a href="#${q.unit}">Work through the related lab →</a></article>`).join('')}
      <div class="row"><button class="btn primary" type="button" id="downloadDiscussion">Download these answers</button><a href="#synthesis">Open your full notebook →</a></div><p class="small">Answers stay in this browser on this website. A download is a readable copy, not a restorable backup. Notes on the live site and on a local preview are stored separately.</p></section>
      <section class="case"><h2>Read beyond the model</h2><p>Use these sources to check the comparisons above. The book and supplied assessment provide the reading map and discussion themes; the links below support the scientific alternatives.</p>
      <ul class="source-list"><li><a href="https://teach.genetics.utah.edu/content/evolution/selection/">University of Utah · Natural selection</a><span>Variation, inheritance and reproductive advantage. Useful for Question 2.</span></li>
      <li><a href="https://arxiv.org/abs/2310.14969">Bassi, Dorato and Ulbricht · Collapse models</a><span>A review of how alternative quantum dynamics connect to experimental tests. Useful for Question 3.</span></li>
      <li><a href="https://www.lancaster.ac.uk/staff/schomeru/lecturenotes/Quantum%20Mechanics/S10.html">Henning Schomerus · Consequences of the measurement postulate</a><span>Why successive measurement outcomes need not be independent. Useful for Question 4.</span></li></ul>
      <p class="small">For the formal limits of incompleteness, see Torkel Franzén, <em>Gödel’s Theorem: An Incomplete Guide to Its Use and Abuse</em> (2005), discussed in Unit 4. Scientific sources explain their own models; they do not validate quantum linguistics.</p></section>`;},
    mount(root) {
      root.querySelector('#downloadDiscussion').addEventListener('click', () => {
        const entries = questions.map(q => `${q.title}\n${L.get('note:discussion-'+q.id,'').trim() || '(No answer yet)'}`);
        L.downloadNotebook('Behind the Curtain Lab · five questions\n\n'+entries.join('\n\n'));
      });
    }
  });
  document.querySelector('.skip-link').addEventListener('click', e => { e.preventDefault(); document.getElementById('main').focus(); });
  // Move directly to the opening activity without resetting the unit or its saved state.
  document.addEventListener('click', e => {
    if (!e.target.closest('#try-cube')) return;
    e.preventDefault(); const cube = document.getElementById('cube');
    if (cube) { cube.closest('.section').scrollIntoView({block:'start'}); cube.setAttribute('tabindex','-1'); cube.focus({preventScroll:true}); }
  });
})();
