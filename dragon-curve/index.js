import { applyRule, runInterpretation } from "../helper.js";

/*
Variables: F G
Constants: + -
Axiom: F
Rules: (F -> F+G), (G -> F-G)
Angle: 90 degrees
*/

const rules = {
    "F": "F+G",
    "G": "F-G",
};

const axiom = "F"
const iterations = 10;

let mutableAxiom = applyRule(axiom, iterations, rules);
console.log(mutableAxiom);

// interpretation data
const angleStep = 90;
const lineDistance = 10;
let startingPoint = [0, 0];
let currentAngle = 0;
let points = [startingPoint];

const drawForward = () => {
    let currentPosition = points.slice(-1)[0];
    const nextPoint = [
        currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
        currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
    ];
    points.push(nextPoint);
}

const interpretation = {
    "F": drawForward,
    "G": drawForward,
    "+": () => {
        currentAngle -= angleStep;
    },
    "-": () => {
        currentAngle += angleStep;
    }
}

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