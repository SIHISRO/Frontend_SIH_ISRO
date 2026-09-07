/**
 * Background Music Controller
 * Manages playback of the retro lunar theme track:
 * /music/meditativetiger-retro-color-moon-471836.mp3
 */

class BgmController {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.35;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private userHasInteracted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      // Defer creation until needed
    }
  }

  private initAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.audio) {
      this.audio = new Audio("/music/meditativetiger-retro-color-moon-471836.mp3");
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.preload = "auto";

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("ended", () => {
        // loop is true, but just in case
        this.play();
      });
    }
    return this.audio;
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public async play(): Promise<boolean> {
    const audio = this.initAudio();
    if (!audio) return false;
    try {
      await audio.play();
      this.isPlaying = true;
      this.userHasInteracted = true;
      this.notify();
      return true;
    } catch {
      // Browser autoplay restriction: waiting for user gesture
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const bgmController = new BgmController();
