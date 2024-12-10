export type TUser =  {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: "admin" | "client" | "donor";
    // status: "available" | "unavailable";
    isDeleted: boolean
}

