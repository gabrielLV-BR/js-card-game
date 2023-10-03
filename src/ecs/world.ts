// this is my first ECS implementation
// i am extremely proud of it, although it sucks
// it's not meant to be hyper performant (or regularly performant)
// just flexible and easy to use


import { Entity } from "./entity"
import { Component } from "./component"
import { System } from "./system"

export class World {

    entities: Entity[] = []
    systems: System[] = []

    resourceMapping: Map<string, Component>
    componentMapping: Map<string, number>

    constructor() {
        this.resourceMapping  = new Map()
        this.componentMapping = new Map()
    }

    registerResource<T extends Component>(resource: { new(): T }) {
        this.resourceMapping.set(resource.name, new resource())
    }

    getResource<T extends Component>(resource: { new(): T }) {
        const res = this.resourceMapping.get(resource.name)

        if (res == undefined) throw Error("Query for unregistered resource")

        return res as Component
    }

    registerComponent(component: Component): number {
        const componentBit = this.componentMapping.size + 1
        this.componentMapping.set(component.name, componentBit)

        return componentBit
    }

    getComponentBit(component: Component | string) {
        return this.componentMapping.get(typeof(component) == "string" ? component : component.name)
    }

    createEntity() : Entity {
        const entity = new Entity(this.entities.length, this)

        this.entities.push(entity)

        return entity
    }

    registerSystem<T extends System>(system: { new(world: World, ...args: any): T }, ...args: any) {
        this.systems.push(new system(this, args))
    }

    runSystems(delta: number) {
        for(const system of this.systems) system.run(delta)
    }
}