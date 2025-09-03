import type { Playlist } from '../models/playlistModel.js';

export class MainContentView {
    private playlistsContainer: HTMLElement | null;

    constructor() {
        this.playlistsContainer = document.querySelector('#user-playlists');
        if (!this.playlistsContainer) {
            throw new Error('Playlists container (#user-playlists) not found in the DOM.');
        }
    }

    public renderPlaylists(playlists: Playlist[]): void {
        if (!this.playlistsContainer) return;
        
        this.playlistsContainer.innerHTML = '';
        playlists.forEach(playlist => {
            const playlistElement = document.createElement('div');
            playlistElement.classList.add('playlist-item');
            playlistElement.dataset.playlistId = String(playlist.id);

            playlistElement.innerHTML = `
                <div class="playlist-cover"></div>
                <h3 class="playlist-title">${playlist.name}</h3>
                <p class="playlist-info">${playlist.songs.length} songs</p>
            `;
            this.playlistsContainer?.appendChild(playlistElement);
        });
    }

    public onPlaylistClick(handler: (playlistId: number) => void): void {
        this.playlistsContainer?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const playlistItem = target.closest('.playlist-item') as HTMLElement;
            if (playlistItem && playlistItem.dataset.playlistId) {
                const playlistId = Number(playlistItem.dataset.playlistId);
                handler(playlistId);
            }
        });
    }
}