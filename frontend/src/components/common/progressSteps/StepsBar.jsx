import { Step } from '@components.common/progressSteps/Step.jsx';

export const StepsBar = ({ steps }) => (
    <aside className='sidebar sidebar-left'>
        <div className='step-container'>
            <div className='step-bar'>
                {steps.map((step, index) => (
                    <Step to={step.to} number={step.number} key={index} />
                ))}
            </div>
        </div>
    </aside>
);
