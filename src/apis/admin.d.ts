import { UserInfo } from "../types/members";
export declare const getAdminMembersByRole: ({ role, }: {
    role: string;
}) => Promise<UserInfo[]>;
