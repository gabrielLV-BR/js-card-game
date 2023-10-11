import { Entity } from "./entity"
import { Component } from "./component"
import { IRefreshable, System, isIRefreshable } from "./system"

/*
    This is my first ECS implementation
    Although I'm proud of it, it objectively sucks
    
    ECS is a design architecture that separates a
        program/game's parts into their most basic
        forms: data and logic

    Components are data
    Systems are logic
    Entities link components

    It's useful to see an ECS as a sort of database
     ________                       ____________________
    |_PLAYER_|                     |_Physics Component_|
    |+ Id    | ----- < has > ----- |* velocity         |
    |________|                     |* shape            |
        |                          |___________________|
     < has >                               |
        |                               < has >
     ___|__________________             ___|___
    |_Controller Component_|           |_ENEMY_|
    |* gamepad             |           |+ Id   |
    |______________________|           |_______|

    In this configuration, we could have:
        - A Physics System, which only cares about the Physics Component
        - A Controller System, which cares about the Controller and
            Physics Component

    Player and Enemy share the same Physics System because they both have
        the Physics Component. Every Entity that has that Component will
        have its Component processed as well

    Only Player has the Controller Component and, therefore, only the player
        will be affected. If we put a Controller Component on the Enemy, then
        he would be affected as well

    And this is why ECS is awesome
*/

/*
    The World is where everything gets put together
    Systems and Entities and its Components, the world
        "glues" them together and allows each one of them
        to access eachother on meaningful and controlled
        ways
*/

export class World {

    entities: Entity[] = []

    systems: System[] = []
    systemsToRefresh: IRefreshable[] = []

    resourceMapping: Map<string, Component>
    componentMapping: Map<string, number>

    constructor() {
        this.resourceMapping  = new Map()
        this.componentMapping = new Map()
    }

    registerResource<T extends Component>(resource: { new(...args: any): T }, ...args: any) {
        const res = new resource(this, args)
        this.resourceMapping.set(res.name, res)
    }

    getResource<T extends Component>(resource: { new(...args: any): T }) {
        const res = this.resourceMapping.get(resource.name)

        if (res == undefined) throw Error("Query for unregistered resource")

        return res as T
    }

    registerComponent(component: Component): number {
        const componentBit = 1 << this.componentMapping.size
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
        const s = new system(this, args)

        if(isIRefreshable(s)) {
            // unfortunate type erasure, but we know it is refreshable and ts don't
            this.systemsToRefresh.push(s as any)
        }

        this.systems.push(new system(this, args))
    }

    runSystems(delta: number) {
        for(const system of this.systems) system.run(delta)
        for(const system of this.systemsToRefresh) system.refresh()
    }
}