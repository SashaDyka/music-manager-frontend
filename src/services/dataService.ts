import type  { User } from '../models/userModel.js';
import type { Song } from '../models/songModel.js';
import type { Playlist } from '../models/playlistModel.js';


export class DataService {
    private readonly API_URL = 'http://localhost:3000';

    public async getUsers(): Promise<User[]> {
        try {
            const response = await fetch(`${this.API_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: User[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    public async getUserById(userId: number): Promise<User> {
        try {
            const response = await fetch(`${this.API_URL}/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: User = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            throw error;
        }
    }

    public async getPlaylists(): Promise<Playlist[]> {
        try {
            const response = await fetch(`${this.API_URL}/playlists`, {
                credentials: 'include' 
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Playlist[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching playlists:", error);
            throw error;
        }
    }

    public async getPlaylistById(playlistId: string): Promise<Playlist> {
        try {
            const response = await fetch(`${this.API_URL}/playlists/${playlistId}`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Playlist = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching playlist with ID ${playlistId}:`, error);
            throw error;
        }
    }


    public async getSongs(): Promise<Song[]> {
        try {
            const response = await fetch(`${this.API_URL}/songs`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Song[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching songs:", error);
            throw error;
        }
    }
}