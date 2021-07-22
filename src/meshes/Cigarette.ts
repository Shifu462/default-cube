import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial,
    Vector3,
    PointLight,
    Group,
} from 'three';
import { IInteractableObject } from '../interaction';

function createCigaretteMesh() {
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

    const cigFireLight = new PointLight('red', 2, 10);
    cigFireLight.add(cigFireMesh);

    const group = new Group()
        .add(
            cigOrangeMesh,
            new Mesh(
                new CylinderGeometry(5, 5, 80, 32),
                new MeshBasicMaterial({ color: 0xC0C0C0 })
            ),
            cigFireLight,
        );

    group.position.y = 20;
    group.rotateX(-Math.PI / 2);
    group.castShadow = true;

    const scale = .9;
    group.scale.sub(new Vector3(scale, scale, scale));

    return group;
}

export class Cigarette implements IInteractableObject {
    isHovered: boolean;

    readonly object = createCigaretteMesh();
    readonly yellowPart = this.object.children[0] as Mesh;
    readonly whitePart = this.object.children[1] as Mesh;
    readonly firePart = this.object.children[2];

    constructor() {

    }

    onHoverChange(isHovered: boolean) {
        if (isHovered) console.log('hovered');
        else console.log('unhovered');
    }

    interact() {
        if (this.whitePart.scale.y < 0.2) return;

        this.yellowPart.geometry.computeBoundingBox();
        this.whitePart.geometry.computeBoundingBox();

        console.log(this.yellowPart, this.whitePart);

        this.whitePart.translateY(-7.5);
        this.whitePart.scale.sub(new Vector3(0, .2, 0));

        this.firePart.position.sub(new Vector3(0, 7.5, 0));
    }
}
