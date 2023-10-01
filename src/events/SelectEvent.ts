import { Raycaster, Vector2 } from "three";
import { EventHandler } from "../interfaces/eventhandler";
import { Event } from "../interfaces/event";
import { App } from "../main";
import { RenderableObject } from "../objects/object";

const LAYER = "Select"

export enum SelectionType {
    REPLACE,
    ADD,
    SUBTRACT
}

export class SelectEvent extends Event {
    constructor(
        public ids: number[],
        public selectionType: SelectionType
    ) {
        super(LAYER)
    }
}

export class SelectEventHandler extends EventHandler {
    clickInteractButton = 0

    raycaster = new Raycaster()
    pointer = new Vector2()

    selection : number[] = []

    constructor(
        private app: App
    ) {
        super(LAYER)
    }

    handle(event: SelectEvent): void {
        switch (event.selectionType) {
            
            case SelectionType.REPLACE:
                this.selection = event.ids
                break;

            case SelectionType.ADD:
                this.selection = this.selection.concat(event.ids)
                break;

            case SelectionType.SUBTRACT:
                this.selection =
                    this.selection.filter(x => !event.ids.some(y => y == x))
        }

        this.updateVisualSelection()
    }

    updateVisualSelection() {
        for(const id of this.selection) {
            const obj = this.app.objects.find(x => x.id == id)

            if(obj instanceof RenderableObject) {
                obj.mesh.scale.x = 2
            }
        }
    }

    dispose(): void {
    }
}