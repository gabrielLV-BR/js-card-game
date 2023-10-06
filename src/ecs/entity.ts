import { Component } from "./component"
import { World } from "./world"

/*
    An Entity is, on most ECS, just an identifier that links
        Components together
    Most ECSes have the Entity be just an ID
    This is my first ECS implementation, so I decided on
        being more straightforward and just have the Entity
        have every component inside of it
    I still make it a little bit easier to iterate by
        storing each component's bits on a bitset, which
        can be quickly and-ed in order to get whether or
        not an Entity has a given component 
*/
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

    getComponent<T extends Component>(c: { new(...args: any): T }) {
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