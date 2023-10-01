import { Mesh } from "three"
import { Disposable } from "../interfaces/disposable"
import { UserData } from "./userdata"

export abstract class GameObject implements Disposable {
    private static _LAST_ID = 0

    public readonly id: number

    constructor() {
        this.id = GameObject._LAST_ID++
    }

    abstract update(delta: number): void
    abstract dispose(): void
}

export abstract class RenderableObject extends GameObject {
    constructor(public mesh: Mesh) {
        super()

        this.mesh.userData = { id: this.id } as UserData
    }
}