import { NextResponse } from 'next/server';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb';

function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('luminacode');
        const users = db.collection('users');

        // Check if email already registered
        const existing = await users.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { message: 'Email already registered' },
                { status: 409 }
            );
        }

        // Insert new user
        const result = await users.insertOne({
            email,
            passwordHash: hashPassword(password),
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: 'User created successfully', userId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
