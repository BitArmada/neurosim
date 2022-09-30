import { multiplyMatrices, random } from './Math.js';

class Network{
    constructor (input) {
        this.neurons = input;
        this.weights = [];

        this.initWeights();
    }

    initWeights () {
        for(var y = 0; y < this.neurons.length; y++){
            for(var x = 0; x < this.neurons.length; x++){
                // init to random values
                this.weights[y][x] = random();
            }
        }
    }

    propogate(){
        const result = multiplyMatrices(
            this.weights, // wieghts
            this.inputs//inputs 
        );

        this.neurons = result;
    }

    static createInputs() {
    }
}

export default Network;