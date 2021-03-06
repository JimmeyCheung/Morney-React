
import { DatePicker, List } from 'antd-mobile';
import Modal from 'antd/lib/modal';
import React, { useState } from 'react';
import { message } from 'antd';
import moment from 'moment';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void,
    okFn: (startDate: Date, endDate: Date) => void
}
const dateCheck = (startDate: moment.Moment, endDate: moment.Moment) => {
    if (startDate > endDate) {
        message.error("开始时间不能大于结束时间");
        return false;
    }
    return true;
}
const DateModal = (props: Props) => {
    const { visible, setVisible, okFn } = props;
    // 自定义时间
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <Modal
            title="自定义时间"
            visible={visible}
            okText="保存"
            cancelText="取消"
            onOk={() => { okFn(startDate, endDate) }}
            onCancel={() => { setVisible(false) }}
        >
            <div>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="Optional"
                    value={startDate}
                    onChange={date => {
                        if (!dateCheck(moment(date), moment(endDate))) {
                            return;
                        }
                        setStartDate(date)
                    }}
                >
                    <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>
            </div>
            <div>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="Optional"
                    value={endDate}
                    onChange={date => {
                        if (!dateCheck(moment(startDate), moment(date))) {
                            return;
                        }
                        setEndDate(date)
                    }}
                >
                    <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>
            </div>
        </Modal>
    )
}
export { DateModal };