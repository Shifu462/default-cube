import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Mesh,
    Vector3,
    BoxGeometry,
    CylinderGeometry,
    MeshBasicMaterial,
    AmbientLight,
    Color,
    Points,
    PointsMaterial,
    FogExp2,
} from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mergeMeshes } from './mergeMeshes';

export default class AppGame {
    windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    scene = new Scene();
    camera = new PerspectiveCamera(75, this.aspect, 0.1, 1000);
    renderer = new WebGLRenderer({ antialias: true });

    cigaretteMesh = this.createCigarette();
    plateMesh = this.createPlate();
    orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    dragControls: DragControls;

    get aspect() {
        return this.windowSize.width / this.windowSize.height;
    }

    constructor() {
        this.renderer.setSize(this.windowSize.width, this.windowSize.height);
        this.renderer.shadowMap.enabled = true;

        this.dragControls = new DragControls([ this.cigaretteMesh ], this.camera, this.renderer.domElement);
        this.dragControls.addEventListener('dragstart', () => this.orbitControls.enabled = false);
        this.dragControls.addEventListener('dragend', () => this.orbitControls.enabled = true);
        this.dragControls.activate();

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
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.animate();
    }

    private createPlate() {
        const plateMesh = new Mesh(
            new BoxGeometry(200, 150, 3),
            new MeshBasicMaterial({ color: 0x68009c })
        );
        plateMesh.rotateX(Math.PI / 2);
        plateMesh.receiveShadow = true;

        return plateMesh;
    }

    private createCigarette() {
        const cigOrangeMesh = new Mesh(
            new CylinderGeometry(5, 5, 30, 32),
            new MeshBasicMaterial({ color: 0xe29200 })
        );
        cigOrangeMesh.position.y -= 55;

        const cigFireMesh = new Mesh(
            new CylinderGeometry(5, 5, 2.5, 32),
            new MeshBasicMaterial({ color: 'red' })
        );
        cigFireMesh.position.y += 41.3;

        const cigaretteMesh = mergeMeshes([
            new Mesh(
                new CylinderGeometry(5, 5, 80, 32),
                new MeshBasicMaterial({ color: 0xC0C0C0 })
            ),
            cigOrangeMesh,
            cigFireMesh,
        ], false);

        cigaretteMesh.position.y = 20;
        cigaretteMesh.rotateX(-Math.PI / 2);
        cigaretteMesh.castShadow = true;

        return cigaretteMesh;
    }

    onWindowResize() {
        this.windowSize.width = window.innerWidth;
        this.windowSize.height = window.innerHeight;

        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.windowSize.width, this.windowSize.height);
    }

    animate() {
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
}
