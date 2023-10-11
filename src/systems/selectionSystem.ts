import { Camera, Raycaster } from "three";
import { CardComponent } from "../components/cardComponent";
import { Query, System } from "../ecs/system";
import { SceneResource } from "../resources/sceneResource";
import { InputResource, MouseButton } from "../resources/inputResource";
import { CameraComponent } from "../components/cameraComponent";
import { UserData } from "../objects/userdata";

export class SelectionSystem extends System {

    selectionQuery = new Query(CardComponent)

    sceneResource = this.getResource(SceneResource)
    inputResource = this.getResource(InputResource)

    cameraQuery = new Query(CameraComponent)

    raycast = new Raycaster()

    dispose(): void {
        
    }

    run(delta: number): void {
        if(!this.inputResource.mouse.isButtonJustPressed(MouseButton.LEFT)) {
            return
        }

        const pointer = this.inputResource.mouse.position

        pointer.x = (pointer.x / innerWidth * 2.0) - 1.0
        pointer.y = (pointer.y / innerHeight * 2.0) - 1.0

        const scene = this.sceneResource.scene

        for(const entity of this.query(this.cameraQuery)) {
            const camera = entity.getComponent(CameraComponent).camera

            this.raycast.setFromCamera(pointer, camera)

            const intersection = this.raycast.intersectObjects(scene.children)

            for(const i of intersection) {
                console.log(i.object);
            }

        }
    }
}