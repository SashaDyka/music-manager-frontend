import type { Playlist } from '../models/playlistModel.js';
import type { Song } from '../models/songModel.js';

export class PlaylistReviewView {
    private playlistTitleElement: HTMLElement | null;
    private playlistSongsContainer: HTMLElement | null;

    constructor() {
        this.playlistTitleElement = document.querySelector('#review-title');
        this.playlistSongsContainer = document.querySelector('#review-songs');

        if (!this.playlistTitleElement || !this.playlistSongsContainer) {
            throw new Error('Playlist review elements not found in the DOM.');
        }
    }

    public renderPlaylist(playlist: Playlist): void {
        if (!this.playlistTitleElement || !this.playlistSongsContainer) return;
        
        this.playlistTitleElement.textContent = playlist.name;
        this.playlistSongsContainer.innerHTML = '';

        playlist.songs.forEach((song: Song) => {
            const songElement = document.createElement('div');
            songElement.classList.add('song-item');
            songElement.dataset.songId = String(song.id);

            songElement.innerHTML = `
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
            `;
            this.playlistSongsContainer?.appendChild(songElement);
        });
    }
}