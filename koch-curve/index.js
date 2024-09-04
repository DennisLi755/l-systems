import { applyRule } from "../helper.js";
/*
Variables: F
Constants: + -
Axiom: F
Rules: (F -> F+F-F-F+F)

F: draw forward
+: turn left 90 deg
-: turn right 90 deg
*/

const rules = {
    "F": "F+F-F-F+F",
};

const axiom = "F";

const iterations = 5;
let mutableAxiom = applyRule(axiom, iterations, rules);

//console.log(mutableAxiom);

// interpretation data
let startingPoint = [-200 ,0];
let currentAngle = 0;
let currentPosition = startingPoint;
let lineDistance = 3;
let points = [startingPoint];

const interpretation = {
    "F": () => {
        currentPosition = points.slice(-1)[0];
        const nextPoint = [
            currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
            currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
        ];
        points.push(nextPoint);
    },
    "+": () => {
        currentAngle -= 90;
    },
    "-": () => {
        currentAngle += 90;
    },
};

for (let i = 0; i < mutableAxiom.length; i++) {
    const letter = mutableAxiom[i];

    const interp = interpretation[letter];
    interp();
}

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