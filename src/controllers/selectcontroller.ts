import { Raycaster, Vector2 } from "three";
import { Disposable } from "../interfaces/disposable";
import { UserData } from "../objects/userdata";

export class SelectController implements Disposable {

    clickInteractButton = 0

    raycaster = new Raycaster()
    pointer = new Vector2()

    selection = []

    constructor(
        private scene: THREE.Scene,
        private camera: THREE.Camera,
        private element: HTMLCanvasElement
    ) {
        this.element.addEventListener("mousedown", e => this.clickHandler(e))
    }

    clickHandler(e: MouseEvent) {
        console.log("HELLO");
        
        if(e.button == this.clickInteractButton) {

            this.pointer.x = (e.clientX / innerWidth) * 2 - 1
            this.pointer.y = - (e.clientY / innerHeight) * 2 + 1

            this.raycastClick()
        }
    }

    raycastClick() {
        this.raycaster.setFromCamera(this.pointer, this.camera)

        const intersections = this.raycaster.intersectObjects(this.scene.children)

        for (const obj of intersections) {
            const data = obj.object.userData as UserData
        }
    }

    dispose(): void {
        this.element.removeEventListener("mousedown", e => this.clickHandler(e))
    }
}