import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseConfigService implements OnModuleInit {
    private firestore: admin.firestore.Firestore;
    private auth: admin.auth.Auth;

    constructor() { 
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
                    projectId: process.env.PROJECT_ID,
                    clientEmail: process.env.CLIENT_EMAIL,
                }),
            });
            this.firestore = admin.firestore();
            this.auth = admin.auth();
        }
        
    }
    onModuleInit() {
    }

    getFirestore() {
        if (!this.firestore) {
            throw new Error('Firestore has not been initialized');
        }
        return this.firestore;
    }

    getDataAuth(): admin.auth.Auth {
        if (!this.auth) {
            throw new Error('Auth has not been initialized');
        }
        return this.auth;
    }
    
}