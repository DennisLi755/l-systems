import { applyRule, runInterpretation } from "../helper.js";

/*
Variables: F G
Constants: + -
Axiom: F-G-G
Rules: (F -> F-G+F+G-F), (G -> GG)
Angle: 120 degrees
*/

const rules = {
    "F": "F-G+F+G-F",
    "G": "GG"
};

const iterations = 6;
const axiom = "F-G-G"
let mutableAxiom = applyRule(axiom, iterations, rules);
//console.log(mutableAxiom);

let startingPoint = [0 ,0];
let currentAngle = 0;
let lineDistance = 5;
let points = [startingPoint];

const goStraight = () => {
    let currentPosition = points.slice(-1)[0];
    const nextPoint = [
        currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
        currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
    ];
    points.push(nextPoint);
}
const interpretation = {
    "F": goStraight,
    "G": goStraight,
    "+": () => {
        currentAngle -= 120;
    },
    "-": () => {
        currentAngle += 120;
    }
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