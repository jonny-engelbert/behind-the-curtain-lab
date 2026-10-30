(function(){
const L = LAB;
const STEPS = [
  ['s1','Science rests on assumptions it has not examined: measurability, reproducibility, reduction, its own method.','Part I'],
  ['s2','Mechanism explains a great deal, including how open systems organize themselves.','Part II'],
  ['s3','Mechanism cannot produce functional differentiation: symmetry breaking only restricts identical atoms under one law.','Part III'],
  ['s4','Logic shows the same limit: proof is mechanical, truth outruns it, and machines, like Gödel\'s sentence, need a designer.','Part III'],
  ['s5','Quantum physics is irreducible at the bottom: properties are created at measurement, and parts are not separable.','Part IV'],
  ['s6','Conventional quantum theory is incomplete: it cannot bridge micro and macro or describe measurement.','Part V'],
  ['s7','Quantum linguistics completes it: merging, autonomous actualization, variable multistate character, and a mental dimension.','Parts IV–V'],
  ['s8','Suppression yields classical rocks; stabilization near the edge of chaos yields organization and life.','Part V'],
  ['s9','Organized systems evolve through symbols and meaning; reproduction and the self solve the resulting waste.','Part VI'],
  ['s10','The new science studies the particular, and its language is poetry.','Part VI']
];
const PREMISES = [
  ['p1','Symmetry breaking cannot give atoms relational identities, so mechanism cannot produce functional differentiation.','Plausible as a point about what symmetry breaking does. The contested step is whether relational roles need new laws, or arise from constraints, boundary conditions and history under the same laws (Unit 3).'],
  ['p2','Machines are the meta-scientific equivalent of Gödel sentences.','A structural parallel. It sharpens the question of origin, but carrying a theorem about formal systems over to physical ones is the most contested link (Unit 4).'],
  ['p3','Quantum theory as formulated cannot be a universal theory.','The measurement problem motivates this claim, but an open interpretive problem does not establish that quantum theory must fail as a universal theory. Interpretations and modified dynamics offer different responses (Units 5 and 7).'],
  ['p4','Classical pattern-forming systems hit a ceiling at chaos.','Needs an argument. Model systems show order returning inside chaos, and self-organized criticality sustains complexity (Unit 1).'],
  ['p5','Physical systems have a mental dimension.','A coherent philosophical position with a long history (Leibniz, Whitehead, modern panpsychism). It is not currently testable, and Fried says so (Units 0, 5, 8).'],
  ['p6','Multistate stabilization explains how organization and life arise.','The book\'s most original physical idea. It needs a definition of multistate character, conditions for stabilization, and a prediction (Unit 7).']
];
const shuffled = ['s6','s1','s9','s3','s7','s2','s10','s5','s8','s4'];
L.add({
  id:'synthesis', num:'9', short:'Putting it together', minutes:'25 minutes', pages:'whole book',
  title:'Rebuild the argument, then judge it',
  card:'Order Fried\'s argument from Part I to Part VI, rate its key premises, apply it to new cases, and gather your notebook.',
  lede:`You have now met every step of Fried's argument and the physics under it. This unit asks you to put the steps in order, say how well each key premise is supported, and test the whole account on cases the book does not discuss.`,
  html(){ return `
  <div class="section">
    <div class="kicker">1 · Order the argument</div>
    <div class="prose"><p>Put Fried's ten steps in the order the book builds them. Use the arrows to move a step.</p></div>
    <ol class="steps" id="order" style="list-style:none;padding:0;gap:6px"></ol>
    <div class="row"><button class="btn primary" type="button" id="checkOrder">Check the order</button><span class="small" id="orderMsg" aria-live="polite"></span></div>
  </div>

  <div class="section">
    <div class="kicker">2 · Rate the key premises</div>
    <div class="prose"><p>For each premise, choose a rating and write one sentence of reasons. Then reveal how this course rates it. There is no answer key here: disagreeing with the course, or with Fried, is fine if your reasons are good.</p></div>
    <div class="stack" id="premises"></div>
  </div>

  <div class="section">
    <div class="kicker">3 · Transfer</div>
    <div class="prose"><p>Apply the four questions from Unit 3, behavior, function, origin and experience, to three systems. Then say what Fried\'s framework adds for each, and what observation would help judge that addition.</p></div>
    <div class="two">
      ${L.note('tr-thermo','A thermostat')}
      ${L.note('tr-cell','A living cell')}
    </div>
    ${L.note('tr-robot','A robot that learns its own control strategy','Fried calls machines “symbols” whose organization is imposed (p. 191). Does learning change that? He also lists artificial intelligence as part of the tower of complexity that living systems build (p. 324).')}
    <div class="callout small"><b>Self-check.</b> A strong answer keeps feedback (the thermostat) apart from self-maintenance (the cell), does not infer experience from either one alone, describes Fried\'s stabilization accurately, and names a specific definition or measurement that would help compare his account with the standard one.</div>
  </div>

  <div class="section">
    <div class="kicker">4 · Your notebook</div>
    <div class="prose"><p>Everything you have written is collected here. It is stored only in this browser, so download a copy to keep. Downloads include written answers and premise ratings; they do not back up every lab setting.</p></div>
    <div class="row"><button class="btn primary" type="button" id="copyNb">Copy my notebook</button><button class="btn" type="button" id="downloadNb">Download my notebook</button><span class="small" id="copyMsg" aria-live="polite"></span></div>
    <textarea id="nbAll" readonly style="min-height:220px" aria-label="All notebook entries"></textarea>
  </div>

  <div class="section">
    <div class="kicker">For another day</div>
    <div class="callout">Without looking back, explain the difference between a superposition and a mixture using the interferometer; say why no classical team beats 75% in the CHSH game; and state, in two sentences each, what suppression and stabilization do in Fried's account. Then name the one definition you would ask Fried for first.</div>
  </div>`; },
  mount(root){
    let order = L.get('order', shuffled.slice());
    const ol = root.querySelector('#order');
    function renderOrder(){ ol.innerHTML = order.map((id,i) => { const s = STEPS.find(x=>x[0]===id);
      return `<li class="sort-item" style="grid-template-columns:auto minmax(0,1fr) auto" data-id="${id}"><span class="mono small">${i+1}</span><span>${s[1]}</span>
        <span class="row" style="flex-wrap:nowrap"><button class="btn" type="button" data-mv="-1" data-i="${i}" aria-label="Move up" ${i===0?'disabled':''}>↑</button><button class="btn" type="button" data-mv="1" data-i="${i}" aria-label="Move down" ${i===order.length-1?'disabled':''}>↓</button></span>
        <span class="fbline" hidden></span></li>`; }).join('');
      ol.querySelectorAll('[data-mv]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.i, j = i + +b.dataset.mv;
        [order[i], order[j]] = [order[j], order[i]]; L.set('order', order); renderOrder(); ol.querySelectorAll('[data-mv]')[j*2 + (+b.dataset.mv > 0 ? 1 : 0)]?.focus(); })); }
    renderOrder();
    root.querySelector('#checkOrder').addEventListener('click', () => { let n = 0;
      ol.querySelectorAll('li').forEach((li,i) => { const id = li.dataset.id, want = STEPS[i][0], ok = id === want; if (ok) n++;
        li.classList.toggle('right', ok); li.classList.toggle('wrong', !ok);
        const f = li.querySelector('.fbline'); f.hidden = false; const s = STEPS.find(x=>x[0]===id); f.textContent = `${s[2]}${ok ? '' : ` · belongs at position ${STEPS.findIndex(x=>x[0]===id)+1}`}`; });
      root.querySelector('#orderMsg').textContent = n === 10 ? 'All ten in order. That is the book\'s argument from Part I to Part VI.' : `${n} of 10 in place. The book part is shown under each step.`; });

    const ratings = L.get('ratings', {});
    root.querySelector('#premises').innerHTML = PREMISES.map(p => `<div class="check" id="pr-${p[0]}"><div class="q">${p[1]}</div>
      <div class="seg" role="group" aria-label="Rating">${['Well supported','Plausible, needs work','Weak'].map(r => `<button class="btn" type="button" data-pr="${p[0]}" data-r="${r}" aria-pressed="${ratings[p[0]]===r}">${r}</button>`).join('')}</div>
      ${L.note('pr-'+p[0],'Your reason')}
      <div class="row"><button class="btn" type="button" data-reveal="${p[0]}">Show the course's view</button></div>
      <div class="fb" id="prv-${p[0]}" hidden>${p[2]}</div></div>`).join('');
    // notes inside premises were inserted after core wiring; wire them now
    root.querySelectorAll('#premises textarea[data-note]').forEach(t => { const k = 'note:' + t.dataset.note; t.value = L.get(k, ''); t.addEventListener('input', () => L.set(k, t.value)); });
    root.querySelectorAll('[data-pr]').forEach(b => b.addEventListener('click', () => { ratings[b.dataset.pr] = b.dataset.r; L.set('ratings', ratings);
      root.querySelectorAll(`[data-pr="${b.dataset.pr}"]`).forEach(x => x.setAttribute('aria-pressed', x===b)); }));
    root.querySelectorAll('[data-reveal]').forEach(b => b.addEventListener('click', () => { root.querySelector('#prv-'+b.dataset.reveal).hidden = false; }));

    function compile(){ const parts = [];
      const notes = [['start-1','Rachel\'s cube'],['mech-1','The chaos ceiling'],['ent-1','Symbolic entropy, first thoughts'],['fn-1','What mechanism cannot answer'],['god-1','Machines as Gödel sentences'],['q-1','Created or revealed?'],['w-1','One object or two?'],['ladder-spec','A specification for stabilization'],['mn-field','Field notebook'],['tr-thermo','Transfer: thermostat'],['tr-cell','Transfer: cell'],['tr-robot','Transfer: learning robot']];
      notes.forEach(([k,t]) => { const v = L.get('note:'+k,''); if (v.trim()) parts.push(`## ${t}\n${v.trim()}`); });
      (L.discussionQuestions || []).forEach(q => { const v = L.get('note:discussion-'+q.id, ''); if (v.trim()) parts.push(`## Discussion: ${q.title}\n${v.trim()}`); });
      PREMISES.forEach(p => { const r = ratings[p[0]], v = L.get('note:pr-'+p[0],''); if (r || v.trim()) parts.push(`## Premise: ${p[1]}\nRating: ${r || '—'}\n${v.trim()}`); });
      const included = new Set([...notes.map(([k]) => k), ...PREMISES.map(p => 'pr-'+p[0]), ...(L.discussionQuestions || []).map(q => 'discussion-'+q.id)]);
      L.notes().forEach(([k,v]) => { const id = k.slice(5); if (!included.has(id) && v.trim()) parts.push(`## Additional note: ${id}\n${v.trim()}`); });
      Object.keys(L.get('checks',{})).length && parts.push(`## Checks answered\n${Object.keys(L.get('checks',{})).length} questions`);
      return parts.length ? `Behind the Curtain Lab · my notebook\n\n` + parts.join('\n\n') : 'Your notebook is empty so far. Notes you write in any unit appear here.'; }
    const all = root.querySelector('#nbAll'); all.value = compile();
    root.addEventListener('input', () => { all.value = compile(); });
    root.querySelector('#downloadNb').addEventListener('click', () => L.downloadNotebook(compile()));
    root.querySelectorAll('[data-pr]').forEach(b => b.addEventListener('click', () => { all.value = compile(); }));
    root.querySelector('#copyNb').addEventListener('click', () => { const txt = compile(); all.value = txt;
      const done = m => root.querySelector('#copyMsg').textContent = m;
      try { navigator.clipboard.writeText(txt).then(() => done('Copied.'), () => { all.select(); done('Selected: press Ctrl+C or ⌘C to copy.'); }); }
      catch(e){ all.select(); done('Selected: press Ctrl+C or ⌘C to copy.'); } });
  }
});
})();
