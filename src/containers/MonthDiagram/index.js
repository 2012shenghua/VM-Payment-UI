import React from 'react'
import { Menu, Icon, DatePicker } from 'antd'
import moment from 'moment'

class Index extends React.Component {
  state = {
    sliderTime: 1547386800587,
    endTime: 1547539714838,
    startTime: 1547280680352
  }

  disabledDate = (current) => {
    const { endTime, startTime } = this.state
    return current < moment(startTime) || current > moment(endTime);
  }
  
  render() {
    const { sliderTime } = this.state
    return (
      <div>
        月度报表
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          // onChange={this.dataPickerChange}
          // value={moment(sliderTime)}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          disabledDate={(value) => this.disabledDate(value)}
        // disabledTime={(value) => this.disabledDateTime(value)}
        />
      </div>
    )
  }
}
export default Index