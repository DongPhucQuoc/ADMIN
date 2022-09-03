import { useState, useEffect } from "react";
import { DatePicker, Button, Spin } from 'antd';
import { StatisticOrderByDay } from "services/Setting.Service";
import { LoadingOutlined } from '@ant-design/icons';
import { formatMoney } from "utils/Common";

const StatisticDay = () => {
  const [click, setClick] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (click) {
      StatisticOrderByDay(date)
        .then(res => {
          setLoading(false);
          setCount(res.data.result.count);
          setTotal(res.data.result.total);
        })
        .catch(e => console.log(e));
    }
  }, [click]);

  const handleChangeDay = (date: any, dateString: string) => {
    setClick(false);
    setDate(dateString);
    setLoading(true);
  }

  const handleGetStatistic = () => {
    if (!date) {
      return;
    }
    
    setClick(true);
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="statistic__day">
      <DatePicker
        className="statistic__day__picker"
        placeholder="Chọn ngày" 
        onChange={handleChangeDay} 
      /> <br />
      <Button onClick={handleGetStatistic}>Thống kê</Button>
      {
        click && (
          <div className="statistic__day__form">
            <p>Tổng số đơn đã giao: {loading ? <Spin indicator={antIcon} /> : count}</p>
            <p>Tổng doanh thu: {loading ? <Spin indicator={antIcon} /> : formatMoney(total)}</p>
          </div>
        ) 
      }
    </div>
  )
}

export default StatisticDay
