import { Vector3 } from "three"
import { clamp, degToRad } from "three/src/math/MathUtils.js"
import { IDisposable } from "../interfaces/disposable"

export class OrbitController implements IDisposable {

    private _vectorBuff = new Vector3()

    private mouseButton = 2

    private mouseSensitivity = 0.01
    private scrollSensitivity = 0.01
    
    private minimumDistance = 1.0
    private maximumDistance = 100.0

    private maxPitchAngle = degToRad(85)

    private dirty = false
    private mouseCaptured = false

    private yaw : number
    private pitch : number
    private distance : number

    constructor(
        private camera: THREE.Camera, 
        private element: HTMLCanvasElement
    ) {
        this.distance = this.camera.position.length()

        this.yaw = this.camera.position.angleTo(new Vector3(0, 1, 0))
        this.pitch = this.camera.position.angleTo(new Vector3(1, 0, 0))

        this.element.addEventListener("mousedown", e => this.mouseDownHandler(e))
        this.element.addEventListener("mouseup", e => this.mouseUpHandler(e))
        this.element.addEventListener("mousemove", e => this.mouseMoveHandler(e))
        this.element.addEventListener("wheel", e => this.mouseScrollHandler(e))
    }

    mouseDownHandler(event: MouseEvent) {
        if (event.button == this.mouseButton) {
            this.mouseCaptured = true
        }
    }

    mouseUpHandler(event: MouseEvent) {
        if (event.button == this.mouseButton) {
            this.mouseCaptured = false
        }
    }
    
    mouseMoveHandler(event: MouseEvent) {
        if(!this.mouseCaptured) return

        this.dirty = true

        this.yaw += event.movementX * this.mouseSensitivity
        this.pitch += event.movementY * this.mouseSensitivity

        this.pitch = clamp(this.pitch, -this.maxPitchAngle, this.maxPitchAngle)
    }

    mouseScrollHandler(event: WheelEvent) {
        this.dirty = true;

        this.distance += event.deltaY * this.scrollSensitivity

        this.distance = clamp(this.distance, this.minimumDistance, this.maximumDistance)
    }

    dispose() {
        this.element.removeEventListener("mousedown", this.mouseDownHandler)
        this.element.removeEventListener("mouseup", this.mouseUpHandler)
        this.element.removeEventListener("mousemove", this.mouseMoveHandler)
        this.element.removeEventListener("wheel", this.mouseScrollHandler)
    }

    update(_delta: number) {
        if(!this.dirty) return
    
        const sin = Math.sin
        const cos = Math.cos
        const yaw = this.yaw
        const pitch = this.pitch

        this._vectorBuff
            .set(
                cos(yaw) * cos(pitch),
                sin(pitch),
                sin(yaw) * cos(pitch),
            )
            .multiplyScalar(this.distance)

        this.camera.position.set(
            this._vectorBuff.x, this._vectorBuff.y, this._vectorBuff.z
        )
        this.camera.lookAt(0, 0, 0)

        this.dirty = false
    }
}