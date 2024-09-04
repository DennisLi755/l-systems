/*
Variables: 0, 1
Constants: "[", "]"
Axiom: 0
Rules: (1 -> 11), (0 -> 1[0]0)
*/

// set up
const rules = {
    "1": "11",
    "0": "1[0]0"
}

const axiom = "0";

// lindenmayer string creation
let mutableAxiom = axiom;
const iterations = 7;
for (let i = 0; i < iterations; i++) {
    let string = '';
    for (let j = 0; j < mutableAxiom.length; j++) {
        const letter = mutableAxiom[j];

        let appliedRule = rules[letter];
        if (appliedRule === undefined) {
            appliedRule = letter;
        }
        string += appliedRule;
    }
    mutableAxiom = string;
}

//interpretation data
let startingPoint = [0 ,0];
let currentAngle = -90;
let currentPosition = startingPoint;
let lineDistance = 3;
let points = [[startingPoint]];
let stateStack = [];

const interpretation = {
    '0': () => {
        currentPosition = points.slice(-1)[0].slice(-1)[0];
        const nextPoint = [
            currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
            currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
        ];

        points.slice(-1)[0].push(nextPoint);
    },
    '1': () => {
        currentPosition = points.slice(-1)[0].slice(-1)[0];
        const nextPoint = [
            currentPosition[0] + lineDistance * Math.cos(currentAngle * Math.PI / 180),
            currentPosition[1] + lineDistance * Math.sin(currentAngle * Math.PI / 180),
        ];

        points.slice(-1)[0].push(nextPoint);
    },
    '[': () => {
        stateStack.push({
            position: points.slice(-1)[0].slice(-1)[0],
            angle: currentAngle,
        });
        currentAngle -= 45;
    },
    ']': () => {
        const lastState = stateStack.pop();
        points.push([lastState.position]);
        currentAngle = lastState.angle;
        currentAngle += 45;
    }
}

for (let i = 0; i < mutableAxiom.length; i++) {
    const letter = mutableAxiom[i];

    const interp = interpretation[letter];
    interp();
}
console.log(mutableAxiom);
console.log(points);

const p = points;

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
  