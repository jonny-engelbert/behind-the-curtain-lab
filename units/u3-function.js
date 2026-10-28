(function(){
const L = LAB;
const r = 0.05, Lr = 0.20; // crank radius, rod length (m)
const geo = th => { const s = Math.sin(th), c = Math.cos(th), root = Math.sqrt(Lr*Lr - r*r*s*s);
  return { x: r*c + root, cb: root/Lr, dx: -r*s - r*r*s*c/root, px: r*c, py: r*s }; };
const CONTEXTS = {
  bench:{name:'On the bench', desc:'Isolated: no crank, no slider, no load.'},
  door:{name:'Elevator door drive', desc:'The slider pushes a door panel; sliding friction resists the motion either way (about 30 N).'},
  pump:{name:'Piston pump', desc:'The slider drives a piston; the load is 60 N on the compression stroke (slider moving right, into the cylinder) and 5 N on the return.'}
};
// load (N) on the slider, + pointing right (resists leftward motion), for crank turning counterclockwise; + rod force = tension
function load(ctx, th){ const v = geo(th).dx; if (ctx === 'door') return 30 * Math.sign(v) * -1;
  if (ctx === 'pump') return v > 0 ? -60 : 5; return 0; }
const rodForce = (ctx, th) => { const F = load(ctx, th); return F / geo(th).cb; };
const items = [
  {t:'At θ = 240° in the pump, the rod carries about 62 N of compression.', a:'beh', fb:'Behavior: a measurable force, fully computed from geometry and load.'},
  {t:'The rod opens and closes the elevator door.', a:'fun', fb:'Function: what its motion contributes to the larger system.'},
  {t:'An engineer chose a 20 cm rod so the door clears the frame.', a:'ori', fb:'Origin: why this part exists in this form. Fried\'s point is that this comes from a designer.'},
  {t:'In the pump, the rod\'s force changes sharply twice per turn.', a:'beh', fb:'Behavior: a pattern in the physical record, and a trace of the context it works in.'},
  {t:'The squirrel\'s liver removes toxins from its blood.', a:'fun', fb:'Function: a role the liver plays in the whole organism.'},
  {t:'Livers arose over a long evolutionary history.', a:'ori', fb:'Origin: the historical account of how the organ came to exist.'},
  {t:'The squirrel feels hungry and searches for walnuts.', a:'exp', fb:'Experience, as Fried reads it (p. 148): the feeling looks like a cause above the atoms. Whether it is one is exactly what is disputed.'}
];
L.add({
  id:'function', num:'3', short:'From motion to function', minutes:'25 minutes', pages:'pp. 84–88, 141–161, 179–192',
  title:'The same rod, different functions',
  card:'Symmetry breaking, a connecting rod in two machines, and Fried\'s claim that function cannot come from mechanism alone.',
  lede:`This is the hinge of Fried's book. A squirrel's organs, and an elevator's parts, each do a distinct job set by their place in the whole. Fried argues that mechanical models, built from identical atoms under one law, cannot produce that kind of organization on their own. Here you test the argument on a real mechanism.`,
  html(){ return `
  <div class="case"><h3>Fried's case, step by step</h3>
    <ol class="steps">
      <li>${L.tag('est')} Fried is “a materialist to the end” about what things are made of (p. 147). His question is about <b>causation</b> and <b>emergence</b>: do causes act only at the atomic scale?</li>
      <li>${L.tag('interp')} The squirrel searches for walnuts because it is hungry. If that feeling is a cause, then causes exist above the atoms, which mechanism forbids (pp. 148–151).</li>
      <li>${L.tag('est')} Mechanism's best route to complexity is <b>symmetry breaking</b>: a gas freezes into a crystal, a still mantle starts to roll. Each break restricts what the system can do (pp. 152–157).</li>
      <li>${L.tag('interp')} But organs are <b>functionally differentiated</b>. For that, identical atoms would have to become different kinds, each with its own identity fixed by its relations to the rest. Symmetry breaking only removes symmetries of the existing laws. “Can the laws of physics change the laws of physics?” (p. 160).</li>
      <li>${L.tag('interp')} Take the connecting rod out of an elevator: you can measure its mass and length, but not its function. Put it back with identical pegs and, Fried argues, nothing at the atomic level can tell it which machine it is in (pp. 180–183). The elevator carries a second level of causation, and its behavior “cannot, as a matter of principle,” be derived from physics (p. 184).</li>
      <li>${L.tag('interp')} Machines “are not things, they are symbols” (p. 191): their organization is imposed by living designers. So machines cannot model how living things organize themselves from within, and that question stays open (p. 192).</li>
    </ol>
  </div>

  <div class="section">
    <div class="kicker">Lab A · What symmetry breaking does</div>
    <div class="prose"><p>Cool a two-dimensional “gas” of identical atoms. As the temperature falls, they lock into a lattice: the system loses symmetry and its range of behavior shrinks. Notice what does <i>not</i> change.</p></div>
    <div class="lab">
      <div class="viz"><canvas class="plot" id="sym" aria-label="Atoms from gas to lattice"></canvas></div>
      <div class="controls">
        ${L.slider('temp','Temperature (relative)',0,1,0.01,0.9)}
        <dl class="readout" id="symRead"></dl>
        <p class="small">Every atom in the lattice is still the same kind, obeying the same law. Fried's question is how atoms could instead come to have different, cooperating roles.</p>
      </div>
      <div class="model-note">Illustration only: each atom sits at its lattice site plus a random offset that grows with temperature, so you can see the loss of symmetry. It is not a molecular-dynamics simulation.</div>
    </div>
  </div>

  <div class="section">
    <div class="kicker">Lab B · The connecting rod in two machines</div>
    <div class="prose"><p>The rod is 20 cm long and joins a 5 cm crank to a slider. Choose a context, turn the crank and compare the rod's force. Then ask Fried's question: what can the rod's own physical state tell you about the machine it is in?</p></div>
    <div class="lab">
      <div class="viz">
        <svg class="fig" id="crank" viewBox="0 0 520 220" role="img" aria-label="Slider-crank mechanism"></svg>
        <canvas class="plot" id="force" aria-label="Rod force over one turn"></canvas>
      </div>
      <div class="controls">
        <div class="seg" role="group" aria-label="Context">
          ${Object.entries(CONTEXTS).map(([k,c]) => `<button class="btn" type="button" data-ctx="${k}" aria-pressed="${k==='door'}">${c.name}</button>`).join('')}
        </div>
        <p class="small" id="ctxDesc"></p>
        ${L.slider('theta','Crank angle θ',0,360,1,60)}
        <dl class="readout" id="rodRead"></dl>
      </div>
      <div class="model-note">Model: rigid, massless links, frictionless pins, quasi-static balance, crank turning counterclockwise. Rod axial force = load / cos β, where β is the rod's tilt. Loads are illustrative values, not measurements of a real elevator. The plot shows the selected context solid and the other powered context dashed.</div>
    </div>
  </div>

  <div class="case"><h3>Probe</h3>
    ${L.claim('est','The pins do transmit the rest of the machine to the rod: the load, through the slider, sets the force the rod carries. Change the machine and the rod\'s force history changes. So the rod\'s <i>behavior</i> is fully explained by its interactions, and its stress record even carries traces of its context.')}
    ${L.claim('interp','What the record does not contain is the <i>function</i> (opening a door, pumping water) or the <i>origin</i> (someone designed it). Fried\'s example is strongest on those two. Michael Polanyi (1968) made a similar point: a machine\'s design is a boundary condition that physics leaves open.')}
    ${L.claim('open','<b>Kind of gap: inference.</b> Does the fact that function is set by relations to the whole show that there are new causes at the higher level, or only that we need a higher-level description? Fried takes the stronger reading; Unit 4 examines his support from Gödel.')}
  </div>

  <div class="section"><div class="kicker">Sort the statements</div>
    <div class="prose"><p>Sort each statement as behavior, function, origin or experience. These are the four questions Fried's examples touch, and keeping them apart is most of the work of judging his argument.</p></div>
    ${L.sorter('fn', items, [['beh','Behavior'],['fun','Function'],['ori','Origin'],['exp','Experience']])}
  </div>

  ${L.check('f1','What is Fried asking with “Can the laws of physics change the laws of physics?” (p. 160)',[
    {t:'Whether physical laws vary over time.', ok:false, fb:' He takes the laws as fixed. The question is rhetorical, about what symmetry breaking can achieve.'},
    {t:'Whether a process that only restricts identical atoms under one law could turn them into different kinds with relational identities.', ok:true, fb:' Yes. Symmetry breaking removes symmetries; it never adds new kinds of atoms or new laws. Functional differentiation looks, to him, like it needs both.'},
    {t:'Whether quantum laws can replace Newton\'s.', ok:false, fb:' That comes later, in Part IV. Here the argument is still entirely about classical mechanism.'}
  ],{reason:true})}
  ${L.check('f2','Moving the rod from the door drive to the pump changed its force record. What does this show?',[
    {t:'That the rod "knows" its function.', ok:false, fb:' The force record is behavior. It reflects the load, not the purpose the machine serves.'},
    {t:'That context reaches the rod through physical interactions, so behavior is explained, while function and origin still need a separate account.', ok:true, fb:' This is the fair reading: it answers part of Fried\'s peg argument (p. 183) without settling his larger claim.'},
    {t:'That Fried is simply wrong about the elevator.', ok:false, fb:' Too fast. Fried\'s main targets are function and origin; the lab only shows that the behavior question has a mechanical answer.'}
  ],{reason:true})}
  ${L.note('fn-1','Which of the four questions (behavior, function, origin, experience) do you think mechanism cannot answer, and why?')}
  `; },
  mount(root){
    // symmetry lab
    const sites = []; const n = 9; for (let i=0;i<n;i++) for (let j=0;j<n;j++) sites.push([i + (j%2)*.5, j*.87]);
    const rand = L.rng(7); const offs = sites.map(() => [rand()*2-1, rand()*2-1]);
    let T = .9;
    const sym = L.canvas(root.querySelector('#sym'), (ctx,W,H,c) => {
      const pad = 24, sx = (W-2*pad)/(n+.5), sy = (H-2*pad)/(n*.87);
      const s = Math.min(sx, sy), ox = (W - s*(n+.5))/2, oy = (H - s*n*.87)/2;
      const spread = T*T*4.2;
      ctx.fillStyle = c.line;
      sites.forEach((p,i) => { const x = ox + (p[0] + offs[i][0]*spread)*s, y = oy + (p[1] + offs[i][1]*spread*.87)*s;
        if (x>4 && x<W-4 && y>4 && y<H-4){ ctx.beginPath(); ctx.arc(x, y, Math.max(3, s*.18), 0, 7); ctx.fill(); } });
    });
    L.bindSlider(root,'temp',v=>v.toFixed(2),v=>{ T = v; sym();
      const phase = v > .6 ? 'Gas-like: every direction and position equivalent' : v > .25 ? 'Melting: local order appears' : 'Crystal: only lattice shifts and rotations leave it unchanged';
      root.querySelector('#symRead').innerHTML = `<dt>Phase</dt><dd>${phase}</dd><dt>Kinds of atom</dt><dd>1, at every temperature</dd>`; });

    // crank lab
    let ctxName = 'door', th = 60*Math.PI/180;
    const svg = root.querySelector('#crank');
    function drawCrank(){ const g = geo(th), S = 900, ox = 90, oy = 120;
      const P = [ox + g.px*S, oy - g.py*S], X = ox + g.x*S;
      const active = ctxName !== 'bench';
      const rodLen = Lr*S;
      svg.innerHTML = active ? `
        <line x1="${ox}" y1="${oy+26}" x2="500" y2="${oy+26}" stroke="var(--rule)" stroke-width="2"/>
        <circle cx="${ox}" cy="${oy}" r="${r*S}" fill="none" stroke="var(--rule)" stroke-dasharray="4 4"/>
        <line x1="${ox}" y1="${oy}" x2="${P[0]}" y2="${P[1]}" stroke="var(--muted)" stroke-width="7" stroke-linecap="round"/>
        <line x1="${P[0]}" y1="${P[1]}" x2="${X}" y2="${oy}" stroke="var(--plot-2)" stroke-width="9" stroke-linecap="round"/>
        <rect x="${X-22}" y="${oy-18}" width="44" height="36" rx="4" fill="var(--panel-2)" stroke="var(--muted)" stroke-width="1.5"/>
        <circle cx="${ox}" cy="${oy}" r="6" fill="var(--ink)"/><circle cx="${P[0]}" cy="${P[1]}" r="5" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><circle cx="${X}" cy="${oy}" r="5" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
        ${ctxName==='door' ? `<rect x="${X+24}" y="${oy-70}" width="90" height="92" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="${X+69}" y="${oy-20}" text-anchor="middle" font-size="13" fill="currentColor">door</text>`
          : `<rect x="${X+24}" y="${oy-14}" width="70" height="28" fill="var(--accent-soft)" stroke="var(--accent)"/><rect x="${X+94}" y="${oy-30}" width="70" height="60" fill="none" stroke="var(--muted)"/><text x="${X+129}" y="${oy+48}" text-anchor="middle" font-size="13" fill="currentColor">cylinder</text>`}
        <text x="${ox}" y="${oy+50}" text-anchor="middle" font-size="12" fill="var(--muted)">crank</text>
        <text x="${(P[0]+X)/2}" y="${(P[1]+oy)/2 - 12}" text-anchor="middle" font-size="12" fill="var(--plot-2)">rod</text>`
        : `<line x1="${260-rodLen/2}" y1="110" x2="${260+rodLen/2}" y2="110" stroke="var(--plot-2)" stroke-width="9" stroke-linecap="round"/>
           <circle cx="${260-rodLen/2}" cy="110" r="5" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><circle cx="${260+rodLen/2}" cy="110" r="5" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
           <text x="260" y="150" text-anchor="middle" font-size="13" fill="currentColor">rigid rod, 20 cm, holes at each end</text>`;
    }
    const force = L.canvas(root.querySelector('#force'), (ctx,W,H,c) => {
      const a = L.axes(ctx,W,H,c,{x0:0,x1:360,y0:-70,y1:70,xt:[0,90,180,270,360],xf:v=>v+'°',yt:[-60,-30,0,30,60],xl:'crank angle θ',yl:'rod force (N, + = tension, − = compression)'});
      const plot = (k, col, dash) => { ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath();
        for (let d=0; d<=360; d+=1){ const f = rodForce(k, d*Math.PI/180); const X = a.X(d), Y = a.Y(f); d ? ctx.lineTo(X,Y) : ctx.moveTo(X,Y); } ctx.stroke(); ctx.setLineDash([]); };
      if (ctxName === 'bench'){ plot('bench', c.muted, []); }
      else { plot(ctxName === 'door' ? 'pump' : 'door', c.muted, [4,4]); plot(ctxName, c.c2, []); }
      const deg = th*180/Math.PI; ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(a.X(deg), a.Y(rodForce(ctxName, th)), 4.5, 0, 7); ctx.fill();
    });
    function readRod(){ const g = geo(th), F = load(ctxName, th), Fr = rodForce(ctxName, th), tau = Math.abs(F * g.dx);
      root.querySelector('#ctxDesc').textContent = CONTEXTS[ctxName].desc;
      root.querySelector('#rodRead').innerHTML = ctxName === 'bench'
        ? `<dt>Length</dt><dd>0.200 m</dd><dt>Force carried</dt><dd>0 N</dd><dt>Function</dt><dd>not specified</dd>`
        : `<dt>Slider position x</dt><dd>${g.x.toFixed(3)} m</dd><dt>Rod tilt β</dt><dd>${(Math.acos(g.cb)*180/Math.PI).toFixed(1)}°</dd><dt>Load on slider</dt><dd>${Math.abs(F).toFixed(0)} N</dd><dt>Rod force</dt><dd>${Math.abs(Fr).toFixed(1)} N ${Fr>=0?'tension':'compression'}</dd><dt>Crank torque needed</dt><dd>${tau.toFixed(2)} N·m</dd>`;
    }
    root.querySelectorAll('[data-ctx]').forEach(b => b.addEventListener('click', () => { ctxName = b.dataset.ctx;
      root.querySelectorAll('[data-ctx]').forEach(x => x.setAttribute('aria-pressed', x===b ? 'true':'false')); drawCrank(); force(); readRod(); }));
    L.bindSlider(root,'theta',v=>v.toFixed(0)+'°',v=>{ th = v*Math.PI/180; drawCrank(); force(); readRod(); });
    L.wireSorter(root,'fn',items);
  }
});
})();
