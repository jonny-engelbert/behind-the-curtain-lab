(function(){
const L = LAB;
function gauss(rand){ let u = 0, v = 0; while (!u) u = rand(); v = rand(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
L.add({
  id:'quantum', num:'5', short:'Possibility and measurement', minutes:'25 minutes', pages:'pp. 199–240, 260–288',
  title:'One photon, two paths',
  card:'Fried\'s “tiny Newton,” then an interferometer: what superposition is, what measurement does, and where Fried\'s reading begins.',
  lede:`In Part IV Fried turns to quantum physics because it offers what mechanism lacks: genuine irreducibility. Measured values are not hidden facts waiting to be read. Before taking his interpretation, you need the physics itself, so this unit builds it from two experiments.`,
  html(){ return `
  <div class="case"><h3>Fried's case</h3>
    ${L.claim('est','Prepare a “tiny Newton” with a very narrow velocity distribution and its measured position scatters, “from the next county” to the Moon; pin down the position and the velocity scatters instead (pp. 207–213). This is the uncertainty principle, and no better instrument removes it.')}
    ${L.quote('Uncertainty, therefore, is woven into the very fabric of reality.', '213')}
    ${L.claim('interp','In the minimal Copenhagen reading Fried prefers, asked how the particle came to be where it was found, physics answers that “there is no cause” (p. 217). Before measurement it lacks even “position-ness” (p. 279). Rival readings, many-worlds and hidden variables, try to restore determinism; Fried reads them as Newton\'s instincts returning (pp. 224–226).')}
    ${L.claim('interp','In Fried\'s notation, an atom prepared as <span class="mono">(0) + (2)</span> evolves by the quantum law Q into <span class="mono">(4) + (6)</span>, keeping both possibilities; measurement M then actualizes one, <span class="mono">[4]</span>, and the other disappears (pp. 266–270).')}
    ${L.claim('interp','In Fried’s simplified account, Q preserves multistate character while M actualizes an outcome. Since measurement is itself a physical process, a theory whose only law of motion is Q cannot describe everything. Hence “quantum theory is wrong” (p. 272), which Fried makes precise as “incomplete” (p. 288). This is the measurement problem, and many physicists accept it is unsolved.')}
  </div>

  <div class="section">
    <div class="kicker">Lab A · Fried's tiny Newton</div>
    <div class="prose"><p>Prepare many identical particles and measure each once. The preparation sets the spread in position, Δx; the uncertainty principle then fixes the smallest possible spread in velocity, Δv. Narrow one and watch the other widen.</p></div>
    <div class="lab">
      <div class="viz"><canvas class="plot" id="hux" aria-label="Measured positions"></canvas><canvas class="plot" id="huv" aria-label="Measured velocities"></canvas></div>
      <div class="controls">
        ${L.slider('dx','Position spread Δx (arbitrary units)',0.1,3,0.01,1)}
        <div class="row"><button class="btn primary" type="button" id="measure">Measure 400 particles</button></div>
        <dl class="readout" id="huRead"></dl>
      </div>
      <div class="model-note">Units chosen so that the minimum product is Δx·Δv = 1. Each measurement is drawn from a Gaussian with the stated spread. Scheme A in the book is the far right of the slider (sharp velocity, wild position); Scheme B is the far left.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · A Mach–Zehnder interferometer</div>
    <div class="prose"><p>A single photon meets a 50:50 beam splitter, travels two paths, and recombines at a second splitter before detectors D₀ and D₁. The phase φ shifts one path. A <b>path marker</b> can record which way the photon went; its distinguishability D runs from 0 (no record) to 1 (a perfect record).</p></div>
    <div class="lab">
      <div class="viz">
        <svg class="fig" id="mz" viewBox="0 0 520 240" role="img" aria-label="Mach–Zehnder interferometer"></svg>
        <canvas class="plot" id="mzPlot" aria-label="Detection probability against phase"></canvas>
      </div>
      <div class="controls">
        ${L.slider('phi','Phase φ (degrees)',0,360,1,0)}
        ${L.slider('D','Path distinguishability D',0,1,0.01,0)}
        <dl class="readout" id="mzRead"></dl>
        <div class="row"><button class="btn primary" type="button" id="send">Send 200 photons</button><button class="btn" type="button" id="clearMz">Clear counts</button></div>
        <div id="mzCounts" class="small" aria-live="polite">No photons sent yet at these settings.</div>
      </div>
      <div class="model-note">Ideal, lossless splitters and detectors, one photon at a time. P(D₀) = ½(1 + V cos φ), with fringe visibility V = √(1 − D²) for a pure marker state. Sampled counts are simulated. A perfectly path-marked photon (D = 1) gives 50:50 output probabilities whatever the phase. Partial marking reduces visibility gradually.</div>
    </div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','With D = 0 and φ = 0, every photon reaches D₀: the two paths interfere. A mixture of photons that each took one definite path would give 50:50. This rules out a simple one-path mixture in this apparatus. It does not rule out every theory with definite trajectories: Bohmian mechanics also includes a guiding wave.')}
    ${L.claim('est','Interference fades as soon as the marker records the path, whether or not anyone reads the record. No conscious observer is needed.')}
    ${L.claim('prop','In quantum linguistics, the photon or electron becomes “aware” of its measurement context and “chooses” its value, as Rachel chooses an orientation for the cube (pp. 237–238, 305–308). The randomness we see is the outward trace of that choice.')}
    ${L.claim('open','<b>Kind of gap: interpretation.</b> Copenhagen, many-worlds, and Bohmian mechanics agree on these ideal standard predictions. Collapse models modify dynamics and can predict deviations; Fried\'s reading also needs to specify whether and when its predictions depart from the standard model. What would distinguish Fried\'s reading? Unit 7 asks.')}
  </div>

  ${L.check('q1','Set D = 0 and φ = 0. Every photon arrives at D₀. What does that rule out?',[
    {t:'A simple incoherent 50:50 mixture of paths, with no guiding interference contribution.', ok:true, fb:' A one-path photon meets the second splitter alone and goes either way with probability ½. The coherent state includes interference between path contributions. This does not by itself exclude hidden-trajectory interpretations with a guiding wave.'},
    {t:'That photons are particles at all.', ok:false, fb:' Each photon still arrives whole, at one detector. The pattern is in the statistics, not in split photons.'},
    {t:'Nothing; detectors simply prefer D₀.', ok:false, fb:' Change φ to 180° and every photon goes to D₁. The preference follows the phase, which only matters if both paths contribute.'}
  ],{reason:true})}
  ${L.check('q2','With D = 1, does the interference come back if nobody ever looks at the marker?',[
    {t:'Yes, observation is what destroys it.', ok:false, fb:' The record\'s existence is enough. Unread, the marker still makes the paths distinguishable, and the visibility stays zero.'},
    {t:'No. A physical record of the path is enough; no reader is required.', ok:true, fb:' This matters for Fried\'s argument: measurement in the physics sense is about records and correlations. His “mental dimension” is an additional proposal, not something interference demands.'},
    {t:'It depends on the phase.', ok:false, fb:' At D = 1 the outputs are 50:50 at every phase.'}
  ])}
  ${L.note('q-1','Fried says the measured property is created, not revealed. Which result in this unit gives that claim the most support, and which interpretations would read the same result differently?')}
  `; },
  mount(root){
    let dx = 1, xs = [], vs = [];
    const rand = L.rng(Date.now() % 100000 + 11);
    const hist = (arr, lo, hi, n) => { const h = new Array(n).fill(0); arr.forEach(v => { const i = Math.floor((v-lo)/(hi-lo)*n); if (i>=0 && i<n) h[i]++; }); return h; };
    const drawH = (el, arr, spreadFn, label) => L.canvas(el, (ctx,W,H,c) => {
      const spread = spreadFn();
      const lo = -10, hi = 10, n = 60, h = hist(arr, lo, hi, n), mx = Math.max(10, ...h)*1.1;
      const a = L.axes(ctx,W,H,c,{x0:lo,x1:hi,y0:0,y1:mx,xt:[-10,-5,0,5,10],yt:[],xl:label,yl:'count'});
      const bw = (a.X(hi)-a.X(lo))/n;
      ctx.fillStyle = c.line; h.forEach((v,i) => { if (v) ctx.fillRect(a.X(lo)+i*bw+.5, a.Y(v), bw-1, a.Y(0)-a.Y(v)); });
      if (!arr.length){ ctx.fillStyle = c.muted; ctx.textAlign = 'center'; ctx.font = `12px ${c.font}`; ctx.fillText('Press “Measure” to record results', W/2, H/2); return; }
      ctx.strokeStyle = c.c2; ctx.lineWidth = 1.5; ctx.beginPath(); for (let i=0;i<=200;i++){ const x = lo + (hi-lo)*i/200; const g = Math.exp(-x*x/(2*spread*spread))/(spread*Math.sqrt(2*Math.PI))*arr.length*(hi-lo)/n; i ? ctx.lineTo(a.X(x),a.Y(Math.min(mx,g))) : ctx.moveTo(a.X(x),a.Y(Math.min(mx,g))); } ctx.stroke(); });
    const rx = drawH(root.querySelector('#hux'), xs, () => dx, 'measured position');
    const rv = drawH(root.querySelector('#huv'), vs, () => 1/dx, 'measured velocity');
    function redrawHU(){ rx(); rv(); const dv = 1/dx;
      root.querySelector('#huRead').innerHTML = `<dt>Δx</dt><dd>${dx.toFixed(2)}</dd><dt>Smallest possible Δv</dt><dd>${dv.toFixed(2)}</dd><dt>Product Δx·Δv</dt><dd>1.00</dd><dt>Points off the chart</dt><dd>${xs.filter(v=>Math.abs(v)>10).length + vs.filter(v=>Math.abs(v)>10).length}</dd>`; }
    L.bindSlider(root,'dx',v=>v.toFixed(2),v=>{ dx = v; xs.length = 0; vs.length = 0; redrawHU(); });
    root.querySelector('#measure').addEventListener('click', () => { xs.length = 0; vs.length = 0;
      for (let i=0;i<400;i++){ xs.push(gauss(rand)*dx); vs.push(gauss(rand)/dx); } redrawHU(); });

    // Mach–Zehnder
    let phi = 0, D = 0, counts = null;
    const P0 = () => .5*(1 + Math.sqrt(1-D*D)*Math.cos(phi*Math.PI/180));
    const svg = root.querySelector('#mz');
    function drawMZ(){ const p = P0();
      svg.innerHTML = `
      <g stroke="var(--plot-line)" stroke-width="2.5" fill="none" opacity=".85">
        <path d="M20 180 H100"/><path d="M100 180 H400"/><path d="M100 180 V50 H400 V180"/><path d="M400 180 H470"/><path d="M400 180 V225"/>
      </g>
      <rect x="88" y="168" width="24" height="24" transform="rotate(45 100 180)" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5"/>
      <rect x="388" y="168" width="24" height="24" transform="rotate(45 400 180)" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5"/>
      <line x1="88" y1="38" x2="112" y2="62" stroke="var(--ink)" stroke-width="4"/><line x1="388" y1="38" x2="412" y2="62" stroke="var(--ink)" stroke-width="4"/>
      <rect x="225" y="38" width="44" height="24" rx="4" fill="var(--prop-bg)" stroke="var(--prop)"/><text x="247" y="54" text-anchor="middle" font-size="12" fill="currentColor">φ</text>
      <circle cx="250" cy="180" r="${6 + 10*D}" fill="var(--interp-bg)" stroke="var(--interp)" stroke-width="1.5"/><text x="250" y="212" text-anchor="middle" font-size="12" fill="var(--muted)">path marker</text>
      <circle cx="482" cy="180" r="12" fill="var(--plot-line)" fill-opacity="${.15+.85*p}" stroke="var(--ink)"/><text x="482" y="160" text-anchor="middle" font-size="12" fill="currentColor">D₀ ${(100*p).toFixed(0)}%</text>
      <circle cx="400" cy="226" r="12" fill="var(--plot-line)" fill-opacity="${.15+.85*(1-p)}" stroke="var(--ink)"/><text x="436" y="231" text-anchor="start" font-size="12" fill="currentColor">D₁ ${(100*(1-p)).toFixed(0)}%</text>
      <text x="20" y="170" font-size="12" fill="var(--muted)">photon in</text><text x="100" y="210" text-anchor="middle" font-size="11" fill="var(--muted)">splitter</text><text x="400" y="30" text-anchor="middle" font-size="11" fill="var(--muted)">mirror</text>`; }
    const plot = L.canvas(root.querySelector('#mzPlot'), (ctx,W,H,c) => {
      const a = L.axes(ctx,W,H,c,{x0:0,x1:360,y0:0,y1:1,xt:[0,90,180,270,360],xf:v=>v+'°',yt:[0,.25,.5,.75,1],xl:'phase φ',yl:'P(D₀)'});
      const V = Math.sqrt(1-D*D);
      ctx.strokeStyle = c.muted; ctx.setLineDash([4,4]); ctx.beginPath(); for (let d=0; d<=360; d+=2){ const y = .5*(1+Math.cos(d*Math.PI/180)); d ? ctx.lineTo(a.X(d),a.Y(y)) : ctx.moveTo(a.X(d),a.Y(y)); } ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = c.line; ctx.lineWidth = 2; ctx.beginPath(); for (let d=0; d<=360; d+=2){ const y = .5*(1+V*Math.cos(d*Math.PI/180)); d ? ctx.lineTo(a.X(d),a.Y(y)) : ctx.moveTo(a.X(d),a.Y(y)); } ctx.stroke();
      ctx.fillStyle = c.c2; ctx.beginPath(); ctx.arc(a.X(phi), a.Y(P0()), 5, 0, 7); ctx.fill();
      if (counts){ const f = counts[0]/(counts[0]+counts[1]); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(a.X(phi), a.Y(f), 7, 0, 7); ctx.stroke(); } });
    function readMZ(){ const p = P0(), V = Math.sqrt(1-D*D);
      root.querySelector('#mzRead').innerHTML = `<dt>Visibility V</dt><dd>${V.toFixed(3)}</dd><dt>P(D₀) predicted</dt><dd>${(100*p).toFixed(1)}%</dd><dt>P(D₁) predicted</dt><dd>${(100*(1-p)).toFixed(1)}%</dd>`; }
    const upd = () => { counts = null; root.querySelector('#mzCounts').textContent = 'No photons sent yet at these settings.'; drawMZ(); plot(); readMZ(); };
    L.bindSlider(root,'phi',v=>v.toFixed(0)+'°',v=>{ phi = v; upd(); });
    L.bindSlider(root,'D',v=>v.toFixed(2),v=>{ D = v; upd(); });
    root.querySelector('#send').addEventListener('click', () => { if (!counts) counts = [0,0]; const p = P0(); for (let i=0;i<200;i++) counts[rand() < p ? 0 : 1]++;
      const n = counts[0]+counts[1]; root.querySelector('#mzCounts').innerHTML = `${n} photons: D₀ ${counts[0]} (${(100*counts[0]/n).toFixed(1)}%), D₁ ${counts[1]}. The open circle on the plot marks the observed fraction.`; plot(); });
    root.querySelector('#clearMz').addEventListener('click', upd);
  }
});
})();
