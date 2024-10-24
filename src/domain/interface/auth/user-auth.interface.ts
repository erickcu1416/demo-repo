export interface UserAuthI {
    id?: string;
    name: string;
    last_name:string
    email: string;
    password?: string;
    displayName?:string
    emailVerified?: boolean;
  }
