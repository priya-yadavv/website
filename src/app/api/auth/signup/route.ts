import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Path to our simple JSON user database
const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

// Simple hash using Node's built-in crypto (no extra packages needed)
function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Read all users from the JSON file
function readUsers(): { id: string; email: string; passwordHash: string }[] {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Write users array back to the JSON file
function writeUsers(users: { id: string; email: string; passwordHash: string }[]): void {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const users = readUsers();

        // Check if email is already taken
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }

        // Create new user and save
        const newUser = {
            id: crypto.randomUUID(),
            email,
            passwordHash: hashPassword(password),
        };

        users.push(newUser);
        writeUsers(users);

        return NextResponse.json({ message: 'User created successfully', userId: newUser.id }, { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
