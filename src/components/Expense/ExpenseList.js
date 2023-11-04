import { useSelector } from "react-redux";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const theme = useSelector((state) => state.dark.isDark);
  return (
    <div className={!theme ? classes.list:classes.darklist}>
      <div>
        <h2>
          {props.no}. {props.desc}
        </h2>
        <h3>
          {`${props.date.getDate()}-${props.date.getMonth()}-${props.date.getFullYear()}`}
        </h3>
      </div>
      <div>
        <h3>{props.cat}</h3>
        <p>${props.expense}</p>
      </div>
      <span className={classes.btn}>
        <button onClick={props.upt} className={classes.upt}>
          Update
        </button>
        <button onClick={props.dtl} className={classes.dtl}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default ExpenseList;
