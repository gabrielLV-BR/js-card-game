export class Resizer {

    static MASK = "UI"
    element: HTMLCanvasElement

    constructor(
        private camera : THREE.Camera,
        private renderer: THREE.Renderer
    ) {
        this.element = renderer.domElement
        this.handler.bind(this)
        this.element.addEventListener("resize", this.handler)
    }

    private handler() {
        this.renderer.setSize(innerWidth, innerHeight)
        this.camera.updateMatrixWorld()
    }

    dispose(): void {
        this.element.removeEventListener("resize", this.handler)
    }
}