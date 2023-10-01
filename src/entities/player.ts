import { OrbitController } from "../controllers/orbitcontroller";
import { App } from "../main";
import { GameObject } from "../objects/object";

export class Player extends GameObject {

    orbitController: OrbitController

    constructor(app: App) {
        super()

        this.orbitController = new OrbitController(app.camera, app.renderer.domElement)
    }

    update(delta: number) {
        this.orbitController.update(delta)
    }

    dispose(): void {
        
    }
}