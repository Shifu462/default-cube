import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial,
    Vector3,
    Material,
} from 'three';
import { IInteractableObject } from '../interaction';
import { mergeMeshes } from '../utils/mergeMeshes';

function createCigaretteMesh(): Mesh {
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

    const scale = .9;
    cigaretteMesh.scale.sub(new Vector3(scale, scale, scale));

    return cigaretteMesh;
}

export class Cigarette implements IInteractableObject {
    readonly object = createCigaretteMesh();

    hoverIn() {
        console.log('hover');
    }

    hoverOut() {
        console.log('out');
    }

    interact() {
        const materials = this.object.material as Material[];

        for (const m of materials) {
            m.alphaTest = 0;
        }
    }
}