import { setExpenses } from "@/redux/expenseSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetExpenses = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((state) => state.expenses);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`https://backend-expense-tracker-1-jwaw.onrender.com/api/v3/expense/getall?category=${category}&markAsDone=${markAsDone}`);
        if (res.data.success) {
          dispatch(setExpenses(res.data.expenses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpense();
  }, [dispatch, category, markAsDone]);
};

export default useGetExpenses;