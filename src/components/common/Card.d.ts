import { ReactNode } from "react";
interface CardProps {
    cardtitle: string;
    headerChildren?: ReactNode;
    contentChildren?: ReactNode;
}
declare const Card: ({ cardtitle, headerChildren, contentChildren }: CardProps) => import("react/jsx-runtime").JSX.Element;
export default Card;
