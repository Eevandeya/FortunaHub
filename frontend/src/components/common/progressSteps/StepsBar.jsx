import { Step } from '@components.common/progressSteps/Step.jsx';
import styles from './step.module.css';

export const StepsBar = ({ steps }) => (
    <aside className='sidebar sidebar-left'>
        <div className={styles.step_container}>
            <div className={styles.step_bar}>
                {steps.map((step) => (
                    <Step to={step.to} number={step.number} key={step.to} />
                ))}
            </div>
        </div>
    </aside>
);
