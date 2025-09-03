import { DataService } from '../services/dataService.js';
import { MainContentController } from './mainContentController.js';
import { PlaylistReviewView } from '../views/playlistReviewView.js';
import { PlayerController } from './playerController.js';
import { MainContentView } from '../views/mainContentView.js';

export class AppController {
    private dataService: DataService;
    private mainContentController: MainContentController;
    private playlistReviewView: PlaylistReviewView;
    private playerController: PlayerController;


    constructor() {
        this.dataService = new DataService();
        const mainContentView = new MainContentView();
        const playlistReviewView = new PlaylistReviewView();
        this.playerController = new PlayerController();
        
        this.mainContentController = new MainContentController(
            this.dataService, 
            mainContentView, 
            playlistReviewView,
            this.playerController 
        );
    }

    public async init(): Promise<void> {
        console.log('App is starting...');
        try {
            const userPlaylists = await this.dataService.getPlaylistsByUserId(currentUserId);
            this.mainContentController.loadAndDisplayPlaylists(userPlaylists);

            console.log('App initialized successfully.');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }
}