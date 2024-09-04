const applyRule = (axiom, iterations, rules) => {
    for (let i = 0; i < iterations; i++) {
        let string = '';
        for (let j = 0; j < axiom.length; j++) {
            const letter = axiom[j];
    
            let appliedRule = rules[letter];
            if (appliedRule === undefined) {
                appliedRule = letter;
            }
            string += appliedRule;
        }
        axiom = string;
    };
    return axiom;
}

export {applyRule};