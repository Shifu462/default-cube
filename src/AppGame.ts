import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Vector3,
    BoxGeometry,
    AmbientLight,
    Color,
    Points,
    PointsMaterial,
    FogExp2,
} from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { IInteractableObject, Interaction } from './interaction';
import { Cigarette } from './meshes/Cigarette';
import { createPlate } from './meshes/plate';
import { Movement } from './movement';
import { PointerLockControlsWithMovement } from './movement/PointerLockControlsWithMovement';
import { createCrosshair } from './gui';

export default class AppGame {
    scene = new Scene();
    camera = new PerspectiveCamera(75, this.aspect, 0.1, 1000);
    pointerLockControls = new PointerLockControls(this.camera, document.body) as PointerLockControlsWithMovement;
    movement = new Movement(
        this.pointerLockControls, {
            Height: 1.8,
            Speed: 1,
        } as const
    );

    renderer = new WebGLRenderer({ antialias: true });

    interactableObjects: IInteractableObject[] = [
        new Cigarette,
    ];

    interaction = new Interaction(
        this.camera,
        this.pointerLockControls,
        this.interactableObjects,
    );

    plateMesh = createPlate();

    get aspect() {
        return window.innerWidth / window.innerHeight;
    }

    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        this.scene.add(this.pointerLockControls.getObject());

        this.interactableObjects.forEach(obj => this.scene.add(obj.object));
        this.scene.add(this.plateMesh);

        const points = new Points(new BoxGeometry(30, 30, 30), new PointsMaterial({ size: 1, sizeAttenuation: true }));
        points.position.y += 30;
        this.scene.add(points);

        this.scene.background = new Color('black');
        this.scene.fog = new FogExp2(0x000000, 0.005);

        this.camera.position.z = 100;

        const light = new AmbientLight(0xFFFFFF, 1);
        this.scene.add(light);

        this.camera.position.y = 30;
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.camera.add(createCrosshair());
    }

    start() {
        document.body.appendChild(this.renderer.domElement);
        document.body.addEventListener('click', () => this.pointerLockControls.lock(), false);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.movement.initEvents();
        this.interaction.initEvents();

        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.pointerLockControls.isLocked) {
            this.movement.handleTick();
        }

        this.renderer.render(this.scene, this.camera);
    }
}
