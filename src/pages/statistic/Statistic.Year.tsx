import { useState, useEffect } from 'react';
import { Column } from "@ant-design/charts";
import { StatisticOrderByYear} from '../../services/Setting.Service';
import Spinner from '../../components/Spinner';

const StatisticYear = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [config, setConfig] = useState<any>();
  const [statistic, setStatistic] = useState([]);

  useEffect(() => {
    StatisticOrderByYear()
      .then(res => {
        setStatistic(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    for (let i = 0; i < statistic.length; i++) {
      //@ts-ignore
      const custom = { year: statistic[i].year, value: statistic[i].total }
      setData(prev => [...prev, custom]);
    }
  }, [statistic]);

  useEffect(() => {
    setConfig({
      data,
      height: 400,
      xField: 'year',
      yField: 'value',
      xAxis: { label: { autoRotate: false } },
      scrollbar: { type: 'horizontal' },
    })
  }, [data]);

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className="statistic__month">
            {
              config && <Column {...config} />
            }
          </div>
        )
      }
    </>
  )
}

export default StatisticYear
