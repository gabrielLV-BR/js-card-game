import type { IDisposable } from "./disposable";
import { Event } from "./event";

export abstract class EventHandler implements IDisposable {
    constructor(readonly mask: string) {}

    abstract handle(event: Event): void
    abstract dispose(): void
}