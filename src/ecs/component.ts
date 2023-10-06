/*
    A Component is just data
    It can house some simple behaviour, like setters & getters,
        but they should be just properties, plain data
*/
export abstract class Component {
    constructor(
        public readonly name: string
    ) {}
}
