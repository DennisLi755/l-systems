import { applyRule, runInterpretation } from "../helper.js";
/*
This directory is used for messing around with different rules and interpretations to create an L-System that's new (hopefully)

Variables: F X
Constants: + - 
Axiom: X
Rules: (F -> X+F+F+X+F), (X -> F-X-XX)

Angle Step: 72
F -> Draw Forward
X -> Draw Forward (half length)
+ -> Turn left 72 degress
- -> Turn right 72 degrees
*/

const rules = {
    "F": "X+F+F+X+F",
    "X": "FF+-X"
};

const axiom = "X";
const iterations = 6;
let mutableAxiom = applyRule(axiom, iterations, rules);

console.log(mutableAxiom);

// interpretation data
let startingPoint = [300, 300];
let currentAngle = 0;
let lineDistance = 5;
let points = [startingPoint];

const interpretation = {
    "F": () => {
        let currentPosition = points.slice(-1)[0];
        const nextPosition = [
            currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
            currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
        ];
        points.push(nextPosition);
    },
    "X": () => {
        let currentPosition = points.slice(-1)[0];
        const nextPosition = [
            currentPosition[0] + lineDistance * 2 * Math.cos(currentAngle * Math.PI / 180),
            currentPosition[1] + lineDistance * 2 * Math.sin(currentAngle * Math.PI / 180),
        ];
        points.push(nextPosition);
    },
    "+": () => {
        currentAngle -= 72;
    },
    "-": () => {
        currentAngle += 72;
    },
};

runInterpretation(mutableAxiom, interpretation);

const polyline = document.createElementNS(
    'http://www.w3.org/2000/svg', 
    'polyline'
);
polyline.setAttribute('points', points.join(' '));
polyline.setAttribute('fill', 'none');
polyline.setAttribute('stroke', 'black');
polyline.setAttribute('stroke-width', '1px');

const svg = document.querySelector('svg');
svg.appendChild(polyline);