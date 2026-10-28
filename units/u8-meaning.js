(function(){
const L = LAB;
const items = [
  {t:'A duplicated gene, no longer needed for its old job, later takes on a new one.', a:'spare', fb:'Spare parts: unused material that later becomes “an essential building block to reach the next level” (p. 379).'},
  {t:'Feathers first evolved for warmth and were later used for flight.', a:'spare', fb:'Spare parts again: biologists call this exaptation, a form reinterpreted for a new function.'},
  {t:'Each new word in a language makes further sentences and further words possible.', a:'auto', fb:'Autocatalysis of meaning: “the more symbols that actualize, the more symbols that actualize” (p. 375).'},
  {t:'DNA stores a recipe for proteins rather than the proteins themselves.', a:'enc', fb:'Encoding: material form that stands for function, which Fried calls “encoded” form (p. 376).'},
  {t:'A cell divides, sending its accumulated material into two new cells.', a:'rep', fb:'Reproduction: Fried\'s solution to the pile of material waste, channelling it into copies (p. 380).'},
  {t:'A person organizes memories into a life story that guides their choices.', a:'self', fb:'Self: the center that organizes symbols into “auto-biography” and narrative (p. 381).'}
];
L.add({
  id:'meaning', num:'8', short:'Meaning, life and self', minutes:'20–25 minutes', pages:'pp. 338–389',
  title:'From atomic rearrangement to symbolic transformation',
  card:'Fried\'s Part VI: meaning that catalyzes meaning, symbolic waste and entropy, and why reproduction and the self appear.',
  lede:`Part VI carries the ladder into meaning. Above the first stabilization, Fried argues, organized systems are driven less by outside gradients than by their own symbols. That produces a flood of meaning, waste that must be managed, and finally a self. This unit works through those ideas and asks what they would need to become measurable.`,
  html(){ return `
  <div class="case"><h3>Fried's case</h3>
    ${L.claim('interp','Every worldview is inherited like a native language. Science replaced supernaturalism and animism because it is open and admits error: “scientists admit their ideas can be wrong. It\'s an important element of what makes them right” (p. 346). But science has its own unexamined beliefs: the method, abstraction, and mechanism.')}
    ${L.claim('interp','Each old view held a kernel worth keeping. Supernaturalism went wrong by populating its unseen realm with gods; its kernel is that some real things, such as mind, are not measurable. Animism went wrong by humanizing rocks; its kernel is that the universe is fundamentally alive (pp. 349–350).')}
    ${L.claim('prop','Mind and matter form a “braided stream” (p. 357). Each actualization has an objective strand, material form, and a subjective one, experience. Organized systems are “literally ‘thought’ into existence” (p. 363). “For mechanism, the fundamental concept is ‘atomic rearrangement’, while for holism the fundamental concept is ‘symbolic transformation’” (p. 370).')}
    ${L.claim('prop','Symbols carry meaning between parts and the whole, so language is “the mediator between intent and action” (p. 368). Meaning catalyzes meaning; the flood leaves “symbolic waste,” counted by a <b>symbolic entropy</b> under a “symbolic second law” (pp. 375–378). The waste is not useless: it is “spare parts” and “vocabulary” for later.')}
    ${L.claim('prop','At level A₃, two solutions appear: <b>reproduction</b> clears the material waste, and the <b>self</b> organizes the symbolic waste into narrative, bringing “Self-awareness. Intention. Purpose.” Fried leaves open which came first (pp. 380–382).')}
  </div>

  <div class="section">
    <div class="kicker">Lab A · Material and symbolic entropy side by side</div>
    <div class="tbl"><table>
      <thead><tr><th></th><th>Material entropy ${L.tag('est')}</th><th>Symbolic entropy ${L.tag('prop')}</th></tr></thead>
      <tbody>
        <tr><td>What is counted</td><td>Microscopic arrangements giving the same macrostate (Unit 2)</td><td>Arrangements of discarded symbolic form giving the same function and behavior (p. 378)</td></tr>
        <tr><td>Second law</td><td>Low-entropy order is paid for by high-entropy heat flows</td><td>Low-entropy “encoded” organization is paid for by high-entropy symbolic waste</td></tr>
        <tr><td>Efficiency</td><td>Engines cannot turn all energy into work</td><td>Systems cannot turn all meaning into function</td></tr>
        <tr><td>Defined measure</td><td>Yes: S = k ln W, measured in J/K</td><td>Not yet: the arrangements to be counted are not specified</td></tr>
      </tbody></table></div>
    ${L.claim('est','Information theory already counts arrangements of symbols: Shannon entropy, H = −Σ p log p. If symbolic entropy is to be measured, one natural route is to say what the symbols are and what their probabilities would be.')}
  </div>

  <div class="section">
    <div class="kicker">Lab B · Possible parallels in biology and mind</div>
    <div class="prose"><p>Match each example to Fried's idea it best illustrates. ${L.tag('interp','Parallels suggested by this course, not by Fried')} Fried gives few concrete examples in Part VI; these are offered to make his terms concrete, and you may disagree with them.</p></div>
    ${L.sorter('mn', items, [['spare','Spare parts'],['auto','Autocatalysis of meaning'],['enc','Encoding'],['rep','Reproduction'],['self','Self and narrative']])}
  </div>

  <div class="section">
    <div class="kicker">Lab C · Back to Rachel's cube</div>
    <div class="callout" id="cubeBack"></div>
    ${L.note('start-1','Your note from the start. Revise it now that you have seen the physics and Fried\'s proposal.')}
  </div>

  <div class="section">
    <div class="kicker">A science of particularity</div>
    ${L.claim('interp','Laws describe ensembles, but each system has its own history: “there is no ‘many’, there is only ‘one’, and with ‘one’, statistics cannot prevail” (p. 227). Fried\'s new science attends to the particular, and its language is poetry.')}
    ${L.quote('What we are looking for is a language that will prepare us for the unexpected, not inform us of what to expect.', '386')}
    ${L.claim('open','<b>Kind of gap: method.</b> How would such a science build reliable knowledge? Historical sciences such as geology and evolutionary biology study one-off histories with evidence, reconstruction and patterns found in hindsight. Fried\'s own image fits: “Historians are detectives, while scientists are explorers” (p. 57).')}
    ${L.note('mn-field','Field notebook: describe one particular living thing you can observe today, a plant, a pet or yourself, attending to what is unique in its history rather than what makes it typical.')}
  </div>

  ${L.check('mn1','In Fried\'s account, why does the self appear?',[
    {t:'Because a system becomes complicated enough.', ok:false, fb:' Fried rejects complexity as the key. The self arrives at a specific level, A₃, as a solution to a specific problem.'},
    {t:'To organize the growing pile of symbolic waste into a coherent narrative, giving the system a center.', ok:true, fb:' Below A₃ the system\'s symbols are distributed, with “no ‘center’” (p. 381). The self stabilizes the flood.'},
    {t:'Because electrons already have selves.', ok:false, fb:' Fried gives electrons a simple mental dimension, experience, but not a self. Experience is everywhere; the self comes late.'}
  ])}
  ${L.check('mn2','What would make “symbolic entropy” a measurable quantity?',[
    {t:'Nothing: meaning can never be measured.', ok:false, fb:' Too strong. Information theory measures arrangements of symbols; the gap is a definition, not an impossibility.'},
    {t:'Specifying what counts as a discarded symbol, how to tell configurations apart, and which ones yield the same function.', ok:true, fb:' Material entropy became measurable once microstates and macrostates were defined. The same steps would apply here.'},
    {t:'Measuring the heat a brain gives off.', ok:false, fb:' That measures material entropy. Fried\'s symbolic entropy is meant to be a separate, higher-level quantity.'}
  ])}
  `; },
  mount(root){
    L.wireSorter(root,'mn',items);
    const log = L.get('cube', null), box = root.querySelector('#cubeBack');
    const sum = c => c ? c.L + c.U + c.F + c.N : 0;
    if (!log || (sum(log.neutral) + sum(log.cue)) === 0){ box.innerHTML = 'You have not recorded any cube reports yet. <a href="#start">Go back to the start</a> to try it, then return here.'; }
    else { const n = log.neutral, k = sum(n);
      box.innerHTML = `<b>Your plain-cube reports:</b> L in front ${n.L}, U in front ${n.U}, flipped ${n.F}, can't tell ${n.N} (${k} total). Fried predicted an even split between L and U (p. 237). You now know that measurement in physics needs a record, not a mind (Unit 5), and that Fried's claim that a proton chooses like Rachel is his proposal (Units 5 and 7). What does the cube still show?`; }
  }
});
})();
