import { Component } from "./ecs/component";
import { System, Query } from "./ecs/system";

class VelocityComponent extends Component {
    constructor() {
        super(VelocityComponent.name)
    }
}

class PhysicsSystem extends System {

    physicsQuery = new Query(VelocityComponent)

    run(delta: number): void {
        for(const entity of this.query(this.physicsQuery)) {
            const vel = entity.getComponent(VelocityComponent.name)
        }
    }
}

export class ECSTest {
    constructor() {

    }

    run() {

    }
}