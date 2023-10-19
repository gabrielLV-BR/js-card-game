import { Intersection, Object3D, Object3DEventMap, Raycaster, Vector2 } from "three";
import { CardComponent } from "../components/cardComponent";
import { Query, System } from "../ecs/system";
import { SceneResource } from "../resources/sceneResource";
import { InputResource, MouseButton } from "../resources/inputResource";
import { CameraComponent } from "../components/cameraComponent";
import { Entity } from "../ecs/entity";
import { SelectedComponent } from "../components/selectedComponent";

type Object = Object3D<Object3DEventMap>;

function selectObject(object: Object) {
    const selectedComponent = new SelectedComponent(object)
    Entity.prototype.addComponent.call(object.userData, selectedComponent)
}

function deselectObject(object: Object) {
    Entity.prototype.removeComponent.call(object.userData, SelectedComponent)
}

export class SelectionSystem extends System {

    selectionQuery = new Query(CardComponent)
    cameraQuery = new Query(CameraComponent)

    sceneResource = this.getResource(SceneResource)
    inputResource = this.getResource(InputResource)

    raycast = new Raycaster()

    dispose(): void {
    }

    getIntersection({ camera }: CameraComponent, objects: Object[]): Intersection<Object>[] {
        const pointer = this.getPointer()

        this.raycast.setFromCamera(pointer, camera)

        return this.raycast.intersectObjects(objects)
    }

    getPointer(): Vector2 {
        const pointer = this.inputResource.mouse.position

        pointer.x = (pointer.x / innerWidth * 2.0) - 1.0
        pointer.y = (pointer.y / innerHeight * 2.0) - 1.0

        return pointer
    }

    run(_delta: number): void {

        const mouseState = this.inputResource.mouse
        const scene = this.sceneResource.scene

        let action : (o: Object) => void

        if (mouseState.isButtonJustPressed(MouseButton.LEFT)) {
            action = selectObject
        } else if (mouseState.isButtonJustReleased(MouseButton.LEFT)) {
            action = deselectObject
        } else {
            return
        }

        for (const entity of this.query(this.cameraQuery)) {
            const cameraComponent = entity.getComponent(CameraComponent)
            const children = scene.children

            const intersection = this.getIntersection(cameraComponent, children)

            for (const { object } of intersection) {
                if (object.userData.world == undefined) continue
                action(object)
            }
        }
    }
}