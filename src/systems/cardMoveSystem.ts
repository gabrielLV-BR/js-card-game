import { Camera, Raycaster } from "three";
import { CameraComponent } from "../components/cameraComponent";
import { SelectedComponent } from "../components/selectedComponent";
import { Query, System } from "../ecs/system";
import { InputResource } from "../resources/inputResource";
import { SceneResource } from "../resources/sceneResource";

export class CardMoveSystem extends System {

    selectedQuery = new Query(SelectedComponent)
    cameraQuery = new Query(CameraComponent)

    inputResource = this.getResource(InputResource)
    sceneResource = this.getResource(SceneResource)

    raycast = new Raycaster()

    run(_delta: number): void {
        const mouseState = this.inputResource.mouse
        const mouseDelta = mouseState.delta

        for(const entity of this.query(this.cameraQuery)) {
            const cameraComponent = entity.getComponent(CameraComponent)
            this.moveObjects(cameraComponent)
        }
        
    }

    moveObjects({ camera }: CameraComponent) {
        for(const entity of this.query(this.selectedQuery)) {

            

        }
    }

    dispose(): void {
        
    }
}