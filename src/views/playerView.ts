import type { Song } from '../models/songModel.js';

export class PlayerView {
    private playButton: HTMLButtonElement | null;
    private backButton: HTMLButtonElement | null;
    private nextButton: HTMLButtonElement | null;
    private audio: HTMLAudioElement | null;
    private progressBar: HTMLElement | null;

    constructor() {
        this.playButton = document.querySelector('#play-button');
        this.backButton = document.querySelector('#back-button');
        this.nextButton = document.querySelector('#next-button');
        this.audio = document.querySelector('#audio-player');
        this.progressBar = document.querySelector('.player__line'); 

        if (!this.playButton || !this.audio || !this.progressBar) {
            throw new Error('Player elements not found in the DOM.');
        }
    }

    public updatePlayButton(isPlaying: boolean): void {
        if (!this.playButton) return;
        const playIcon = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 3.016L12 8.016L3 13.016V3.016z"></path></svg>';
        const pauseIcon = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>';
        this.playButton.innerHTML = isPlaying ? pauseIcon : playIcon;
    }

    public setAudioSource(url: string): void {
        if (this.audio) {
            this.audio.src = url;
            this.audio.load();
        }
    }
  
    public play(): void {
        this.audio?.play();
    }

   
    public pause(): void {
        this.audio?.pause();
    }

    public setupEventListeners(playHandler: () => void, nextHandler: () => void, backHandler: () => void): void {
        this.playButton?.addEventListener('click', playHandler);
        this.nextButton?.addEventListener('click', nextHandler);
        this.backButton?.addEventListener('click', backHandler);
    }
}