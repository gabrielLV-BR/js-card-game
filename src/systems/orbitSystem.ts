import { Vector3 } from "three"
import { Query, System } from "../ecs/system"
import { OrbitComponent } from "../components/orbitComponent"
import { InputResource, MouseButton } from "../resources/inputResource"
import { CameraComponent } from "../components/cameraComponent"
import { MathUtils } from "../utils/math"

export class OrbitSystem extends System {
    private _vectorBuff = new Vector3()

    mouseCaptured = false

    orbitQuery = new Query(OrbitComponent, CameraComponent)
    inputResource = this.getResource(InputResource)

    updateRotation(delta: number, orbit: OrbitComponent) {
        const { x, y } = this.inputResource.mouse.delta

        if (this.inputResource.mouse.isButtonPressed(MouseButton.RIGHT) == 0) {
            return;
        }

        orbit.yaw += x * orbit.mouseSensitivity * delta
        orbit.pitch += y * orbit.mouseSensitivity * delta

        orbit.pitch = MathUtils.clamp(orbit.pitch, -orbit.maxPitchAngle, orbit.maxPitchAngle)
    }

    updatePosition(orbit: OrbitComponent, cameraComponent: CameraComponent) {
        const camera = cameraComponent.camera
        const sin = Math.sin
        const cos = Math.cos

        const yaw = orbit.yaw
        const pitch = orbit.pitch

        orbit.distance += this.inputResource.mouse.wheelDelta.y * orbit.scrollSensitivity

        this._vectorBuff
            .set(
                cos(yaw) * cos(pitch),
                sin(pitch),
                sin(yaw) * cos(pitch),
            )
            .multiplyScalar(orbit.distance)

        camera.position.set(
            this._vectorBuff.x, this._vectorBuff.y, this._vectorBuff.z
        )
        camera.lookAt(0, 0, 0)
    }

    run(delta: number): void {
        for(const ent of this.query(this.orbitQuery)) {
            const orbitComponent = ent.getComponent(OrbitComponent)
            const cameraComponent = ent.getComponent(CameraComponent)

            this.updateRotation(delta, orbitComponent)
            this.updatePosition(orbitComponent, cameraComponent)
         }
    }

    dispose(): void {
        
    }
}