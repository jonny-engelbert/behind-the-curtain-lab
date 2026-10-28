(function(){
const L = LAB;
const RULES = [['0','Always answer 0', x=>0], ['1','Always answer 1', x=>1], ['c','Answer your bit', x=>x], ['f','Answer the opposite bit', x=>1-x]];
const rule = k => RULES.find(r => r[0]===k)[2];
const win = (x,y,a,b) => ((a ^ b) === (x & y));
L.add({
  id:'wholes', num:'6', short:'Wholes and parts', minutes:'25 minutes', pages:'pp. 240–255, 260–261, 281–296',
  title:'The CHSH game: when two parts act as one',
  card:'Play a two-player game classical teams can win at most 75% of the time, then beat it with entangled pairs.',
  lede:`Fried's case against reductionism reaches the atoms themselves. Two particles from one decay stay linked so that neither has its own state; measuring one constrains the other instantly. He calls separability the hidden premise of mechanism, and argues it fails already at N = 2. This game turns that failure into a number.`,
  html(){ return `
  <div class="case"><h3>Fried's case</h3>
    ${L.claim('est','In the EPR decay, two particles fly apart, yet a measurement on one fixes the statistics of the other. Einstein, Podolsky and Rosen hoped hidden properties explained this; work by Bohm and Bell, and experiments by Aspect, showed that no such local explanation fits the data (pp. 241–252).')}
    ${L.claim('interp','The pair is better described as “one entangled, non-separable object” than as two things (p. 254). Mechanism assumes parts keep their own identities inside the whole; quantum physics shows they need not.')}
    ${L.claim('prop','<b>Generalized non-separability:</b> assembled objects merge and lose their individual identities, so the number of atoms N stops being a property of the system at all (pp. 293–295). This is the first postulate of quantum linguistics, and the root of Fried\'s answer to how many parts become one whole.')}
  </div>

  <div class="section">
    <div class="kicker">How the game works</div>
    <div class="prose"><p>Alice and Bob are separated and cannot communicate. Each round, a referee hands Alice a random bit x and Bob a random bit y. Each answers with a bit, a and b. They <b>win</b> if a ⊕ b = x · y: their answers must <i>differ</i> when both receive 1, and <i>match</i> otherwise.</p></div>
  </div>

  <div class="section">
    <div class="kicker">Lab A · Play it classically</div>
    <div class="lab">
      <div class="viz">
        <div class="two">
          <div><b>Alice's rule</b><div class="seg" role="group" aria-label="Alice's rule" style="margin-top:6px">${RULES.map(r=>`<button class="btn" type="button" data-a="${r[0]}" aria-pressed="${r[0]==='0'}">${r[1]}</button>`).join('')}</div></div>
          <div><b>Bob's rule</b><div class="seg" role="group" aria-label="Bob's rule" style="margin-top:6px">${RULES.map(r=>`<button class="btn" type="button" data-b="${r[0]}" aria-pressed="${r[0]==='0'}">${r[1]}</button>`).join('')}</div></div>
        </div>
        <div class="tbl"><table style="min-width:0" id="clsTable"></table></div>
      </div>
      <div class="controls">
        <div class="stat"><small>Win rate for this strategy</small><span class="big" id="clsRate">75%</span></div>
        <button class="btn primary" type="button" id="clsPlay">Play 1,000 rounds</button>
        <div class="small" id="clsSim" aria-live="polite"></div>
        <div class="callout small">Try all 16 combinations. Shared coin flips do not help: a random mix of strategies averages their win rates, so it can never beat the best one.</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · Play it with entangled photons</div>
    <div class="prose"><p>Now give Alice and Bob each one photon from an entangled pair. Each chooses a polarizer angle depending on the bit received, and answers 0 or 1 by whether the photon passes. For this pair, their answers match with probability cos²(α − β), where α and β are their angles.</p></div>
    <div class="lab">
      <div class="viz"><canvas class="plot" id="qPlot" aria-label="Win probability per input pair"></canvas>
        <dl class="readout" id="qRead"></dl></div>
      <div class="controls">
        ${L.slider('a0','Alice\'s angle when x = 0',0,180,0.5,0)}
        ${L.slider('a1','Alice\'s angle when x = 1',0,180,0.5,30)}
        ${L.slider('b0','Bob\'s angle when y = 0',0,180,0.5,15)}
        ${L.slider('b1','Bob\'s angle when y = 1',0,180,0.5,60)}
        <div class="row"><button class="btn" type="button" id="optimal">Use the best-known angles</button><button class="btn primary" type="button" id="qPlay">Play 1,000 rounds</button></div>
        <div class="small" id="qSim" aria-live="polite"></div>
      </div>
      <div class="model-note">Ideal polarization-entangled pair, perfect detectors. The win probability is the average over the four input pairs; the CHSH number is S = 8p − 4, with a classical limit of 2 and a quantum maximum of 2√2 ≈ 2.83. Honesty note: this page computes the quantum statistics in one place, so it is a calculation, not a Bell test. Real tests (Aspect 1982; loophole-free tests from 2015) separate the players so no signal could pass between them.</div>
    </div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','No local strategy, however clever, wins more than 75% of the time; entangled pairs reach about 85.4%. Experiments confirm the quantum value. Yet Alice\'s answers alone are always 50:50 whatever Bob does, so entanglement cannot be used to send a message.')}
    ${L.claim('interp','What the violation means is disputed. Fried reads it as one object rather than two. Others read it as nonlocal correlation between two objects (Bohmian mechanics), or as branching without any instantaneous influence (many-worlds).')}
    ${L.claim('open','<b>Kind of gap: definition.</b> Entanglement is measured here, by S. Fried\'s stronger claim, that merged parts lose their identities and N stops counting, has no matching measure yet. What quantity would show that a system has “merged” in his sense rather than merely being entangled?')}
  </div>

  ${L.check('w1','Why can no classical team beat 75%?',[
    {t:'Because the referee\'s bits are random.', ok:false, fb:' Randomness alone is not the limit; the quantum team faces the same random bits and wins about 85% of the time.'},
    {t:'Because each player\'s answer can depend only on their own bit, and no assignment satisfies all four winning conditions at once.', ok:true, fb:' Write out the four conditions and add them up: they cannot all hold. At best three of four do, which gives 75%.'},
    {t:'Because they are not allowed to agree on a plan beforehand.', ok:false, fb:' They can agree on any plan in advance. Even with full planning, local rules cap the win rate at 75%.'}
  ],{reason:true})}
  ${L.check('w2','The quantum team wins about 85% of the time. Can Alice use this to send Bob a message?',[
    {t:'Yes: by choosing her angle she changes Bob\'s results instantly.', ok:false, fb:' Bob\'s own results are 50:50 for every choice Alice makes. The pattern only appears when the two records are compared.'},
    {t:'No: the correlation shows up only when the two records are brought together.', ok:true, fb:' Entanglement is non-separable but not a signaling channel. Fried accepts this; he notes the link is not causal and appears only statistically (Part IV).'}
  ])}
  ${L.note('w-1','Fried says the two particles are “one” object. Write the strongest argument for that reading, then the strongest argument for calling them two correlated objects.')}
  `; },
  mount(root){
    let A = '0', B = '0';
    function renderCls(){ const fa = rule(A), fb = rule(B); let w = 0;
      const rows = [[0,0],[0,1],[1,0],[1,1]].map(([x,y]) => { const a = fa(x), b = fb(y), ok = win(x,y,a,b); if (ok) w++;
        return `<tr><td class="mono">x=${x}, y=${y}</td><td class="mono">a=${a}, b=${b}</td><td>${x&y ? 'must differ' : 'must match'}</td><td style="color:var(--${ok?'good':'bad'})">${ok?'win':'lose'}</td></tr>`; }).join('');
      root.querySelector('#clsTable').innerHTML = `<thead><tr><th>Inputs</th><th>Answers</th><th>Rule</th><th>Result</th></tr></thead><tbody>${rows}</tbody>`;
      root.querySelector('#clsRate').textContent = (w*25) + '%'; root.querySelector('#clsSim').textContent = ''; }
    root.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', () => { A = b.dataset.a; root.querySelectorAll('[data-a]').forEach(x => x.setAttribute('aria-pressed', x===b)); renderCls(); }));
    root.querySelectorAll('[data-b]').forEach(b => b.addEventListener('click', () => { B = b.dataset.b; root.querySelectorAll('[data-b]').forEach(x => x.setAttribute('aria-pressed', x===b)); renderCls(); }));
    const rand = L.rng(Date.now() % 99991 + 3);
    root.querySelector('#clsPlay').addEventListener('click', () => { const fa = rule(A), fb = rule(B); let w = 0;
      for (let i=0;i<1000;i++){ const x = rand()<.5?1:0, y = rand()<.5?1:0; if (win(x,y,fa(x),fb(y))) w++; }
      root.querySelector('#clsSim').textContent = `Won ${w} of 1,000 rounds (${(w/10).toFixed(1)}%).`; });
    renderCls();

    const ang = {a0:0, a1:30, b0:15, b1:60};
    const ps = (al, be) => Math.cos((al-be)*Math.PI/180)**2; // probability answers match
    const pw = (x,y) => { const s = ps(x?ang.a1:ang.a0, y?ang.b1:ang.b0); return (x&y) ? 1-s : s; };
    const pTot = () => (pw(0,0)+pw(0,1)+pw(1,0)+pw(1,1))/4;
    const plot = L.canvas(root.querySelector('#qPlot'), (ctx,W,H,c) => {
      const a = L.axes(ctx,W,H,c,{x0:0,x1:5,y0:0,y1:1,xt:[],yt:[0,.25,.5,.75,1],yl:'win probability',m:{b:40}});
      const labels = ['x=0,y=0','x=0,y=1','x=1,y=0','x=1,y=1','average'];
      const vals = [pw(0,0),pw(0,1),pw(1,0),pw(1,1),pTot()];
      vals.forEach((v,i) => { const x0 = a.X(i+.18), x1 = a.X(i+.82); ctx.fillStyle = i===4 ? c.c2 : c.line; ctx.fillRect(x0, a.Y(v), x1-x0, a.Y(0)-a.Y(v));
        ctx.fillStyle = c.ink; ctx.textAlign = 'center'; ctx.font = `11px ${c.font}`; ctx.fillText(labels[i], (x0+x1)/2, H - 22); ctx.fillText((100*v).toFixed(1)+'%', (x0+x1)/2, a.Y(v) - 5); });
      ctx.setLineDash([5,4]); ctx.strokeStyle = c.bad; ctx.beginPath(); ctx.moveTo(a.m.l, a.Y(.75)); ctx.lineTo(W-a.m.r, a.Y(.75)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = c.bad; ctx.textAlign = 'left'; ctx.fillText('classical limit 75%', a.m.l + 4, a.Y(.75) - 5); });
    function readQ(){ const p = pTot(), S = 8*p - 4;
      root.querySelector('#qRead').innerHTML = `<dt>Win probability</dt><dd>${(100*p).toFixed(1)}%</dd><dt>CHSH value S</dt><dd>${S.toFixed(3)}</dd><dt>Beats the classical limit?</dt><dd>${S > 2.0001 ? 'yes' : 'no'}</dd><dt>Alice's 0s, on her own</dt><dd>50% for any angles</dd>`; }
    ['a0','a1','b0','b1'].forEach(k => L.bindSlider(root,k,v=>v.toFixed(1)+'°',v=>{ ang[k] = v; plot(); readQ(); root.querySelector('#qSim').textContent=''; }));
    root.querySelector('#optimal').addEventListener('click', () => { const best = {a0:0, a1:45, b0:22.5, b1:157.5};
      Object.entries(best).forEach(([k,v]) => { const s = root.querySelector('#'+k); s.value = v; s.dispatchEvent(new Event('input')); }); });
    root.querySelector('#qPlay').addEventListener('click', () => { let w = 0;
      for (let i=0;i<1000;i++){ const x = rand()<.5?1:0, y = rand()<.5?1:0; if (rand() < pw(x,y)) w++; }
      root.querySelector('#qSim').textContent = `Won ${w} of 1,000 rounds (${(w/10).toFixed(1)}%).`; });
  }
});
})();
