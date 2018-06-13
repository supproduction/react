import React, {Component} from 'react';
import './App.css';
import DateFields from './DateFields/DateFields';
import Radio from './Radio/Radio';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullPrice: 0,
      currentPrice: 0,
      type: null,
      radio: 'person',
      weekend: false,
      amount: 1,
      person: {
        weekday: 50,
        weekend: 70
      },
      group: {
        weekday: 40,
        weekend: 45
      }
    };
    this.changeWeekend = this.changeWeekend.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleClickChange = this.handleClickChange.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== nextProps) {
      let currentPrice = null;
      let type = null;

      if (prevState.radio === 'person' && !prevState.weekend) {
        currentPrice = prevState.person.weekday;
        type = 'person_weekday';
      } else if (prevState.radio === 'person' && prevState.weekend) {
        currentPrice = prevState.person.weekend;
        type = 'person_weekend';
      } else if (prevState.radio === 'group' && prevState.weekend) {
        currentPrice = prevState.group.weekend;
        type = 'group_weekend';
      } else if (prevState.radio === 'group' && !prevState.weekend) {
        currentPrice = prevState.group.weekday;
        type = 'group_weekday';
      }

      let fullPrice = currentPrice * prevState.amount;

      return {fullPrice, type, currentPrice}
    }
    return null
  }

  handleRadioChange(checked) {
    let amount = checked === 'group' ? 10 : this.state.amount >= 10 && checked === 'person' ? 9 : this.state.amount;

    this.setState({
      amount: amount,
      radio: checked
    })
  }

  handleAmountChange(e) {
    let radio = +e.target.value >= 10 ? 'group' : 'person';

    this.setState({
      radio: radio,
      amount: e.target.value
    })
  }

  handleClickChange(val) {
    let amount = +this.state.amount+val > 0 ? +this.state.amount+val : 1;
    let radio = +this.state.amount+val > 9 ? 'group' : 'person';
    this.setState({amount, radio});
  }

  changeWeekend(weekend) {
    this.setState({
      weekend: weekend
    });
  }

  render() {
    const {type} = this.state;

    return (
      <form id="calcPrice">
        <div className="row">
          <div className="large-12 columns">
            <h1 className="text-center subheader">Регистрация на всемирную выставку новых сортов бананов</h1>
          </div>
        </div>
        <DateFields
          selects={this.state.selects}
          weekend={this.state.weekend}
          changeWeekend={this.changeWeekend}
        />
        <fieldset className="row">
          <legend>Тип</legend>
          <div className="large-12 columns">
            <Radio name="typeOrder"
                   val="person"
                   id="typePerson"
                   checked={this.state.radio}
                   onChange={this.handleRadioChange}
            >
              До 10 обезьян (Индивидуальная)
            </Radio>
            <Radio name="typeOrder"
                   val="group"
                   checked={this.state.radio}
                   id="typeGtoup"
                   onChange={this.handleRadioChange}
            >
              От 10 обезьян (Груповая)
            </Radio>
          </div>
          <div className="large-12 columns">
            <table id="showCurrentPrice">
              <thead>
              <tr>
                <th></th>
                <th>Будни</th>
                <th>Выходные</th>
              </tr>
              </thead>
              <tbody>
              <tr className="person_row">
                <td>Индивидуальная</td>
                {/*класс .current_ используйте для подчеркивания текущей цены*/}
                <td className={`weekday_ price_ ${type === "person_weekday" ? 'current_' : ''}`}>{this.state.person.weekday}</td>
                <td className={`weekend_ price_ ${type === "person_weekend" ? 'current_' : ''}`}>{this.state.person.weekend}</td>
              </tr>
              <tr className="group_row">
                <td>Групповая</td>
                <td className={`weekday_ price_ ${type === "group_weekday" ? 'current_' : ''}`}>{this.state.group.weekday}</td>
                <td className={`weekend_ price_ ${type === "group_weekend" ? 'current_' : ''}`}>{this.state.group.weekend}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
        <fieldset className="row">
          <legend>
            Количество и цена
          </legend>
          <div className="large-4 columns">
            <div className="row collapse">
              <div className="small-2 columns">
                <button type="button" className="button prefix" onClick={() => this.handleClickChange(-1)}>-</button>
              </div>
              <div className="small-8 columns">
                <input type="number" name="" value={this.state.amount} min="1" max="999" onChange={this.handleAmountChange} />
              </div>
              <div className="small-2 columns">
                <button type="button" className="button postfix" onClick={() => this.handleClickChange(1)}>+</button>
              </div>
            </div>
          </div>
          <div className="large-12 columns">
            <output className="panel callout radius left" id="outputTotalPrice">{this.state.fullPrice}</output>
            <input name="totalPrice" id="totalPrice" type="hidden" />
            <button type="submit" className="right">Отправить</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default App;
