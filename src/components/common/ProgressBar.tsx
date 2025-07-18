import React from 'react';

interface ProgressBarProps {
    currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const progressPercent = Math.min(currentStep, 100);

    return (
        <div className="w-full mb-4 bg-purple-200 p-4 rounded-lg">
            <h3 className="text-purple-700 font-semibold mb-1">Your progress</h3>
            <h3 className="text-purple-900 text-sm mb-2">{progressPercent}% to complete</h3>
            <div className="w-full bg-purple-100 h-2 rounded-full">
                <div
                    className="h-2 bg-purple-900 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
