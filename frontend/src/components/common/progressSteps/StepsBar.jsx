import { Step } from '@components.common/progressSteps/Step.jsx';

export const StepsBar = ({ steps }) => (
    <aside className='sidebar sidebar-left'>
        <ul
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-around',
                padding: 0,
                margin: 0,
                listStyle: 'none',
            }}>
            {steps.map((step, index) => (
                <li
                    key={index}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '30px',
                        height: '30px',
                    }}>
                    <Step to={step.to} number={step.number} />
                </li>
            ))}
        </ul>
    </aside>
);
