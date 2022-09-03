import { FC } from 'react';

interface StatisticHeaderProps {
  handleChange(value: string): void;
}

const StatisticHeader: FC<StatisticHeaderProps> = ({ handleChange }) => {
  return (
    <div className="statistic__header">
      <h3 className="statistic__header__title">Thống kê theo</h3>
      <div className="statistic__header__type">
        <div className="statistic__header__type__text" onClick={() => handleChange("day")}>
          <span>Ngày</span>
        </div>
        <div className="statistic__header__type__text" onClick={() => handleChange("month")}>
          <span>Tháng</span>
        </div>
        <div className="statistic__header__type__text" onClick={() => handleChange("year")}>
          <span>Năm</span>
        </div>
      </div>
    </div>
  )
}

export default StatisticHeader
