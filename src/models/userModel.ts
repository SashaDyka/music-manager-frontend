import type  { Playlist } from './playlistModel.js';

export interface User {
    id: number;
    name: string;
    playlists: Playlist[];
}