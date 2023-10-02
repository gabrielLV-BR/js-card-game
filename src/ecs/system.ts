import { Component } from "./component"
import { Entity } from "./entity"
import { World } from "./world"

export class Query {
    components: string[]

    constructor(...components: (any&Function)[]) {
        this.components = components.map(x => x.name)
    }
}

export abstract class System {
    constructor(
        private world: World,
    ) {}

    abstract run(delta: number): void

    getResource<T extends Component>(res: { new() : T }) : T {
        return this.world.getResource(res) as T
    }

    *query(q: Query): Generator<Entity> {
        const queryBitset = q.components
            .map(x => {
                const bit = this.world.getComponentBit(x)

                if (bit == undefined) throw Error("Querying unregistered component")

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