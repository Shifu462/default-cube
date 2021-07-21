import { PlayerConfig } from './PlayerConfig';
import { PointerLockControlsWithMovement } from './PointerLockControlsWithMovement';

export class Movement {
    Forward = false;
    Backward = false;
    Left = false;
    Right = false;

    constructor(
        private readonly _controls: PointerLockControlsWithMovement,
        private readonly _playerConfig: PlayerConfig,
    ) {
    }

    handleTick() {
        if (this.Forward) this._controls.moveForward(this._playerConfig.Speed);
        if (this.Backward) this._controls.moveForward(-this._playerConfig.Speed);
        if (this.Right) this._controls.moveRight(this._playerConfig.Speed);
        if (this.Left) this._controls.moveRight(-this._playerConfig.Speed);
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
