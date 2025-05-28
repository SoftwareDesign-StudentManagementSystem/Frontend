interface DropDownMenuProps {
    options: string[];
    onSelect?: (option: string) => void;
    defaultSelected?: string;
}
declare const DropDownMenu: ({ options, onSelect, defaultSelected, }: DropDownMenuProps) => import("react/jsx-runtime").JSX.Element;
export default DropDownMenu;
