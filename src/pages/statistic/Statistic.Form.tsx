import { useState } from "react";
import Header from "./Statistic.Header";
import Day from "./Statistic.Day";
import Month from "./Statistic.Month";
import Year from "./Statistic.Year";

const StatisticForm = () => {
  const [selected, setSelected] = useState({
    day: true,
    month: false,
    year: false,
  });

  const handleChangeStatistic = (value: string) => {
    if (value === "day") setSelected({ day: true, month: false, year: false });
    if (value === "month") setSelected({ day: false, month: true, year: false });
    if (value === "year") setSelected({ day: false, month: false, year: true });
  }

  return (
    <div>
      <Header handleChange={handleChangeStatistic} />
      { selected.day && <Day /> }
      { selected.month && <Month/> }
      { selected.year && <Year/> }
    </div>
  )
}

export default StatisticForm
