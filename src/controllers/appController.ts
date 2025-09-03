import { DataService } from '../services/dataService.js';
import { MainContentController } from './MainContentController.js';
import { PlaylistReviewView } from '../views/playlistReviewView.js';
import { PlayerController } from './playerController.js';
import { MainContentView } from '../views/mainContentView.js';

export class AppController {
    private dataService: DataService;
    private mainContentController: MainContentController;
    private playerController: PlayerController;

    constructor() {
        this.dataService = new DataService();
        const mainContentView = new MainContentView();
        const playlistReviewView = new PlaylistReviewView();
        
        this.mainContentController = new MainContentController(this.dataService, mainContentView, playlistReviewView);
    }

    public async init(): Promise<void> {
        console.log('App is starting...');
        try {
            const currentUserId = 1;
            const currentUser = await this.dataService.getCurrentUser(currentUserId);
            const userPlaylists = await this.dataService.getPlaylistsByUserId(currentUserId);
            
            this.mainContentController.loadAndDisplayPlaylists(userPlaylists);

            console.log('App initialized successfully.');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }
}