import { Component } from "./component"
import { Entity } from "./entity"
import { World } from "./world"

export class Query {
    components: string[] | (typeof Component)[]

    constructor(...components: string[] | (typeof Component)[]) {
        this.components = components
    }
}

export abstract class System {
    constructor(
        private world: World,
    ) {}

    abstract run(delta: number): void

    *query(q: Query): Generator<Entity> {
        const queryBitset = q.components
            .map(x => {
                const bit = this.world.getComponentBit(x)

                if (!bit) throw Error("Querying unregistered component")

                return bit
            })
            .reduce((a, b) => a |= b)

        for(const entity of this.world.entities) {
            if(entity.hasComponentsByBitset(queryBitset)) {
                yield entity
            }
        }
    }
}