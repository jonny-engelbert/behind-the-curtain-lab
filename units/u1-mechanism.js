(function(){
const L = LAB;
L.add({
  id:'mechanism', num:'1', short:'What mechanism achieves', minutes:'25–30 minutes', pages:'pp. 74–140, 320–325',
  title:'Resonance, instability and the road to chaos',
  card:'A driven oscillator and the logistic map: how simple laws build patterns, and whether chaos is a ceiling.',
  lede:`Fried gives mechanism its full due before he challenges it. Part II shows how atoms and laws produce phases, flows and cascades of pattern. Part V then argues that classical pattern-forming systems hit a ceiling at chaos, which living systems somehow escape. This unit lets you test both halves.`,
  html(){ return `
  <div class="case">
    <h3>Fried's case</h3>
    ${L.claim('est','Mechanism explains a great deal: free fall and orbits, phases of matter from F = E − TS, and self-organizing flows such as mantle convection.')}
    ${L.quote('Mechanism is the way of science. Scientists are mechanistic thinkers', '140')}
    ${L.claim('interp','Driven systems follow “the fundamental paradigm” of non-equilibrium physics: stability, then a threshold, then instability, then a new stable pattern. The mantle goes from stillness to circular flow to puffs to chaos as the temperature difference grows (pp. 115–127).')}
    ${L.claim('prop','Positive feedback and <b>resonance</b> push classical patterns past a critical threshold into chaos, beyond which “no further elaboration of patterned behavior is possible” (p. 323). Living systems show no such ceiling, so something else must be at work (pp. 323–325).')}
  </div>

  <div class="section">
    <div class="kicker">Lab A · The swing (resonance)</div>
    <div class="prose"><p>Fried's image for resonance is a playground swing pushed at just the right moment (p. 323). Here the swing is a damped oscillator driven by a periodic force, starting from rest. Its equation, in units where the natural frequency is 1, is <span class="mono">x″ + 2ζx′ + x = cos(Ωt)</span>.</p></div>
    <div class="lab">
      <div class="viz">
        <canvas class="plot" id="oscTime" aria-label="Displacement against time"></canvas>
        <canvas class="plot" id="oscResp" aria-label="Steady amplitude against drive frequency"></canvas>
      </div>
      <div class="controls">
        ${L.slider('om','Drive frequency Ω / ω₀',0.2,2,0.01,0.6)}
        ${L.slider('zeta','Damping ratio ζ',0.02,0.5,0.01,0.05)}
        <dl class="readout" id="oscRead"></dl>
        <p class="small">Try Ω = 1 with ζ = 0.02: the amplitude keeps growing for a long time, the swing being pushed in step. Then raise ζ.</p>
      </div>
      <div class="model-note">Model: linear oscillator, fourth-order Runge–Kutta integration from rest, 60 time units shown. Steady amplitude A = 1/√((1−Ω²)² + (2ζΩ)²). This is a linear system, so it never becomes chaotic; resonance here only amplifies. Lab B adds the nonlinearity.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · The logistic map (instability and chaos)</div>
    <div class="prose"><p>The simplest model with Fried's cascade is the logistic map, <span class="mono">xₙ₊₁ = r xₙ (1 − xₙ)</span>, a population that grows and then crowds itself. The drive parameter r plays the role of Fried's temperature difference. Move r and watch stability give way to oscillation, period doubling and chaos.</p></div>
    <div class="lab">
      <div class="viz">
        <canvas class="plot tall" id="bif" aria-label="Bifurcation diagram of the logistic map"></canvas>
        <canvas class="plot" id="series" aria-label="Time series at the chosen r"></canvas>
      </div>
      <div class="controls">
        ${L.slider('r','Drive r',2.5,4,0.0005,3.2)}
        <div class="seg" role="group" aria-label="Jump to">
          <button class="btn" type="button" data-r="2.9">Stable</button>
          <button class="btn" type="button" data-r="3.2">Period 2</button>
          <button class="btn" type="button" data-r="3.5">Period 4</button>
          <button class="btn" type="button" data-r="3.7">Chaos</button>
        </div>
        <dl class="readout" id="mapRead"></dl>
        <div class="callout" id="windowTask"><b>Challenge.</b> Fried's ceiling says that past the onset of chaos (r ≈ 3.57), order is gone for good. Search above 3.6 for a value of r where the behavior is periodic again. The readout tells you when you find one.</div>
      </div>
      <div class="model-note">The Lyapunov exponent λ measures how fast nearby states separate: λ &lt; 0 means a stable, repeating pattern; λ &gt; 0 means chaos. Computed from 3,000 iterations after discarding 1,000.</div>
    </div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','In the logistic map, ordered windows appear inside the chaotic region; the largest, a period-3 window, opens at r = 1 + √8 ≈ 3.828. Period-doubling routes to chaos also share universal numbers (Feigenbaum), which echoes Fried\'s interest in “universality” (pp. 134–137).')}
    ${L.claim('est','Per Bak, whom Fried cites (pp. 138–140), describes self-organized criticality: idealized driven systems such as sandpiles with sustained, scale-dependent avalanche activity under stated conditions. This is not a theorem about unlimited complexity.')}
    ${L.claim('open','<b>Kind of gap: definition and proof.</b> One model\'s route to chaos does not establish a universal ceiling on classical organization. What exactly is the ceiling, which systems does it apply to, and what result establishes it? Fried\'s stabilization (Unit 7) is offered as the way past it, so the premise matters.')}
  </div>

  ${L.check('m1','You drive the oscillator at Ω = 1 with ζ = 0.02 and then at ζ = 0.3. What does the change show about resonance?',[
    {t:'Damping limits how much energy resonance can pile up; with strong damping, pushing in step barely helps.', ok:true, fb:' At resonance the steady amplitude is 1/(2ζ): 25 at ζ = 0.02, under 2 at ζ = 0.3. Resonance amplifies only what dissipation allows.'},
    {t:'Resonance always destroys the pattern, whatever the damping.', ok:false, fb:' In this linear model resonance never destroys anything; it only enlarges the oscillation. Destabilization needs nonlinearity, as in Lab B.'},
    {t:'Damping changes the natural frequency, so the system stops resonating.', ok:false, fb:' Light damping barely moves the peak. The peak sits near Ω = 1 for every ζ in this range; what changes is its height and width.'}
  ],{reason:true})}

  ${L.check('m2','What does the logistic map\'s period-3 window tell you about Fried\'s “critical threshold” (p. 323)?',[
    {t:'It disproves Fried, because the map regains order.', ok:false, fb:' Too strong. One model with windows shows the threshold is not universal in that model. Fried\'s claim is about real pattern-forming systems; it needs its own argument, but one counterexample model does not refute every version.'},
    {t:'It shows that chaos past one threshold need not be permanent, so a general ceiling needs a separate argument.', ok:true, fb:' That is the defensible conclusion: the ceiling is a premise to establish, not a given.'},
    {t:'It is irrelevant, because the logistic map is not physics.', ok:false, fb:' The logistic map is a standard reduced model of real dynamics, and its route to chaos matches measurements in fluids. It is a fair test case.'}
  ],{reason:true})}

  ${L.note('mech-1','In your own words: what does Fried need the “chaos ceiling” for, and what would convince you it is real?')}
  `; },
  mount(root){
    // ---------- oscillator ----------
    let om = .6, z = .05;
    const tCan = root.querySelector('#oscTime'), rCan = root.querySelector('#oscResp');
    function simulate(){ const dt = .02, N = 3000; let x = 0, v = 0, t = 0; const xs = new Float32Array(N);
      const f = (t,x,v) => [v, Math.cos(om*t) - 2*z*v - x];
      for (let i=0;i<N;i++){ xs[i]=x; const k1=f(t,x,v), k2=f(t+dt/2,x+dt/2*k1[0],v+dt/2*k1[1]), k3=f(t+dt/2,x+dt/2*k2[0],v+dt/2*k2[1]), k4=f(t+dt,x+dt*k3[0],v+dt*k3[1]);
        x += dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]); v += dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]); t += dt; }
      return xs; }
    const amp = (O, zz) => 1/Math.sqrt((1-O*O)**2 + (2*zz*O)**2);
    const drawT = L.canvas(tCan, (ctx,W,H,c) => { const xs = simulate(); let mx = 0; xs.forEach(v => mx = Math.max(mx, Math.abs(v))); mx = Math.max(1, mx*1.1);
      const nice = mx > 20 ? 10 : mx > 8 ? 5 : mx > 3 ? 2 : 1; const yt = []; for (let y=-Math.floor(mx/nice)*nice; y<=mx; y+=nice) yt.push(y);
      const a = L.axes(ctx,W,H,c,{x0:0,x1:60,y0:-mx,y1:mx,xt:[0,10,20,30,40,50,60],yt,xl:'time (1/ω₀)',yl:'displacement x'});
      ctx.strokeStyle = c.line; ctx.lineWidth = 1.6; ctx.beginPath(); xs.forEach((v,i) => { const X = a.X(i*.02), Y = a.Y(v); i ? ctx.lineTo(X,Y) : ctx.moveTo(X,Y); }); ctx.stroke(); });
    const drawR = L.canvas(rCan, (ctx,W,H,c) => { const peak = amp(Math.sqrt(Math.max(0,1-2*z*z)), z); const ymax = Math.min(30, Math.max(3, peak*1.15));
      const yt = ymax > 15 ? [0,5,10,15,20,25,30].filter(v=>v<=ymax) : ymax > 6 ? [0,2,4,6,8,10,12,14].filter(v=>v<=ymax) : [0,1,2,3,4,5,6].filter(v=>v<=ymax);
      const a = L.axes(ctx,W,H,c,{x0:.2,x1:2,y0:0,y1:ymax,xt:[.2,.6,1,1.4,1.8],xf:v=>v.toFixed(1),yt,xl:'drive frequency Ω/ω₀',yl:'steady amplitude A'});
      ctx.strokeStyle = c.c3; ctx.lineWidth = 1.6; ctx.beginPath(); for (let i=0;i<=400;i++){ const O = .2 + 1.8*i/400; const X = a.X(O), Y = a.Y(Math.min(ymax, amp(O,z))); i ? ctx.lineTo(X,Y) : ctx.moveTo(X,Y); } ctx.stroke();
      ctx.fillStyle = c.c2; ctx.beginPath(); ctx.arc(a.X(om), a.Y(Math.min(ymax, amp(om,z))), 5, 0, 7); ctx.fill(); });
    function readOsc(){ const A = amp(om,z), d = Math.atan2(2*z*om, 1-om*om);
      root.querySelector('#oscRead').innerHTML = `<dt>Steady amplitude A</dt><dd>${A.toFixed(2)}</dd><dt>Phase lag δ</dt><dd>${(d*180/Math.PI).toFixed(0)}°</dd><dt>Peak amplitude ≈ 1/(2ζ)</dt><dd>${(1/(2*z)).toFixed(1)}</dd>`; }
    L.bindSlider(root,'om',v=>v.toFixed(2),v=>{om=v; drawT(); drawR(); readOsc();});
    L.bindSlider(root,'zeta',v=>v.toFixed(2),v=>{z=v; drawT(); drawR(); readOsc();});

    // ---------- logistic map ----------
    let r = 3.2;
    const R0 = 2.5, R1 = 4;
    const bifPts = (() => { const cols = 700, pts = []; for (let i=0;i<cols;i++){ const rr = R0 + (R1-R0)*i/(cols-1); let x = .5;
      for (let k=0;k<400;k++) x = rr*x*(1-x); for (let k=0;k<120;k++){ x = rr*x*(1-x); pts.push(rr, x); } } return pts; })();
    function lyap(rr){ let x = .5, s = 0; for (let k=0;k<1000;k++) x = rr*x*(1-x);
      for (let k=0;k<3000;k++){ x = rr*x*(1-x); s += Math.log(Math.max(1e-12, Math.abs(rr*(1-2*x)))); } return s/3000; }
    function period(rr){ let x = .5; for (let k=0;k<4000;k++) x = rr*x*(1-x); const x0 = x;
      for (let p=1;p<=64;p++){ x = rr*x*(1-x); if (Math.abs(x-x0) < 1e-7) return p; } return 0; }
    const bif = L.canvas(root.querySelector('#bif'), (ctx,W,H,c) => {
      const a = L.axes(ctx,W,H,c,{x0:R0,x1:R1,y0:0,y1:1,xt:[2.5,2.75,3,3.25,3.5,3.75,4],xf:v=>v.toFixed(2),yt:[0,.25,.5,.75,1],xl:'drive r',yl:'long-run values of x'});
      ctx.fillStyle = c.ink; ctx.globalAlpha = .55; for (let i=0;i<bifPts.length;i+=2) ctx.fillRect(a.X(bifPts[i]), a.Y(bifPts[i+1]), 1, 1); ctx.globalAlpha = 1;
      ctx.strokeStyle = c.c2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a.X(r), a.m.t); ctx.lineTo(a.X(r), H - a.m.b); ctx.stroke();
      ctx.setLineDash([3,4]); ctx.strokeStyle = c.muted; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.X(3.5699), a.m.t); ctx.lineTo(a.X(3.5699), H-a.m.b); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = c.muted; ctx.textAlign = 'right'; ctx.fillText('onset of chaos ≈ 3.57', a.X(3.5699) - 4, a.m.t + 24); });
    const ser = L.canvas(root.querySelector('#series'), (ctx,W,H,c) => {
      const a = L.axes(ctx,W,H,c,{x0:0,x1:60,y0:0,y1:1,xt:[0,10,20,30,40,50,60],yt:[0,.5,1],xl:'step n',yl:'xₙ'});
      let x = .2; ctx.strokeStyle = c.line; ctx.lineWidth = 1.4; ctx.beginPath();
      for (let n=0;n<=60;n++){ const X = a.X(n), Y = a.Y(x); n ? ctx.lineTo(X,Y) : ctx.moveTo(X,Y); x = r*x*(1-x); } ctx.stroke(); });
    function readMap(){ const l = lyap(r), p = period(r);
      const kind = l > 0.005 ? 'Chaotic' : p === 1 ? 'Fixed point' : p ? `Periodic, period ${p}` : 'Periodic (long period)';
      root.querySelector('#mapRead').innerHTML = `<dt>Behavior</dt><dd>${kind}</dd><dt>Lyapunov λ</dt><dd>${l.toFixed(3)}</dd>`;
      const task = root.querySelector('#windowTask');
      if (r > 3.6 && l < -0.005) { task.innerHTML = `<b>Found one.</b> At r = ${r.toFixed(4)} the map is ${kind.toLowerCase()} again, well past the onset of chaos. Order returned without any new law.`; L.set('foundWindow', true); }
    }
    L.bindSlider(root,'r',v=>v.toFixed(4),v=>{ r=v; bif(); ser(); readMap(); });
    root.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => { const s = root.querySelector('#r'); s.value = b.dataset.r; s.dispatchEvent(new Event('input')); }));
  }
});
})();
