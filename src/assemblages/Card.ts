import { BoxGeometry, MeshBasicMaterial, Scene } from "three";
import { CardComponent, CardType } from "../components/cardComponent";
import { World } from "../ecs/world";
import { SceneResource } from "../resources/sceneResource";
import { MeshComponent } from "../components/meshComponent";
import { Entity } from "../ecs/entity";

export class CardAssemblage  {

    scene : Scene

    constructor(private world: World) {
        this.scene = world.getResource(SceneResource).scene
    }

    create(type: CardType, text: string) : Entity {
        const geometry = new BoxGeometry(3, 0.4, 5)
        const material = new MeshBasicMaterial({ color: type as string })

        const meshComponent = new MeshComponent(geometry, material)

        const cardComponent = new CardComponent(type, text)

        const entity = this.world.createEntity()

        entity.addComponent(meshComponent)
        entity.addComponent(cardComponent)

        this.scene.add(meshComponent.mesh)

        meshComponent.mesh.userData = entity

        return entity
    }
}