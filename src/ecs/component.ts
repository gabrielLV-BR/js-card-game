export class Component {
    constructor(
        public readonly name: string
    ) {}
}

function _Component(target: any) {
    const original = target;
    
    // Define a new constructor that performs validation
    function newConstructor(...args: any[]) {
        for (const arg of args) {
        if (typeof arg !== 'string' || arg === '') {
            throw new Error('Invalid argument: expected a non-empty string');
        }
        }
    
        // Call the original constructor with validated arguments
        const instance = new original(...args);
        return instance;
    }
    
    // Set the prototype of the new constructor to the original prototype
    newConstructor.prototype = original.prototype;
    
    // Return the new constructor
    return newConstructor;
}