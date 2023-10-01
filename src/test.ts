import { Component } from "./ecs/component";
import { System, Query } from "./ecs/system";
import { World } from "./ecs/world";

class VelocityComponent extends Component {
    speed = 2

    constructor() {
        super(VelocityComponent.name)
    }
}

class PhysicsSystem extends System {

    physicsQuery = new Query(VelocityComponent)

    run(delta: number): void {
        for(const entity of this.query(this.physicsQuery)) {
            const vel = entity.getComponent(VelocityComponent)

            vel.speed += 1

            console.log(vel);
        }
    }
}

export class ECSTest {

    world: World = new World()

    constructor() {
        console.log("Initializing test");

        this.world.registerComponent(VelocityComponent)

        let player = this.world.createEntity()
        player.addComponent(new VelocityComponent())

        this.world.addSystem(PhysicsSystem)

        console.log(this.world);
        
    }

    run() {
        for(let i = 0; i < 10; i++)
            this.world.runSystems(1 / 60);
    }
}