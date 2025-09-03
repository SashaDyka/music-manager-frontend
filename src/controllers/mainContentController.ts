import { DataService } from '../services/dataService.js';
import { MainContentView } from '../views/mainContentView.js';
import { PlaylistReviewView } from '../views/playlistReviewView.js';
import type { Playlist } from '../models/playlistModel.js';

export class MainContentController {
    private dataService: DataService;
    private mainContentView: MainContentView;
    private playlistReviewView: PlaylistReviewView;
    private userPlaylists: Playlist[] = [];

    constructor(dataService: DataService, mainContentView: MainContentView, playlistReviewView: PlaylistReviewView) {
        this.dataService = dataService;
        this.mainContentView = mainContentView;
        this.playlistReviewView = playlistReviewView;
        this.setupEventListeners();
    }

   
    public async loadAndDisplayPlaylists(playlists: Playlist[]): Promise<void> {
        try {
            const userPlaylists = await this.dataService.getPlaylists();
            this.mainContentView.displayPlaylists(userPlaylists);
        } catch (error) {
            console.error('Failed to load playlists:', error);
        }
    }
    

    private async handlePlaylistClick(playlistId: number): Promise<void> {
        try {
            const selectedPlaylist = await this.dataService.getPlaylistById(playlistId);
            this.playlistReviewView.renderPlaylist(selectedPlaylist);
        } catch (error) {
            console.error(`Failed to load playlist with ID ${playlistId}:`, error);
        }
    }

    
    private setupEventListeners(): void {
        this.mainContentView.onPlaylistClick(this.handlePlaylistClick.bind(this));
    }
}