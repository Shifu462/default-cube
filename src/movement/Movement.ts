import { PlayerConfig } from './PlayerConfig';
import { PointerLockControlsWithMovement } from './PointerLockControlsWithMovement';

export class Movement {
    Forward = false;
    Backward = false;
    Left = false;
    Right = false;

    constructor(
        private readonly Controls: PointerLockControlsWithMovement,
        private readonly PlayerConfig: PlayerConfig,
    ) {
    }

    handleTick() {
        if (this.Forward) this.Controls.moveForward(this.PlayerConfig.Speed);
        if (this.Backward) this.Controls.moveForward(-this.PlayerConfig.Speed);
        if (this.Right) this.Controls.moveRight(this.PlayerConfig.Speed);
        if (this.Left) this.Controls.moveRight(-this.PlayerConfig.Speed);
    }

    private readonly eventCodesToPropNames: Record<string, keyof Movement> = {
        'ArrowUp': 'Forward',
        'KeyW': 'Forward',

        'ArrowLeft': 'Left',
        'KeyA': 'Left',

        'ArrowDown': 'Backward',
        'KeyS': 'Backward',

        'ArrowRight': 'Right',
        'KeyD': 'Right',
    };

    initEvents() {
        document.addEventListener('keydown', event => {
            const propName = this.eventCodesToPropNames[event.code];
            if (!propName) return;

            (this[propName] as boolean) = true;
        });

        document.addEventListener('keyup', event => {
            const propName = this.eventCodesToPropNames[event.code];
            if (!propName) return;

            (this[propName] as boolean) = false;
        });
    }
}
