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

## Beginner reading layer

The default “Start simple” level requires no calculus. Every unit has a familiar example, a plain-language learning goal, a unit glossary, and a notation guide. Labs have concrete starting settings and guidance for reading the result. Controls offer keyboard-accessible expandable explanations. Model notes and equations remain in optional details; “Compact” restores the original density. The preference and existing notebook use localStorage only.

This iteration also clarifies partial path marking, the limits of one-path-mixture arguments, the sign of reservoir entropy changes, CHSH as a witness rather than a general entanglement measure, and the distinction between decoherence and proposed collapse dynamics.

Teaching references: [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), [PhET teaching guidance](https://phet.colorado.edu/en/teaching-resources/teaching-with-phet). Physics references: [IBM quantum interference material](https://quantum.cloud.ibm.com/learning/en/modules/quantum-mechanics/superposition-with-qiskit), [Bassi and Ghirardi on collapse models](https://arxiv.org/abs/quant-ph/0302164), [Zurek on decoherence](https://arxiv.org/abs/quant-ph/0105127).

No learner trial has yet established the effectiveness of this reading layer.
