(function(){
const L = LAB, T = L.tag;
L.add({
  id:'start', num:'0', short:'Start here', minutes:'About 10 minutes', pages:'pp. 236–240',
  title:'Where does organization come from?',
  lede:`H. Michael Fried's <em>Behind the Curtain</em> asks how systems whose parts cooperate, like a squirrel's organs, come to exist on their own. His answer runs through mechanics, logic and quantum physics, and ends in a proposal of his own. This course lets you rebuild that argument, test the physics it rests on, and decide what you think.`,
  html(){ return `
  <div class="section">
    <div class="kicker">How each unit works</div>
    <div class="prose">
      <p>Every unit follows the same four moves. <b>Fried's case</b> states his argument in his own terms, with page references. <b>The lab</b> lets you work with a model of the physics he relies on. <b>The probe</b> asks what the lab does and does not establish. <b>Checks and notebook</b> close the unit: short questions with explanations, and a place to write your own view.</p>
      <p>You are never graded on agreeing with Fried. You are asked to represent him accurately, use the physics correctly, and say what further evidence would settle a question.</p>
      <p class="small">No calculus is required for the beginner explanations. Short guides introduce the physics and notation before each activity; the original mathematical detail remains available. Your notes are kept only in this browser.</p>
    </div>
  </div>

  <div class="section">
    <div class="kicker">The claim labels</div>
    <div class="two">
      ${L.claim('est','Results of physics or logic that are tested and agreed, such as the uncertainty principle or Gödel\'s theorem.')}
      ${L.claim('interp','A reading of established results that others dispute, such as the Copenhagen view of measurement.')}
      ${L.claim('prop','An additional proposal in Fried\'s book, such as multistate stabilization. He flags these himself: “Much of what follows, however, is new” (p. 288).')}
      ${L.claim('open','A question nobody has settled. Each one says what kind of gap it is: a missing definition, missing evidence, or a disagreement about interpretation.')}
    </div>
  </div>

  <div class="section">
    <div class="kicker">Opening experience · Rachel's cube</div>
    <div class="prose"><p>Fried introduces his central idea with a drawing. Look at the cube below and report which face seems to be in front. Look away and back several times, recording each impression. There is no right answer.</p></div>
    <div class="lab">
      <div class="viz">
        <svg class="fig" id="cube" viewBox="0 0 320 260" role="img" aria-label="A wire-frame cube that can be seen two ways">
          <g id="cubeShade"></g>
          <g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
            <rect x="70" y="100" width="130" height="130"/><rect x="130" y="40" width="130" height="130"/>
            <line x1="70" y1="100" x2="130" y2="40"/><line x1="200" y1="100" x2="260" y2="40"/>
            <line x1="70" y1="230" x2="130" y2="170"/><line x1="200" y1="230" x2="260" y2="170"/>
          </g>
          <text x="58" y="248" font-size="13" fill="currentColor" font-family="IBM Plex Mono, monospace">L</text>
          <text x="266" y="34" font-size="13" fill="currentColor" font-family="IBM Plex Mono, monospace">U</text>
        </svg>
        <div class="seg" role="group" aria-label="Viewing condition">
          <button class="btn" type="button" data-cond="neutral" aria-pressed="true">Plain wire frame</button>
          <button class="btn" type="button" data-cond="cue" aria-pressed="false">With a shading cue</button>
        </div>
        <p class="small">The shading cue changes the stimulus, so its reports are counted separately.</p>
      </div>
      <div class="controls">
        <div><b>Which square face seems to be in front?</b></div>
        <div class="seg" role="group" aria-label="Report">
          <button class="btn" type="button" data-rep="L">Lower-left face (L)</button>
          <button class="btn" type="button" data-rep="U">Upper-right face (U)</button>
          <button class="btn" type="button" data-rep="F">It flipped while I looked</button>
          <button class="btn" type="button" data-rep="N">Can't tell</button>
        </div>
        <div id="cubeLog" aria-live="polite"></div>
        <button class="btn" type="button" id="cubeClear">Clear my reports</button>
      </div>
      <div class="model-note">Fried's prediction: “I claim that the results will show an even distribution of ‘right’ and ‘left’ answers” (p. 237). Compare it with your own counts.</div>
    </div>

    <div class="case"><h3>Fried's case</h3>
      ${L.claim('est','One flat drawing can support two different three-dimensional percepts; some viewers experience alternation. The drawing itself does not change.')}
      ${L.claim('interp','Before Rachel opens her eyes, the drawing is neither “left” nor “right”; those properties “do not exist until she opens her eyes” (p. 237). Her perception brings meaning, the third dimension, to a flat drawing, and that meaning is what he says “is missing from quantum theory” (p. 238).')}
      ${L.claim('prop','A proton being measured is like Rachel opening her eyes: from the context, it creates a representation, a symbol, and “chooses” its position. Hence his equation PHYSICAL = MATERIAL + MENTAL (p. 240).')}
    </div>
    <div class="case"><h3>Probe</h3>
      ${L.claim('est','Perception research finds that reports are often not 50:50. Many viewers favor the interpretation seen from above, and cues, attention and practice shift the balance. Fried\'s “even distribution” is a testable prediction, not a given.')}
      ${L.claim('open','<b>Kind of gap: evidence.</b> The cube shows that experience can add structure a stimulus lacks. Whether anything like this happens inside a proton is a separate claim, which the cube cannot test. Units 5 to 7 return to it.')}
    </div>
    ${L.note('start-1','What do the cube reports show, and what don\'t they show?','Write two sentences now. Unit 8 asks you to revise them.')}
  </div>

  <div class="section">
    <div class="kicker">The course</div>
    <div class="home-grid" id="courseCards"></div>
  </div>`; },
  mount(root){
    const shade = root.querySelector('#cubeShade');
    let cond = 'neutral';
    const log = L.get('cube', {neutral:{L:0,U:0,F:0,N:0}, cue:{L:0,U:0,F:0,N:0}});
    function drawShade(){ shade.innerHTML = cond === 'cue' ? '<rect x="130" y="40" width="130" height="130" fill="var(--accent)" fill-opacity="0.16"/><polygon points="200,100 260,40 260,170 200,230" fill="var(--accent)" fill-opacity="0.08"/>' : ''; }
    function render(){
      const rows = ['neutral','cue'].map(k => { const c = log[k], n = c.L + c.U + c.F + c.N;
        const pct = v => n ? Math.round(100*v/n) + '%' : '–';
        return `<tr><td>${k==='neutral'?'Plain':'Shading cue'}</td><td>${c.L} <span class="small">${pct(c.L)}</span></td><td>${c.U} <span class="small">${pct(c.U)}</span></td><td>${c.F}</td><td>${c.N}</td></tr>`; }).join('');
      root.querySelector('#cubeLog').innerHTML = `<div class="tbl"><table style="min-width:0"><thead><tr><th>Condition</th><th>L in front</th><th>U in front</th><th>Flipped</th><th>Can't tell</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    root.querySelectorAll('[data-cond]').forEach(b => b.addEventListener('click', () => { cond = b.dataset.cond;
      root.querySelectorAll('[data-cond]').forEach(x => x.setAttribute('aria-pressed', x===b ? 'true' : 'false')); drawShade(); }));
    root.querySelectorAll('[data-rep]').forEach(b => b.addEventListener('click', () => { log[cond][b.dataset.rep]++; L.set('cube', log); render(); }));
    root.querySelector('#cubeClear').addEventListener('click', () => { ['neutral','cue'].forEach(k => log[k] = {L:0,U:0,F:0,N:0}); L.set('cube', log); render(); });
    drawShade(); render();
    root.querySelector('#courseCards').innerHTML = L.units.filter(u => u.num !== '0' && !u.resource).map(u =>
      `<a class="unit-card" href="#${u.id}"><span class="n">Unit ${u.num} · ${u.minutes}</span><h3>${u.title}</h3><p>${u.card}</p></a>`).join('');
  }
});
})();
