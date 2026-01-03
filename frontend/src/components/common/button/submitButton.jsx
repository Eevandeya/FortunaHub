import classes from './buttons-styles.module.css';

const SubmitButton = () => (
    <lable htmlFor='submit'>
        submit
        <input id='submit' type='submit' className={classes.submitButton} />
    </lable>
);

export default SubmitButton;
