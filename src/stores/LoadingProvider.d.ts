import { ReactNode } from "react";
interface LoadingContextType {
    showLoading: (timeoutMs?: number) => void;
    hideLoading: () => void;
    isLoading: boolean;
}
export declare const LoadingProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useLoading: () => LoadingContextType;
export {};
