import { PlayerView } from '../views/playerView.js';
import type { Song } from '../models/songModel.js';

export class PlayerController {
    private playerView: PlayerView;
    private currentPlaylist: Song[] = [];
    private currentSongIndex: number = -1;
    private isPlaying: boolean = false;

    constructor() {
        this.playerView = new PlayerView();
        this.setupEventListeners();
    }

 
    public setPlaylist(playlist: Song[]): void {
        this.currentPlaylist = playlist;
        this.currentSongIndex = 0;
        this.loadAndPlayCurrentSong();
    }

    private loadAndPlayCurrentSong(): void {
        if (this.currentSongIndex >= 0 && this.currentSongIndex < this.currentPlaylist.length) {
            const currentSong = this.currentPlaylist[this.currentSongIndex];
            this.playerView.setAudioSource(currentSong.url);
            this.play();
        }
    }

    private togglePlayPause(): void {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.playerView.play();
        } else {
            this.playerView.pause();
        }
        this.playerView.updatePlayButton(this.isPlaying);
    }


    private playNext(): void {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.currentPlaylist.length;
        this.loadAndPlayCurrentSong();
    }
    

    private playPrevious(): void {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
        this.loadAndPlayCurrentSong();
    }


    private setupEventListeners(): void {
        this.playerView.setupEventListeners(
            () => this.togglePlayPause(),
            () => this.playNext(),
            () => this.playPrevious()
        );
    }


    public play(): void {
        this.playerView.play();
        this.isPlaying = true;
        this.playerView.updatePlayButton(this.isPlaying);
    }
}