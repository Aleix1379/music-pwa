import React from 'react'
import Icon from "./icon";


interface ButtonProps {
    onClick: () => void
    className?: string
    children?: string
    icon?: string
    iconSize?: | "2xs"
        | "xs"
        | "sm"
        | "lg"
        | "xl"
        | "2xl"
        | "1x"
        | "2x"
        | "3x"
        | "4x"
        | "5x"
        | "6x"
        | "7x"
        | "8x"
        | "9x"
        | "10x"
}

const Button: React.FC<ButtonProps> = ({className, onClick, children,icon, iconSize}) => {
    return (
        <button className={`${className} h-12 bg-zinc-300 dark:bg-zinc-800`} onClick={onClick}>
            {icon && <Icon name={icon} size={iconSize}/>}
           <span className="text-black dark:text-purple-400 font-bold">
               { children }
           </span>
        </button>
    );
}

export default Button
