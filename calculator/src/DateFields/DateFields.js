import React, {Component} from 'react';
import '../App.css';
import Select from '../Select/Select';

class DateFields extends Component {
  state = {
    months: {list: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], selected: 0, label: "months"},
    years: {list: [2018, 2017, 2016, 2015, 2014, 2013], selected: 2018, label: "years"},
    days: {list: null, selected: 1, label: "days"}
  };

  componentDidMount() {
    let selectedYear = this.state.years.selected;
    let selectedMonth = this.state.months.selected;
    let selectedDay = this.state.days.selected;
    let daysList = this.getDay(selectedYear, selectedMonth);

    let days = {
      ...this.state.days,
      list: daysList
    };

    let isWeekend = this.getWeekend(selectedYear, selectedMonth, selectedDay);

    this.setState({days});
    this.props.changeWeekend(isWeekend);
  }

  getWeekend(year, month, day) {
    let date = new Date(+year, +month, +day).getDay();
    return date === 0 || date === 6;
  }

  getDay(year, month) {
    switch (+month) {
      // 31 - jan, mar, may, jul, aug, oct, dec
      // 30 - apr,jun,sep,nov
      // 28-29 - feb
      // jan - 0, feb - 1, mar - 2, apr - 3, may - 4, jun - 5, jul - 6, aug - 7, sep - 8, oct - 9, nov - 10, dec - 11
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
      case 1:
        return +year % 4 === 0 ? 29 : 28
    }
  }

  onChangeHandler = (e) => {
    let {id, value} = e.target;
    let newSelectedState = {
      ...this.state,
      [id]: {
        ...this.state[id],
        selected: value
      }
    };
    let years = newSelectedState.years;
    let months = newSelectedState.months;
    let days = newSelectedState.days;

    if (id !== 'days') {
      days = {
        ...newSelectedState.days,
        list: this.getDay(years.selected, months.selected)
      };
    }

    let isWeekend = this.getWeekend(years.selected, months.selected, days.selected);

    this.setState({years, months, days});

    this.props.changeWeekend(isWeekend);
  }

  render() {
    const {years: yearSelect, months: monthSelect, days: daysSelect} = this.state;
    const yearsList = yearSelect.list.map((item, index) =>
                        <option key={index} value={item.toString()}>{item}</option>
                      );
    const monthsList = monthSelect.list.map((item, index) =>
                        <option key={index} value={index}>{item}</option>
                      );

    const daysList = [...Array(daysSelect.list).keys()].map(day => {
      let i = day + 1;
      return <option key={i} value={i}>{i}</option>
    });

    return (
      <fieldset className="row">
        <legend>Дата</legend>
        <div className="large-4 columns">
          <Select label="Год" id={yearSelect.label}
                  value={yearSelect.selected.toString()}
                  onChange={this.onChangeHandler}>
            {yearsList}
          </Select>
        </div>
        <div className="large-4 columns">
          <Select label="Месяц" id={monthSelect.label}
                  value={monthSelect.selected.toString()}
                  onChange={this.onChangeHandler}>
            {monthsList}
          </Select>
        </div>
        <div className="large-4 columns">
          <Select label="Дата" id={daysSelect.label}
                  value={daysSelect.selected.toString()}
                  onChange={this.onChangeHandler}>
            {daysList}
          </Select>
        </div>
      </fieldset>
    )
  }
}

export default DateFields;
