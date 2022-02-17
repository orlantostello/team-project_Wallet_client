import s from './Switch.module.css';

function Switch({ isChecked, onSwitch }) {
  return (
    <div className={s.box}>
      <div className={s.switchbox}>
        <div>
          <div>
            <input
              type="checkbox"
              id="income"
              className={s.switch}
              checked={isChecked}
              onClick={onSwitch}
              readOnly
            />
            <label htmlFor="income" className={s.switchfor}></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Switch;
