import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Expense from '../Expense/Expense';
import classes from './Home.module.css';

const Home = (props) => {

const Theme = useSelector(state=>state.dark.isDark);

  return (
    <div >
      <div className={classes.top}>
        <p>Welcome to Expense Tracker</p>
        <div className={!Theme ? classes.profile:classes.darkprofile } >
            <p>Your Profile is incomplete <Link to={'/Profile'}><span>Complete Now</span></Link></p>
        </div>
      </div>
      <div>
        <Expense />
      </div>
    </div>
  );
};

export default Home;
