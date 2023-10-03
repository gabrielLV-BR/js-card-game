import { Vector3 } from "three"
import { Query, System } from "../ecs/system"
import { OrbitComponent } from "../components/orbitComponent"
import { InputResource } from "../resources/inputResource"
import { CameraComponent } from "../components/cameraComponent"


export class OrbitSystem extends System {
    private _vectorBuff = new Vector3()

    mouseCaptured = false

    orbitQuery = new Query(OrbitComponent, CameraComponent)
    inputResource = this.getResource(InputResource)

    count = 0

    run(_delta: number): void {
        const sin = Math.sin
        const cos = Math.cos

        for(const ent of this.query(this.orbitQuery)) {

            const orbitComponent = ent.getComponent(OrbitComponent)
            const cameraComponent = ent.getComponent(CameraComponent)

            const camera = cameraComponent.camera

            const yaw = orbitComponent.yaw
            const pitch = orbitComponent.pitch

            orbitComponent.distance += this.inputResource.mouse.wheelDelta.y * orbitComponent.scrollSensitivity

            if(this.count++ == 0) {
                console.log(this);
                console.log(orbitComponent);
                console.log(cameraComponent);
            }

            this._vectorBuff
                .set(
                    cos(yaw) * cos(pitch),
                    sin(pitch),
                    sin(yaw) * cos(pitch),
                )
                .multiplyScalar(orbitComponent.distance)
    
            camera.position.set(
                this._vectorBuff.x, this._vectorBuff.y, this._vectorBuff.z
            )
            camera.lookAt(0, 0, 0)
        }
    }

    dispose(): void {
        
    }
}