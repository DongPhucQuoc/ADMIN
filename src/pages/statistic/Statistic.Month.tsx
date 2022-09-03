import { useState, useEffect } from 'react';
import { Column } from "@ant-design/charts";
import { StatisticOrderByMonth } from '../../services/Setting.Service';
import Spinner from '../../components/Spinner';
import { DatePicker, Button } from "antd";

const StatisticMonth = () => {
  const [year, setYear] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any[]>([]);
  const [config, setConfig] = useState<any>();
  const [statistic, setStatistic] = useState([{ month: 0, total: 0}]);

  useEffect(() => {
    for (let i = 0; i < statistic.length; i++) {
      //@ts-ignore
      const custom = { month: statistic[i].month, value: statistic[i].total }
      setData(prev => [...prev, custom]);
    }
  }, [statistic]);

  useEffect(() => {
    setConfig({
      data,
      height: 400,
      xField: 'month',
      yField: 'value',
      xAxis: { label: { autoRotate: false } },
      scrollbar: { type: 'horizontal' },
    })
  }, [data]);

  const handleGetMonth = (data: any, year: string) => {
    setYear(parseInt(year));
    setData([]);
    setConfig({});
    setStatistic([{ month: 0, total: 0 }])
  }

  const handleClick = () => {
    if (year === 0) {
      return;
    }

    setLoading(true);
    StatisticOrderByMonth(year)
      .then(res => {
        setStatistic(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }

  return (
    <div className="statistic__month">
      <DatePicker
        className="statistic__month__picker"
        onChange={handleGetMonth}
        picker="year"
        placeholder="Chọn năm"
      />
      <Button onClick={handleClick}>Thống kê</Button>
      {
        loading ? (
          <Spinner />
        ) : (
          <> {config && <Column {...config} />} </>
        )
      }
    </div>
  )
}

export default StatisticMonth
