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
import { createCigarette } from './meshes/cigarette';
import { createPlate } from './meshes/plate';

export default class AppGame {
    windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    scene = new Scene();
    camera = new PerspectiveCamera(75, this.aspect, 0.1, 1000);
    renderer = new WebGLRenderer({ antialias: true });

    cigaretteMesh = createCigarette();
    plateMesh = createPlate();
    pointerLockControls = new PointerLockControls(this.camera, document.body);

    get aspect() {
        return this.windowSize.width / this.windowSize.height;
    }

    constructor() {
        this.renderer.setSize(this.windowSize.width, this.windowSize.height);
        this.renderer.shadowMap.enabled = true;

        this.scene.add(this.pointerLockControls.getObject());

        this.scene.add(this.cigaretteMesh);
        this.scene.add(this.plateMesh);

        const points = new Points(new BoxGeometry(30, 30, 30), new PointsMaterial({ size: 1, sizeAttenuation: true }));
        points.position.y += 30;
        this.scene.add(points);

        this.scene.background = new Color('black');
        this.scene.fog = new FogExp2(0x000000, 0.005);

        this.camera.position.z = 100;

        const light = new AmbientLight(0xFFFFFF, 1);
        this.scene.add(light);

        this.camera.position.x = 50;
        this.camera.position.y = 30;
        this.camera.lookAt(new Vector3(0, 0, 0));
    }

    start() {
        document.body.appendChild(this.renderer.domElement);
        document.body.addEventListener('click', () => this.pointerLockControls.lock(), false);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.animate();
    }

    onWindowResize() {
        this.windowSize.width = window.innerWidth;
        this.windowSize.height = window.innerHeight;

        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.windowSize.width, this.windowSize.height);
    }

    animate() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));

        if (this.pointerLockControls.isLocked) {
            this.handleMovement();
        }
    }

    handleMovement() {
        // throw new Error('Method not implemented.');
    }
}
