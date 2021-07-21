import { Color, Geometry, LineBasicMaterial, LineSegments, Vector3 } from 'three';

export function createCrosshair() {
    const geometry = new Geometry();
    const white = new Color(1, 1, 1);

    const petals = 4;

    const radiusInner = 0.01;
    const radiusOuter = 0.05;

    for (let i = 0; i < petals; i++) {
        const ratio = i / petals;
        const angle = ratio * Math.PI * 2;

        geometry.vertices.push(new Vector3(
            Math.cos(angle) * radiusInner,
            Math.sin(angle) * radiusInner,
            0
        ));
        geometry.vertices.push(new Vector3(
            Math.cos(angle) * radiusOuter,
            Math.sin(angle) * radiusOuter,
            0
        ));

        geometry.colors.push(white);
        geometry.colors.push(white);
    }

    const size = 0.5;
    geometry.scale(size, size, size);

    const crosshair = new LineSegments(
        geometry,
        new LineBasicMaterial({
            color: 0xffffff,
            vertexColors: true as any
        })
    );

    crosshair.onBeforeRender = renderer => renderer.clearDepth();
    crosshair.position.set(0, 0, -1);

    return crosshair;
}
