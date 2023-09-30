import { System } from "ape-ecs"

import { PerspectiveCamera } from "three"

export class OrbitSystem extends System {
    init(): void {
        this.queries[0].fromAll(PerspectiveCamera.name)
        this.queries[1].fromAll()
    }

    update(delta: number): void {
        const entity = this.queries[0].execute()

    }
} 