# Behind the Curtain Lab

An interactive course on H. Michael Fried's *Behind the Curtain: An Inquiry into Science* (2025).
Learners rebuild Fried's argument, work with models of the physics it rests on, and judge his proposal.

## Units
0. Start here: Rachel's cube
1. What mechanism achieves: driven oscillator and the logistic map
2. Entropy and open systems: microstates and an entropy budget
3. From motion to function: symmetry breaking and the connecting rod
4. Gödel and the limits of proof: the Garden proof and a diagonal construction
5. Possibility and measurement: the "tiny Newton" and a Mach–Zehnder interferometer
6. Wholes and parts: the CHSH game
7. Fried's ladder: suppression, stabilization, decoherence and GRW benchmarks
8. Meaning, life and self
9. Putting it together: argument map, premise ratings, transfer, notebook

Every claim is labelled: Established, Interpretation, Fried's proposal, or Open question.

## Running it
Static files, no build step. Open `index.html` in a browser, or serve the folder
(for example `python3 -m http.server`). Notes are stored in the browser's localStorage only.

## Structure
- `index.html`: styles, layout, router and shared helpers (`window.LAB`)
- `units/u*.js`: one file per unit, each registering itself with `LAB.add({...})`

## Live site
Published with GitHub Pages: https://jonny-engelbert.github.io/behind-the-curtain-lab/
