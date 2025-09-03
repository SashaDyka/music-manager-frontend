import type  { User } from '../models/userModel.js';

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
}