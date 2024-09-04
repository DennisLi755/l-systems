import { applyRule, runInterpretation } from "../helper.js";

/*
Variables: X F
Constants: + - []
Axiom: X
Rules: (X -> F+[[X]-X]-F[-FX]+X), (F -> FF)
Angle: 25 degrees
*/

const rules = {
    "X": "F+[[X]-X]-F[-FX]+X",
    "F": "FF",
};
const axiom = "X";
const iterations = 6;
let mutableAxiom = applyRule(axiom, iterations, rules);
console.log(mutableAxiom);

let startingPoint = [-300, 350];
let currentAngle = -45;
let currentPosition = startingPoint;
let lineDistance = 5;
let points = [[startingPoint]];
let stateStack = [];

const interpretation = {
    "F": () => {
        currentPosition = points.slice(-1)[0].slice(-1)[0];
        const nextPoint = [
            currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
            currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
        ];

        points.slice(-1)[0].push(nextPoint);
    },
    "X": () => {},
    "-": () => {
        currentAngle += 25;
    },
    "+": () => {
        currentAngle -= 25;
    },
    "[": () => {
        stateStack.push({
            position: points.slice(-1)[0].slice(-1)[0],
            angle: currentAngle,
        });
    },
    "]": () => {
        const lastState = stateStack.pop();
        points.push([lastState.position]);
        currentAngle = lastState.angle;
    }
}

runInterpretation(mutableAxiom, interpretation);

let polyline = [];
for (let i = 0; i < points.length; i++) {
    polyline[i] = document.createElementNS(
        'http://www.w3.org/2000/svg', 
        'polyline'
    );
    polyline[i].setAttribute('points', points[i].join(' '));
    polyline[i].setAttribute('fill', 'none');
    polyline[i].setAttribute('stroke', 'black');
    polyline[i].setAttribute('stroke-width', '1px');
}


// add the polyline to the svg
const svg = document.querySelector('svg');
for (let i = 0; i < polyline.length; i++) {
    svg.appendChild(polyline[i]);
}