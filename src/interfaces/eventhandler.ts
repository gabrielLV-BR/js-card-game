import type { Disposable } from "./disposable";
import { Event } from "./event";

export abstract class EventHandler implements Disposable {
    constructor(readonly mask: string) {}

    abstract handle(event: Event): void
    abstract dispose(): void
}