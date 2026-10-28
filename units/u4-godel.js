(function(){
const L = LAB;
const lit = (s, neg) => ({k:'lit', s, neg:!!neg});
const imp = (a, b) => ({k:'imp', a, b});
const eqL = (x, y) => x.k==='lit' && y.k==='lit' && x.s===y.s && x.neg===y.neg;
const show = f => f.k==='lit' ? (f.neg?'~':'') + f.s : show(f.a) + ' → ' + show(f.b);
const WORDS = {p:'it is raining', q:'there are clouds in the sky', r:'I will water my garden'};
const say = f => f.k==='lit' ? (f.neg ? (f.s==='q' ? 'there are not clouds in the sky' : f.s==='p' ? 'it is not raining' : 'I will not water my garden') : WORDS[f.s]) : 'if ' + say(f.a) + ', then ' + say(f.b);
const AXIOMS = [{f:lit('q',true), why:'Axiom A1'}, {f:imp(lit('p'),lit('q')), why:'Axiom A2'}, {f:imp(lit('p',true),lit('r')), why:'Axiom A3'}];
const TEMPLATE = 'yields a sentence that cannot be proved in system S when appended to its own quotation';
L.add({
  id:'godel', num:'4', short:'Gödel and the limits of proof', minutes:'20–25 minutes', pages:'pp. 161–192, 197–198',
  title:'Proof is mechanical. Is truth?',
  card:'Build Fried\'s “Garden” proof, construct a Gödel-style sentence yourself, and weigh how far the result carries.',
  lede:`Fried turns from physics to logic because science's deductions are built the way proofs are. If Gödel showed that proof has limits, Fried argues, then mechanism has the same limits. This unit lets you see both why the parallel is attractive and where it is contested.`,
  html(){ return `
  <div class="case"><h3>Fried's case, step by step</h3>
    <ol class="steps">
      <li>${L.tag('est')} A proof moves from axioms through fixed laws of inference, one symbolic configuration at a time, exactly as physical law moves atoms. Logical knowledge is “constructed mechanically” (p. 167).</li>
      <li>${L.tag('est')} Gödel (1931) showed that in a consistent formal system strong enough for arithmetic there is a sentence G, saying in effect “there is no proof of G,” that the system cannot prove (pp. 170–175).</li>
      <li>${L.tag('interp')} We can still see that G is true, by reasoning about what it means. So truth can outrun proof, and “its truth must emerge via a non-mechanistic process” (pp. 186–187).</li>
      <li>${L.tag('interp')} Talk of fluids, organs or connecting rods is “meta-science,” talk about atoms. A machine, whose parts get their roles from the whole, is self-referential, and so is “the meta-scientific equivalent of Gödel sentences” (p. 184).</li>
      <li>${L.tag('interp')} Nothing in the formal system accounts for G's existence: “G should not exist. But it does” (p. 189). G exists because Gödel created it, through “Creativity and Design.” Likewise machines exist because living designers made them.</li>
    </ol>
  </div>

  <div class="section">
    <div class="kicker">Lab A · Build the Garden proof</div>
    <div class="prose"><p>Fried's toy system (pp. 163–166) has three axioms and two laws. Prove <span class="mono">r</span>, “I will water my garden.” Select two lines, then apply a law. Switch to words to see what the symbols mean; the proof does not need them.</p></div>
    <div class="lab">
      <div class="viz">
        <div id="proof" style="display:flex;flex-direction:column;gap:6px" role="group" aria-label="Proof lines"></div>
        <div id="proofMsg" class="callout" aria-live="polite">Select two lines.</div>
      </div>
      <div class="controls">
        <button class="btn primary" type="button" data-law="1">Law 1: from x → y and x, conclude y</button>
        <button class="btn primary" type="button" data-law="2">Law 2: from x → y and ~y, conclude ~x</button>
        <div class="row"><button class="btn" type="button" id="toWords" aria-pressed="false">Show in words</button><button class="btn" type="button" id="proofReset">Start over</button></div>
        <p class="small">Symbols: p = it is raining; q = there are clouds in the sky; r = I will water my garden; ~ = not.</p>
      </div>
      <div class="model-note">Every step is checked by matching symbol patterns only. That is what Fried means by mechanical: a machine could run the proof without knowing what rain is.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · Construct a self-referring sentence</div>
    <div class="prose"><p>Gödel's trick lets a sentence talk about itself without using the word “this.” Here is a version due to the philosopher W. V. Quine. Apply one fixed rule, “write the phrase in quotation marks, then write the phrase again,” to the phrase below.</p></div>
    <div class="lab single">
      <div class="viz">
        <label for="diagIn" class="small">Phrase (you can edit it)</label>
        <textarea id="diagIn" style="min-height:64px">${TEMPLATE}</textarea>
        <div class="row"><button class="btn primary" type="button" id="diag">Apply the rule</button></div>
        <div id="diagOut" class="callout" aria-live="polite" hidden></div>
      </div>
      <div class="model-note">The rule is purely mechanical: copy, quote, append. Yet the output describes the result of applying that rule to its own quoted phrase, which is the output itself. In real proofs, Gödel numbering does the quoting and arithmetic does the copying.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Three questions about G</div>
    <div class="tbl"><table>
      <thead><tr><th>Question</th><th>Standard answer</th><th>Fried's use</th></tr></thead>
      <tbody>
        <tr><td>Can G be written down by a mechanical procedure?</td><td>${L.tag('est')} Yes. Given the axioms, an algorithm produces G, as Lab B illustrates. Fried notes that Gödel's method “remains solidly within” mechanism (p. 185).</td><td>He argues nothing <i>inside</i> the system accounts for G's existence; it came from Gödel's creativity.</td></tr>
        <tr><td>Can the system prove G?</td><td>${L.tag('est')} No, if the system is consistent. A stronger system (for example, one that adds the first system's consistency as an axiom) can prove it.</td><td>Proof, the mechanical route, falls short.</td></tr>
        <tr><td>Is G true?</td><td>${L.tag('est')} Yes, in the standard model of arithmetic, provided the system is consistent: seen from a level above.</td><td>Truth is reached through meaning, a “metalogical proof” (p. 187). He reads this as non-mechanical emergence.</td></tr>
      </tbody></table></div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','Gödel\'s theorems apply to formal systems: consistent, specified by an effective list of axioms and rules, and able to express arithmetic. They say nothing directly about physical objects.')}
    ${L.claim('interp','The strongest version of Fried\'s point is about <i>levels of description</i>: some truths about a system are visible only from above it, just as a rod\'s function is visible only from the machine. Torkel Franzén\'s <i>Gödel\'s Theorem: An Incomplete Guide to Its Use and Abuse</i> (2005) is the standard account of how far such analogies can go.')}
    ${L.claim('open','<b>Kind of gap: transfer.</b> A physical machine is not a theory of itself. What would make it a “Gödel sentence” in more than an analogical sense? And does “visible only from above” imply new causes, or only new descriptions?')}
  </div>

  ${L.check('g1','In the Garden proof, what made each step valid?',[
    {t:'That it made sense in English.', ok:false, fb:' The steps work identically with the words hidden. Validity depends only on the shape of the symbols.'},
    {t:'That the symbols matched the pattern of a law of inference.', ok:true, fb:' That is the sense in which proof is mechanical (p. 167), and the starting point of Fried\'s parallel with physics.'},
    {t:'That the conclusion was true.', ok:false, fb:' A valid step can lead from false axioms to a false conclusion. Proof transmits truth; it does not check it.'}
  ])}
  ${L.check('g2','Which statement about Gödel\'s sentence G is correct?',[
    {t:'G cannot be constructed by any mechanical procedure.', ok:false, fb:' It can: the construction is an algorithm. What the system cannot do is prove G.'},
    {t:'G is unprovable in its own system (if consistent) but can be proved in a stronger one.', ok:true, fb:' Unprovability is always relative to a system. That relativity matters when the result is carried over to machines and organisms.'},
    {t:'G is neither true nor false.', ok:false, fb:' Unlike the Liar paradox, G has a definite truth value: it is true if the system is consistent.'}
  ],{reason:true})}
  ${L.note('god-1','Fried writes that machines are “the meta-scientific equivalent of Gödel sentences” (p. 184). State the strongest version of that claim you can defend, then the weakest point in it.')}
  `; },
  mount(root){
    let lines = AXIOMS.map(a => ({...a})), sel = [], words = false;
    const box = root.querySelector('#proof'), msg = root.querySelector('#proofMsg');
    function render(){ box.innerHTML = lines.map((l,i) => `<button class="proof-line ${l.f.k==='lit' && l.f.s==='r' && !l.f.neg ? 'goal' : ''}" type="button" data-i="${i}" aria-pressed="${sel.includes(i)}"><span>S${i+1}</span><span>${words ? say(l.f) : show(l.f)}</span><span class="src">${l.why}</span></button>`).join('');
      box.querySelectorAll('.proof-line').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.i;
        sel = sel.includes(i) ? sel.filter(x => x!==i) : [...sel, i].slice(-2); render(); msg.textContent = sel.length===2 ? 'Now choose a law.' : 'Select two lines.'; })); }
    function apply(law){ if (sel.length !== 2){ msg.textContent = 'Select exactly two lines first.'; return; }
      const [A,B] = sel.map(i => lines[i].f); const im = A.k==='imp' ? A : B.k==='imp' ? B : null; const other = im===A ? B : A;
      if (!im || other.k!=='lit'){ msg.textContent = 'Each law needs one “if … then” line and one simple line.'; return; }
      let out = null;
      if (law===1 && eqL(other, im.a)) out = im.b;
      if (law===2 && eqL(other, {k:'lit', s:im.b.s, neg:!im.b.neg})) out = {k:'lit', s:im.a.s, neg:!im.a.neg};
      if (!out){ msg.textContent = law===1 ? `Law 1 needs the “if” part (${show(im.a)}) as the other line.` : `Law 2 needs the negation of the “then” part (${show({k:'lit', s:im.b.s, neg:!im.b.neg})}) as the other line.`; return; }
      if (lines.some(l => l.f.k==='lit' && eqL(l.f,out))){ msg.textContent = `${show(out)} is already on the list.`; sel = []; render(); return; }
      lines.push({f:out, why:`Law ${law} on S${sel[0]+1}, S${sel[1]+1}`}); sel = []; render();
      msg.innerHTML = (out.s==='r' && !out.neg) ? `<b>Proved r.</b> You never needed to know what rain is. ${L.tag('est')}` : `Derived ${show(out)}. Keep going.`;
    }
    root.querySelectorAll('[data-law]').forEach(b => b.addEventListener('click', () => apply(+b.dataset.law)));
    root.querySelector('#toWords').addEventListener('click', e => { words = !words; e.currentTarget.setAttribute('aria-pressed', words); render(); });
    root.querySelector('#proofReset').addEventListener('click', () => { lines = AXIOMS.map(a => ({...a})); sel = []; render(); msg.textContent = 'Select two lines.'; });
    render();
    root.querySelector('#diag').addEventListener('click', () => { const t = root.querySelector('#diagIn').value.trim(); const out = root.querySelector('#diagOut');
      const isT = t === TEMPLATE;
      out.hidden = false;
      out.innerHTML = `<p class="mono" style="word-break:break-word">“${L.esc(t)}” ${L.esc(t)}.</p>` + (isT
        ? `<p style="margin-top:8px">Read it carefully: it says that appending the quoted phrase to itself yields an unprovable sentence. But appending the quoted phrase to itself yields <i>exactly this sentence</i>. So the sentence says of itself that it cannot be proved in S, and you produced it by copying.</p>`
        : `<p style="margin-top:8px" class="small">The rule works on any phrase; it produces self-reference only when the phrase describes the rule itself. Restore the original phrase to see Gödel's case.</p>`); });
  }
});
})();
