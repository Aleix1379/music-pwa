import React, {useState} from 'react'
import {faPlay, faShuffle, faForwardStep, faBackwardStep, faCirclePlay, faCirclePause} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface IconProps {
    name: string
    size?: | "2xs"
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

interface IconState {
    icons: {
        [key: string]: any
    }
}

const Icon: React.FC<IconProps> = ({name, size = 'lg'}) => {
    const [icons] = useState<IconState['icons']>({
        play: faPlay,
        shuffle: faShuffle,
        backwardStep: faBackwardStep,
        forwardStep: faForwardStep,
        circlePlay: faCirclePlay,
        circlePause: faCirclePause
    })

    return (
        <FontAwesomeIcon className="text-black dark:text-purple-400 mr-3" icon={icons[name]} size={size}/>
    );
}

export default Icon
