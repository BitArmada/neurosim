import Network from './neurosim/Network.js';

var inputs = [
    [1],
    [0],
    [1],
    [0],
];

var network = new Network(inputs);

setInterval(update, 1000/2);

function update() {
    network.propogate();
    console.log(network.neurons);
}