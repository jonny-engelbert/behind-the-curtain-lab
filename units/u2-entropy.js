(function(){
const L = LAB;
function lnC(n,k){ let s = 0; for (let i=1;i<=k;i++) s += Math.log(n-k+i) - Math.log(i); return s; }
L.add({
  id:'entropy', num:'2', short:'Entropy and open systems', minutes:'20 minutes', pages:'pp. 95–114',
  title:'How order can grow without breaking the second law',
  card:'Count microstates, then balance an entropy budget: Prigogine\'s route to local order, which Fried builds on.',
  lede:`If everything slides toward equilibrium, why is the universe not a uniform “pea soup” (p. 104)? Fried's answer, taken from Prigogine, is that an open system sitting between a hot and a cold region can lower its own entropy as long as the total still rises. This unit builds that bookkeeping from the ground up.`,
  html(){ return `
  <div class="case"><h3>Fried's case</h3>
    ${L.claim('est','Entropy counts the microscopic arrangements compatible with what we see: few for a solid, more for a liquid, most for a gas. Heat Q leaving a body at temperature T changes its entropy by Q/T, and for any isolated process the total entropy never falls: ΔS<sub>total</sub> ≥ 0.')}
    ${L.claim('interp','The second law seems to forbid stars, planets, life and society, which all grow more ordered. Prigogine resolved this by shifting attention from the gradient to the system sitting inside it.')}
    ${L.quote('So, YES, it is possible for the system to exhibit a decrease in entropy!', '114')}
    ${L.claim('interp','Fried counts this as one of mechanism\'s great successes, and it is what drives the cascade of patterns in Unit 1. In Part VI he borrows the same bookkeeping for meaning: a “symbolic entropy” and a “symbolic second law” (pp. 377–378, Unit 8).')}
  </div>

  <div class="section">
    <div class="kicker">Lab A · Counting arrangements</div>
    <div class="prose"><p>Put N labelled particles in a box with two halves. A macrostate says only how many are on the left; the number of microstates W that produce it is the binomial coefficient C(N, n). Entropy is S = k ln W.</p></div>
    <div class="lab">
      <div class="viz"><canvas class="plot" id="micro" aria-label="ln W against the number on the left"></canvas></div>
      <div class="controls">
        ${L.slider('nN','Number of particles N',2,200,1,20)}
        ${L.slider('nL','Number on the left n',0,20,1,10)}
        <dl class="readout" id="microRead"></dl>
      </div>
      <div class="model-note">Ideal model: particles do not interact and every microstate is equally likely. The point is the counting, not the gas.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · An entropy budget for an open system</div>
    <div class="prose"><p>Heat Q flows each second from a hot region at T<sub>hot</sub> (Earth's core in Fried's mantle example) through a system to a cold region at T<sub>cold</sub> (the crust). The surroundings gain ΔS<sub>env</sub> = −Q/T<sub>hot</sub> + Q/T<sub>cold</sub>. Now choose how much the system's own entropy changes. Is the result allowed?</p></div>
    <div class="lab">
      <div class="viz"><canvas class="plot" id="budget" aria-label="Entropy budget bars"></canvas><div id="verdict" class="callout" aria-live="polite"></div></div>
      <div class="controls">
        ${L.slider('Q','Heat flow Q (J per second)',0,2000,10,1000)}
        ${L.slider('Th','T hot (K)',300,1000,5,400)}
        ${L.slider('Tc','T cold (K)',100,600,5,300)}
        ${L.slider('dS','System entropy change ΔS_sys (J/K per second)',-3,3,0.01,-0.5)}
        <button class="btn" type="button" id="frExample">Load Fried's numbers (p. 113)</button>
      </div>
      <div class="model-note">Steady flow, reservoirs large enough that their temperatures stay fixed. Allowed means ΔS<sub>total</sub> = ΔS<sub>env</sub> + ΔS<sub>sys</sub> ≥ 0. Fried's worked example uses round numbers: the surroundings gain +5, so a system change of −3 leaves +2 (pp. 110–113).</div>
    </div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','Local decreases in entropy are routine whenever energy flows through: refrigerators, growing crystals, convection rolls, living cells. None violates the second law.')}
    ${L.claim('open','<b>Kind of gap: explanation.</b> The budget says local order is <i>permitted</i>. It does not say <i>which</i> ordered pattern appears, or why parts of an organism take on distinct functions. That narrower question is the one Fried presses in Unit 3.')}
  </div>

  ${L.check('e1','With N = 100 particles, how likely is it that you will find all of them in the left half at a given moment?',[
    {t:'About one in a hundred.', ok:false, fb:' Each particle is on the left with probability ½, independently, so all 100 together is (½)¹⁰⁰ ≈ 8 × 10⁻³¹.'},
    {t:'About 8 × 10⁻³¹: possible in principle, never seen in practice.', ok:true, fb:' One microstate out of 2¹⁰⁰. That is why equilibrium looks like a law even though nothing forbids the ordered state.'},
    {t:'Exactly zero, because the second law forbids it.', ok:false, fb:' Statistical mechanics makes the second law a matter of overwhelming probability, not strict impossibility.'}
  ])}
  ${L.check('e2','A cell builds ordered proteins from disordered amino acids. Which statement fits the second law?',[
    {t:'It violates the second law locally, which is why life needs special explanation.', ok:false, fb:' There is no violation. The cell exports more entropy, as heat and waste, than it removes by building order.'},
    {t:'It is allowed because the cell is open: the entropy it sheds to its surroundings exceeds the order it builds.', ok:true, fb:' This is Prigogine\'s point, and Fried accepts it. His challenge is elsewhere: what organizes the parts into functions.'},
    {t:'It is allowed only because cells are too small for thermodynamics to apply.', ok:false, fb:' Thermodynamics applies to cells; the budget is measurable, for example in heat output.'}
  ])}
  ${L.note('ent-1','Fried later defines a “symbolic entropy” by analogy. Before you reach Unit 8, what would a count of “arrangements” of meaning have to count?')}
  `; },
  mount(root){
    let N = 20, n = 10;
    const nL = root.querySelector('#nL');
    const micro = L.canvas(root.querySelector('#micro'), (ctx,W,H,c) => {
      const ymax = Math.max(1, lnC(N, Math.floor(N/2))) * 1.08;
      const step = ymax > 80 ? 20 : ymax > 40 ? 10 : ymax > 15 ? 5 : ymax > 6 ? 2 : 1; const yt = []; for (let y=0;y<=ymax;y+=step) yt.push(y);
      const xs = N <= 20 ? 5 : N <= 60 ? 10 : 50; const xt = []; for (let x=0;x<=N;x+=xs) xt.push(x);
      const a = L.axes(ctx,W,H,c,{x0:-0.5,x1:N+0.5,y0:0,y1:ymax,xt,yt,xl:'particles on the left, n',yl:'S/k = ln W'});
      const bw = Math.max(1, (a.X(1)-a.X(0))*0.8);
      for (let k=0;k<=N;k++){ ctx.fillStyle = k===n ? c.c2 : c.line; ctx.globalAlpha = k===n ? 1 : .55; const y = lnC(N,k); ctx.fillRect(a.X(k)-bw/2, a.Y(y), bw, a.Y(0)-a.Y(y)); }
      ctx.globalAlpha = 1; });
    function readMicro(){ const lw = lnC(N,n); const W = Math.exp(lw); const pAll = Math.pow(.5, N);
      root.querySelector('#microRead').innerHTML = `<dt>Microstates W</dt><dd>${W < 1e6 ? Math.round(W).toLocaleString() : W.toExponential(2)}</dd><dt>Entropy S/k = ln W</dt><dd>${lw.toFixed(2)}</dd><dt>P(this n)</dt><dd>${Math.exp(lw - N*Math.log(2)).toExponential(2)}</dd><dt>P(all on the left)</dt><dd>${pAll.toExponential(2)}</dd>`; }
    L.bindSlider(root,'nN',v=>v.toFixed(0),v=>{ N = v; nL.max = N; if (n > N){ n = N; nL.value = N; } root.querySelector('#nL-out').textContent = n; micro(); readMicro(); });
    L.bindSlider(root,'nL',v=>v.toFixed(0),v=>{ n = v; micro(); readMicro(); });

    let Q = 1000, Th = 400, Tc = 300, dS = -.5, override = null;
    const budget = L.canvas(root.querySelector('#budget'), (ctx,W,H,c) => {
      const env = override ? override.env : (-Q/Th + Q/Tc), sys = override ? override.sys : dS, tot = env + sys;
      const vals = [['Surroundings', env], ['System', sys], ['Total', tot]];
      const mx = Math.max(1, ...vals.map(v => Math.abs(v[1]))) * 1.2;
      const a = L.axes(ctx,W,H,c,{x0:0,x1:3,y0:-mx,y1:mx,yt:[-mx,-mx/2,0,mx/2,mx].map(v=>+v.toFixed(2)),yf:v=>v.toFixed(1),yl:'ΔS (J/K per second)',m:{l:52}});
      vals.forEach((v,i) => { const x0 = a.X(i+.2), x1 = a.X(i+.8); ctx.fillStyle = i===2 ? (tot >= 0 ? c.good : c.bad) : (i===0 ? c.line : c.c2);
        const y0 = a.Y(0), y1 = a.Y(v[1]); ctx.fillRect(x0, Math.min(y0,y1), x1-x0, Math.abs(y1-y0));
        ctx.fillStyle = c.ink; ctx.textAlign = 'center'; ctx.font = `12px ${c.font}`; ctx.fillText(v[0], (x0+x1)/2, H - 12); ctx.fillText((v[1]>=0?'+':'') + v[1].toFixed(2), (x0+x1)/2, v[1] >= 0 ? y1 - 6 : y1 + 14); });
      ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(a.m.l, a.Y(0)); ctx.lineTo(W - a.m.r, a.Y(0)); ctx.stroke();
      const v = root.querySelector('#verdict');
      if (!override && Tc >= Th){ v.innerHTML = '<b>Check the temperatures.</b> Heat flows on its own only from hot to cold, so keep T hot above T cold. With these settings the surroundings would lose entropy, which the second law forbids.'; return; }
      v.innerHTML = tot >= 0 ? `<b>Allowed.</b> The system's entropy ${sys < 0 ? 'falls by ' + Math.abs(sys).toFixed(2) + ', but the surroundings gain more' : 'rises too'}. Total change: +${tot.toFixed(2)} J/K per second.${sys < 0 ? ' This is local order paid for by the flow.' : ''}`
        : `<b>Forbidden.</b> The system would lose more entropy than the flow supplies to the surroundings (ΔS<sub>total</sub> = ${tot.toFixed(2)}). The largest allowed decrease is ${env.toFixed(2)} J/K per second.`;
    });
    const upd = () => { override = null; budget(); };
    L.bindSlider(root,'Q',v=>v.toFixed(0)+' J',v=>{Q=v; upd();});
    L.bindSlider(root,'Th',v=>v.toFixed(0)+' K',v=>{Th=v; upd();});
    L.bindSlider(root,'Tc',v=>v.toFixed(0)+' K',v=>{Tc=v; upd();});
    L.bindSlider(root,'dS',v=>v.toFixed(2),v=>{dS=v; upd();});
    root.querySelector('#frExample').addEventListener('click', () => { override = {env:5, sys:-3}; budget(); });
  }
});
})();
