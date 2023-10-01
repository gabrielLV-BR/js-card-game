import { Component } from "./component"
import { World } from "./world"

type Bunda<T> = (new() => T)

interface SuperInterface<T> extends Component, Bunda<T> {}

export class Entity {

    private components: Map<number, Component> = new Map()
    private componentBitset = 0
    
    constructor(
        public readonly id: number,
        private world: World
    ) {}

    addComponent<T extends Component>(component: T) {
        const componentBit = this.world.getComponentBit(component) ?? this.world.registerComponent(component)

        this.components.set(componentBit, component)
        this.componentBitset |= componentBit
    }

    removeComponent(component: Component) {
        if(!this.hasComponents(component)) return;

        const componentBit = this.world.getComponentBit(component) ?? 0

        if(componentBit == 0) throw Error("Universe error");

        this.componentBitset &= (this.componentBitset ^ componentBit) 
        this.components.delete(componentBit)
    }

    getComponent<T extends Component>(c: { new(): T }) {
        const componentBit = this.world.getComponentBit(c.name)!
        const component = this.components.get(componentBit)!
        return component as T
    }

    hasComponents(...components: Component[]) {
        const toCheck = components
            .map(x => this.world.getComponentBit(x) ?? 0)
            .reduce((a, b) => a |= b)

        return this.hasComponentsByBitset(toCheck)
    }

    hasComponentsByBitset(componentBitset: number) {
        return this.componentBitset & componentBitset
    }
}