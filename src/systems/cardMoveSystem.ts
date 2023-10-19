import { SelectedComponent } from "../components/selectedComponent";
import { Query, System } from "../ecs/system";

export class CardMoveSystem extends System {

    cardQuery = new Query(SelectedComponent)

    run(_delta: number): void {
        for(const entity of this.query(this.cardQuery)) {
            console.log("OI");
            
            const selectedComponent = entity.getComponent(SelectedComponent)
            const object = selectedComponent.object

            object.scale.multiplyScalar(1.1)
        }
    }

    dispose(): void {
        
    }
}