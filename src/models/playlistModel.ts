import type  { Song } from './songModel.js';

export interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}