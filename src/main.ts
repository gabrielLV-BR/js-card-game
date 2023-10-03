import * as THREE from "three"
import { ECSTest } from "./test"
import { World } from "./ecs/world"
import { InputResource } from "./resources/inputResource"
import { OrbitComponent } from "./components/orbitComponent"
import { CameraComponent } from "./components/cameraComponent"
import { InputSystem } from "./systems/inputSystem"
import { OrbitSystem } from "./systems/orbitSystem"

export class App {

  running: boolean = true
  clock: THREE.Clock = new THREE.Clock()

  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene

  world: World

  constructor() {
    const fov = 90
    const near = 0.1
    const far = 1000

    this.camera = new THREE.PerspectiveCamera(fov, innerWidth / innerHeight, near, far)

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(innerWidth, innerHeight)

    document.body.appendChild(this.element)

    //

    this.world = new World()

    this.world.registerResource(InputResource)

    const player = this.world.createEntity()
    player.addComponent(new OrbitComponent())
    player.addComponent(new CameraComponent(this.camera))

    this.world.registerSystem(InputSystem, this.element)
    this.world.registerSystem(OrbitSystem)
  }

  get element() {
    return this.renderer.domElement
  }

  Start() {
    // for(let i = 0; i < 10; i++) {
    //   const card = new Card()
    //   card.mesh.position.x = Math.random() * 5
    //   card.mesh.position.z = Math.random() * 5

    //   card.mesh.rotateY(Math.random() * Math.PI)

    //   this.AddObject(card)
    // }

    //

    const mesh = new THREE.BoxGeometry(10, 1, 10)
    const material = new THREE.MeshBasicMaterial({ color: "rgb(120, 120, 40)" })
    const model = new THREE.Mesh(mesh, material)

    model.position.set(0, -0.5, 0)

    this.scene.add(model)

    //

    this.clock.start()
    this.renderer.setAnimationLoop(() => this.Loop())
  }

  Dispose() {
    this.clock.stop()

    // this.objects.forEach(x => x.dispose)
    // this.eventHandlers.forEach(x => x.dispose())
  }

  Loop() {
    const delta = this.clock.getDelta()

    // for(const obj of this.objects) {
    //   obj.update(delta)
    // }

    this.world.runSystems(delta)

    this.renderer.render(this.scene, this.camera)
  }

  Resize() {
    this.renderer.setSize(innerWidth, innerHeight)
  }
}

window.oncontextmenu = () => {
  // cancels right mouse button menu
  return false
}

window.onload = () => {
  new ECSTest().run()
  new App().Start()
}