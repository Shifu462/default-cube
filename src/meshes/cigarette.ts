import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial,
} from 'three';
import { mergeMeshes } from '../utils/mergeMeshes';

export function createCigarette() {
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