import { degToRad } from "three/src/math/MathUtils.js"
import { Component } from "../ecs/component"

export class OrbitComponent extends Component {
    mouseSensitivity = 0.01
    scrollSensitivity = 0.01
    
    minimumDistance = 1.0
    maximumDistance = 100.0

    maxPitchAngle = degToRad(85)

    dirty = false
    mouseCaptured = false

    yaw = 0
    pitch = 0
    distance = 0

    constructor() {
        super(OrbitComponent.name)
    }
}