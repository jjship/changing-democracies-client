declare module "player.js" {
  export class Player {
    off(arg0: string, onEnded: () => void) {
      throw new Error("Method not implemented.");
    }
    constructor(element: HTMLIFrameElement | string);

    on(event: string, callback: () => void): void;
    play(): void;
    pause(): void;
    mute(): void;
    unmute(): void;
    supports(method: string, feature: string): boolean;
    getDuration(callback: (duration: number) => void): void;
  }
}
