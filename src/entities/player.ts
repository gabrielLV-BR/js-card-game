import { PerspectiveCamera } from "three";
import { OrbitController } from "../controllers/orbitcontroller";
import { SelectController } from "../controllers/selectcontroller";
import { Disposable } from "../interfaces/disposable";
import { App } from "../main";

export class Player implements Disposable {
    public readonly camera: PerspectiveCamera

    selectController: SelectController
    orbitController: OrbitController

    constructor(app: App) {
        const fov = 90
        const near = 0.1
        const far = 1000

        this.camera = new PerspectiveCamera(fov, innerWidth / innerHeight, near, far)

        this.orbitController = new OrbitController(this.camera, app.renderer.domElement)
        this.selectController = new SelectController(app.scene, this.camera, app.renderer.domElement)
    }

    update(delta: number) {
        this.orbitController.update(delta)
    }

    dispose(): void {
        
    }
}