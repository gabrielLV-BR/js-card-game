import { IDisposable } from "../interfaces/disposable"
import { Component } from "./component"
import { Entity } from "./entity"
import { World } from "./world"

/* 
    The Query is responsible for, well, querying components
    It allows for the System's decouple of Entity and functionality

    The current implementation of Query is extremely simple and
        quite naive, and I do plan on making it better and more
        versatile, like computing the bitset on the constructor
        and allowing for NOT INCLUDE components in queries
*/
export class Query {
    components: string[]

    constructor(...components: (any&Function)[]) {
        this.components = components.map(x => x.name)
    }
}

/*
    The IRefreshable interface is to be implemented on
        Systems. A System marked as "refreshable" will have
        its `refresh` function called every end of frame

    This should be helpful on the Input System and on
        the Networking System(s)
*/
export interface IRefreshable {
    refresh() : void 
}

export function isIRefreshable(obj: object): boolean {
    return (obj as IRefreshable).refresh !== undefined
}

/*
    Each System is responsible for one thing: mutate data
        on a set of Components

    The beauty of it lies in the fact that the System does
        not have whose data it is that it's manipulating,
        it's completely unaware of the owner of the data

    This decoupling of functionality and classes allows
        for extreme versatility and flexibility, allowing
        for more interesting and complex relationships

    Of course, the current System implementation is
        painfully simple, and sucks at a lot of things,
        but most importantly: performance and relations

    Performance is something that will be addressed in the
        future of this project, as I intend on, at least,
        having something to play around with (namely,
        the full game) before I dive into some optimization

    Relationships are something that I don't see being
        useful for this project, but, who knows (I should)
        
    Despite lacking in quite a lot of things, I think this
        implementation is simple and well-structured enough
        to allow for these changes without drastically
        changing the user's API
*/
export abstract class System implements IDisposable{
    constructor(
        private world: World,
    ) {}

    abstract run(delta: number): void

    getResource<T extends Component>(res: { new(...args: any) : T }) : T {
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

    abstract dispose(): void
}