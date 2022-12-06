import React from 'react'

interface ProgressBarProps {
    progress: number
    className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress,className}) => {
    return (
        <div className={`${className} w-full h-2 bg-gray-300 rounded`}>
            <div className="h-2 bg-purple-500 rounded" style={{width: `${progress}%`}}/>
        </div>
    )
}

export default ProgressBar
