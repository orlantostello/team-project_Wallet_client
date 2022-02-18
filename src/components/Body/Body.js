import s from './Body.module.css';
import LeftBar from '../LeftBar';

function Body() {
  return (
    <div className={s.body}> 
      <LeftBar />
      <p>Сюда вставлять свой компонент</p>
    </div>
  );
}
export default Body;
