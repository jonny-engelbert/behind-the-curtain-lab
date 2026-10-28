(function(){
const L = LAB;
// stages of the ladder
const STAGES = [
  {id:'A1', row:0, col:0, name:'A₁ · atoms', ms:'full multistate', what:'Isolated atoms (electrons, protons, nuclei) each exist as a multistate of possibilities. In Fried\'s reading, each also has a simple mental dimension: an “undifferentiated aesthetic continuum” before actualization (p. 301).', needs:[], explains:'The quantum behavior of single particles, which conventional theory already describes.', spec:'Nothing new is needed here; this level is standard quantum mechanics plus Fried\'s interpretation.'},
  {id:'B1', row:0, col:1, name:'B₁ · merged level', ms:'multistate reduced', what:'As atoms are assembled, they merge and lose their individual identities. New “higher-level atoms” emerge that are not built from A-atoms; once merged, A-atoms are “properties” of the whole rather than its parts (pp. 311–313).', needs:['merge','vary'], explains:'Why a composite can behave as one thing, and why its quantum character can differ from its parts\'.', spec:'A rule for when merging happens and what the new level\'s state space is.'},
  {id:'C1', row:0, col:2, name:'C₁ · near-classical', ms:'multistate nearly suppressed', what:'Each level is more suppressed than the last. The system behaves almost classically: it forms patterns under driving, then becomes unstable and heads for chaos (pp. 317–325).', needs:['merge','vary','auto'], explains:'The micro–macro problem: why big things look classical even though their parts are quantum.', spec:'A measure of “degree of multistate character” and how it falls from level to level.'},
  {id:'END', row:0, col:3, name:'Classical object', ms:'fully suppressed', what:'If suppression runs on uninterrupted, the result is a fully unistate, classical object: “Like rocks” (p. 335). Fried notes this lands “back… where we started,” with organization still unexplained (p. 319).', needs:['merge','vary','auto'], explains:'Planets, rocks and the bust of Newton: the world Newton\'s laws describe.', spec:'Agreement with existing tests of quantum mechanics on inanimate matter.', end:true},
  {id:'A2', row:1, col:0, name:'A₂ · organization', ms:'multistate re-emerges', what:'Near the edge of chaos, connections between levels let A₁, B₁ and C₁ merge into a new level, A₂, where multistate character returns. Because a multistate lacks the definite property that resonance acts on, it is shielded from instability. Its possibilities reflect the flows and structures beneath it, so its parts can “fit” them: “Presto! Organization enters the universe” (p. 328).', needs:['merge','vary','auto','between'], explains:'How functional differentiation can arise from within, without a designer: the question left open in Unit 3.', spec:'Conditions for a stabilization event, why multistate character shields against resonance, and what A₂\'s possibilities are.', stab:true},
  {id:'B2', row:1, col:1, name:'B₂, C₂', ms:'suppressed again, locking in function', what:'A₂ starts its own run of suppression, which “locks in” the new functional relationships. Above A₂, evolution is driven less by outside gradients and more by an internal force: symbols and meaning (pp. 328–329, 372–374).', needs:['merge','vary','auto','between'], explains:'Why organized systems keep their organization against disturbances.', spec:'What “symbols” correspond to in physical terms, and how they drive change.'},
  {id:'A3', row:1, col:2, name:'A₃ · narrative', ms:'re-emerges again', what:'A second stabilization brings a level that integrates functions into a narrative. It solves two piles of waste: material waste through reproduction, symbolic waste through a self (pp. 380–382).', needs:['merge','vary','auto','between'], explains:'Reproduction, self-awareness, intention and purpose.', spec:'Whether self or reproduction comes first; Fried leaves this open (p. 382).', stab:true},
  {id:'NEXT', row:1, col:3, name:'Communication, association', ms:'cycle continues', what:'Selves that communicate form associations, and the cycle of suppression and stabilization begins again at a larger scale, “with no end in sight!” (p. 382).', needs:['merge','vary','auto','between'], explains:'Societies, cultures, and the open-ended growth of complexity.', spec:'Everything above, at a new scale.'}
];
const POST = [
  ['merge','Generalized non-separability','Assembled objects merge and lose their identities (pp. 293–294).','Without it: atoms keep their identities, the composite is just a large entangled state, and conventional theory predicts macroscopic multistates. This is the micro–macro problem.'],
  ['auto','Autonomous actualization','Q is expanded so that systems can actualize from within, without an outside measurement (p. 294).','Without it: only an external measurement M can actualize anything, and the Q–M conflict stands.'],
  ['vary','Generalized uncertainty principle','The degree of multistate character can differ between objects and change as a system develops (pp. 297–298, 314).','Without it: every level carries the same quantum character, so nothing is ever suppressed.'],
  ['between','Connections between levels','Non-separability also links levels, so suppressed multistate character can re-emerge (p. 325).','Without it: suppression runs to the end and every large system becomes a rock.']
];
L.add({
  id:'ladder', num:'7', short:'Fried\'s ladder', minutes:'30 minutes', pages:'pp. 287–337',
  title:'Suppression makes rocks. Stabilization makes life.',
  card:'Rebuild Fried\'s own theory step by step, switch his postulates off one at a time, and compare it with decoherence and collapse models.',
  lede:`This is Fried's original contribution, and he flags it plainly: “up to this point very little I have said has been ‘new’… Much of what follows, however, is new” (p. 288). Your first job is to rebuild his account in his terms. Your second is to say what it would need in order to be tested.`,
  html(){ return `
  <div class="case"><h3>Fried's case</h3>
    ${L.claim('interp','Conventional quantum theory cannot bridge micro and macro: build any many-atom state and it is still a multistate, yet planets and people are not. And its two laws conflict: Q preserves multistate character, while measurement M destroys it (pp. 271–276).')}
    ${L.claim('prop','Quantum linguistics completes the theory with three postulates, plus connections between levels. Assembled systems are <b>monads</b>, “a material ‘presence’ immersed within a swirl of mental images” (p. 310), built as towers of emergent levels.')}
    ${L.claim('prop','Two routes lead up from atoms. <b>Suppression</b> makes each level more classical and ends in rocks. <b>Stabilization</b>, near the edge of chaos, brings multistate character back at a new level and so brings organization. Repeated stabilizations amplify it, and the mind that goes with it, up to the scale of living things (pp. 325–334).')}
    ${L.quote('Presto! Organization enters the universe.', '328')}
  </div>

  <div class="section">
    <div class="kicker">Lab A · Build the ladder</div>
    <div class="prose"><p>Step up the ladder. At C₁ you choose: let suppression continue, or let a stabilization event happen. Each step shows what changes in Fried\'s account, which postulates it relies on, what it is meant to explain, and what still needs to be specified. Then switch postulates off to see what each one does.</p></div>
    <div class="lab single">
      <div class="viz">
        <div class="ladder-grid" id="ladder" role="list" aria-label="Levels of emergence"></div>
        <div class="row" id="ladderCtl"></div>
        <div class="callout" id="stagePanel" aria-live="polite"></div>
      </div>
      <div>
        <div class="kicker small" style="font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">Fried's postulates · switch one off</div>
        <div class="two" id="postulates"></div>
      </div>
      <div class="model-note">A conceptual model of Fried's proposal, not a simulation. Levels show order of emergence, not time or size, and the multistate descriptions are qualitative because the book gives no numbers. Inventing a numerical “stabilization strength” would make the theory look more developed than it is.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · Benchmarks beside the ladder</div>
    <div class="prose"><p>Two established approaches do part of the same job with numbers attached. Compare them with Fried's proposal.</p></div>
    <div class="two">
      <div class="case">
        <h3>${L.tag('est')} Decoherence</h3>
        <p class="small">When a quantum system interacts with its surroundings, the surroundings record which possibility occurred, and interference fades. In a simple dephasing model the fringe visibility falls as V = e<sup>−Γt</sup>.</p>
        ${L.slider('gt','Coupling × time, Γt',0,6,0.01,0.5)}
        <canvas class="plot" id="decoh" style="height:180px" aria-label="Visibility against coupling times time"></canvas>
        <p class="small">This is standard physics doing something like Fried's <i>suppression</i>. It does not, on its own, pick which outcome occurs.</p>
      </div>
      <div class="case">
        <h3>${L.tag('interp','Proposal · GRW, not Fried')} Spontaneous collapse</h3>
        <p class="small">Ghirardi, Rimini and Weber (1986) add spontaneous localization: each particle collapses at a rate λ ≈ 10⁻¹⁶ per second, and a bound object of N particles collapses about N times as fast.</p>
        ${L.slider('logN','Number of bound particles, 10^k',0,25,0.5,0)}
        <dl class="readout" id="grwRead"></dl>
        <p class="small">This is a fully specified version of “actualization from within,” and experiments are testing it; an underground experiment at Gran Sasso (2021) ruled out the simplest gravity-based variant.</p>
      </div>
    </div>
    <div class="case">
      <h3>${L.tag('prop')} Multistate stabilization</h3>
      <p>No slider here: the book gives no rate, threshold or formula, and this course will not invent one. Write the specification you think it needs.</p>
      ${L.note('ladder-spec','Draft a specification for stabilization: the observable that measures “multistate character,” the condition for a stabilization event, and one prediction that would differ from decoherence and GRW.','Hint: Fried says multistate modification can produce “behaviors that are at variance with… conventional quantum theory” (p. 315). Where would you look?')}
    </div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','The measurement problem is real and unsolved; physicists disagree about whether it needs new dynamics (collapse models), new ontology (Bohm, many-worlds) or only interpretation.')}
    ${L.claim('open','<b>Kind of gap: definition.</b> “Multistate character” needs an operational meaning. Is it coherence, entanglement, or something new? Without that, suppression and stabilization cannot be measured.')}
    ${L.claim('open','<b>Kind of gap: premise.</b> Stabilization is offered as the escape from the chaos ceiling. Unit 1 showed that the ceiling itself needs an argument.')}
    ${L.claim('open','<b>Kind of gap: evidence.</b> The natural prediction is that organized living matter keeps more multistate character than inert matter of the same size. Quantum biology has found some real effects (bird navigation is a leading candidate), but quantum coherence in warm, wet cells usually decays very fast.')}
  </div>

  ${L.check('l1','Why does suppression alone leave Fried dissatisfied?',[
    {t:'Because suppression is ruled out by experiment.', ok:false, fb:' Suppression is the part of his story that matches observation best: big inert things are classical.'},
    {t:'Because it produces a classical world, and Fried has already argued that classical mechanism cannot produce organization.', ok:true, fb:' Exactly: “back… where we started” (p. 319). He needs a second process that restores possibility, and that is stabilization.'},
    {t:'Because it makes everything conscious.', ok:false, fb:' The reverse: suppressed systems, like rocks, are where the mental dimension is least expressed.'}
  ],{reason:true})}
  ${L.check('l2','In Fried\'s account, why can a re-emerged multistate resist the resonance that drives classical systems into chaos?',[
    {t:'Because quantum systems have no energy for resonance to act on.', ok:false, fb:' They have energy. Fried\'s argument is about definite properties, not energy.'},
    {t:'Because resonance needs a definite property to “grab hold” of, and a multistate has not yet actualized that property.', ok:true, fb:' This is his argument (pp. 325–326). It is an interesting idea, and it needs a model showing how a driving force acts on a system in a multistate.'},
    {t:'Because living things are too small to resonate.', ok:false, fb:' Size plays no role in the argument; organisms are large compared with atoms.'}
  ])}
  ${L.check('l3','How does Fried\'s ladder differ from the GRW collapse model?',[
    {t:'GRW also has stabilization; Fried simply adds the mental dimension.', ok:false, fb:' GRW has only suppression: collapse gets faster with size and never reverses. Stabilization is Fried\'s own.'},
    {t:'Both make suppression grow with assembly, but Fried adds a reverse process, stabilization, and so far gives no rates.', ok:true, fb:' That is the key difference and the key challenge: GRW names numbers that experiments can test.'},
    {t:'They are the same theory with different names.', ok:false, fb:' Similar goals, very different specification: GRW is a stochastic equation with two parameters; the ladder is a qualitative proposal.'}
  ])}
  `; },
  mount(root){
    const on = {merge:true, auto:true, vary:true, between:true};
    let path = ['A1'], choice = null;
    const byId = id => STAGES.find(s => s.id===id);
    const blocked = s => s.needs.filter(k => !on[k]);
    function next(){ const cur = path[path.length-1];
      const seq = {A1:'B1', B1:'C1', A2:'B2', B2:'A3', A3:'NEXT'}; return seq[cur]; }
    function render(){
      root.querySelector('#ladder').innerHTML = STAGES.map(s => { const inPath = path.includes(s.id), cur = path[path.length-1]===s.id;
        return `<div class="rung ${inPath ? (s.stab ? 'stab' : 'lit') : 'dim'} ${s.end?'end':''}" role="listitem" style="grid-row:${s.row+1};grid-column:${s.col+1}" ${cur?'aria-current="step"':''}><b>${s.name}</b><span>${s.ms}</span></div>`; }).join('');
      const cur = byId(path[path.length-1]), miss = blocked(cur);
      const panel = root.querySelector('#stagePanel');
      panel.innerHTML = `<p><b>${cur.name}.</b> ${cur.what}</p>
        <p style="margin-top:8px"><span class="claim c-prop">Relies on</span> ${cur.needs.length ? cur.needs.map(k => POST.find(p=>p[0]===k)[1]).join(', ') : 'standard quantum mechanics plus Fried\'s interpretation'}</p>
        <p style="margin-top:6px"><span class="claim c-interp">Meant to explain</span> ${cur.explains}</p>
        <p style="margin-top:6px"><span class="claim c-open">Still needs</span> ${cur.spec}</p>
        ${miss.length ? `<p style="margin-top:8px;color:var(--bad)"><b>With ${miss.map(k=>POST.find(p=>p[0]===k)[1]).join(' and ')} switched off, this step cannot happen in Fried's account.</b></p>` : ''}`;
      const ctl = root.querySelector('#ladderCtl'); const c = path[path.length-1];
      let btns = '';
      if (c === 'C1'){ btns = `<button class="btn" type="button" data-go="END">Let suppression continue</button><button class="btn primary" type="button" data-go="A2">Stabilization event</button>`; }
      else if (next()) btns = `<button class="btn primary" type="button" data-go="${next()}">Next level</button>`;
      btns += path.length > 1 ? `<button class="btn" type="button" data-go="back">Back</button><button class="btn" type="button" data-go="reset">Start over</button>` : '';
      ctl.innerHTML = btns;
      ctl.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { const g = b.dataset.go;
        if (g==='back') path.pop();
        else if (g==='reset') path = ['A1'];
        else { const miss = blocked(byId(g));
          if (miss.length){ panel.insertAdjacentHTML('beforeend', `<p style="margin-top:8px;color:var(--bad)"><b>Blocked.</b> ${byId(g).name} needs ${miss.map(k=>POST.find(p=>p[0]===k)[1]).join(' and ')}, which you switched off.</p>`); return; }
          path.push(g); }
        render(); }));
    }
    function renderPost(){
      root.querySelector('#postulates').innerHTML = POST.map(p => `<div class="claim-block k-prop"><div class="row" style="justify-content:space-between"><b>${p[1]}</b><button class="btn" type="button" data-p="${p[0]}" aria-pressed="${on[p[0]]}">${on[p[0]] ? 'On' : 'Off'}</button></div><div class="small">${p[2]}</div>${on[p[0]] ? '' : `<div style="color:var(--bad);font-size:.88rem">${p[3]}</div>`}</div>`).join('');
      root.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => { on[b.dataset.p] = !on[b.dataset.p]; renderPost(); render(); }));
    }
    renderPost(); render();

    let gt = .5;
    const dec = L.canvas(root.querySelector('#decoh'), (ctx,W,H,c) => {
      const a = L.axes(ctx,W,H,c,{x0:0,x1:6,y0:0,y1:1,xt:[0,2,4,6],yt:[0,.5,1],xl:'Γt',yl:'visibility V'});
      ctx.strokeStyle = c.line; ctx.lineWidth = 2; ctx.beginPath(); for (let i=0;i<=120;i++){ const x = 6*i/120; i ? ctx.lineTo(a.X(x),a.Y(Math.exp(-x))) : ctx.moveTo(a.X(x),a.Y(1)); } ctx.stroke();
      ctx.fillStyle = c.c2; ctx.beginPath(); ctx.arc(a.X(gt), a.Y(Math.exp(-gt)), 5, 0, 7); ctx.fill();
      ctx.fillStyle = c.ink; ctx.textAlign = 'left'; ctx.fillText('V = ' + Math.exp(-gt).toFixed(3), Math.min(a.X(gt)+8, W-80), a.Y(Math.exp(-gt)) - 8); });
    L.bindSlider(root,'gt',v=>v.toFixed(2),v=>{ gt = v; dec(); });
    const fmtT = s => s > 3.15e7*1e6 ? (s/3.15e7).toExponential(1) + ' years' : s > 3.15e7 ? (s/3.15e7).toFixed(0) + ' years' : s > 86400 ? (s/86400).toFixed(1) + ' days' : s > 1 ? s.toFixed(1) + ' s' : s > 1e-3 ? (s*1e3).toFixed(1) + ' ms' : s > 1e-6 ? (s*1e6).toFixed(1) + ' µs' : (s*1e9).toFixed(2) + ' ns';
    L.bindSlider(root,'logN',v=>'10^' + v.toFixed(1),v=>{ const N = Math.pow(10,v), rate = 1e-16*N, t = 1/rate;
      const eg = v < 2 ? 'a few particles' : v < 6 ? 'a protein' : v < 9.5 ? 'a virus' : v < 13 ? 'a bacterium' : v < 19 ? 'a grain of dust' : 'a grain of sand or larger';
      root.querySelector('#grwRead').innerHTML = `<dt>About as many as</dt><dd>${eg}</dd><dt>Collapse rate Nλ</dt><dd>${rate.toExponential(1)} per s</dd><dt>Typical time to collapse</dt><dd>${fmtT(t)}</dd>`; });
  }
});
})();
