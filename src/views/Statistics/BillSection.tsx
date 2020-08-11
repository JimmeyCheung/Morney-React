import styled from "styled-components";
import React from "react";
import { useTags } from "hooks/useTags";
import Icon from "components/Icon";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  & > .title {
    padding: 5px 10px;
    background: var(--bg-color);
    font-size: 16px;
  }
  & > .bill {
    height: 100%;
    margin: 10px;
    border-top: 1px solid var(--border-color);
    overflow: auto;
  }
`;
const BillWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
  .icon {
    width: 20px;
    height: 20px;
  }
  & > .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    border-bottom: 1px solid var(--border-color);
  }
  & > .amount {
  }
`;
type Props = {
  records: RecordItem[];
};
const BillSection = (props: Props) => {
  const { findTag } = useTags();
  const { records } = props;
  const getBillList = () => {
    let billList: any[] = [];
    records.forEach((record, index) => {
      const {
        amount,
        tagIds: [tagId],
      } = record;
      let tag = findTag(tagId);
      let bill = billList.find((v) => v.tagIds[0] === tagId);
      bill ? (bill.amount += amount) : billList.push({ ...record, ...tag });
    });
    return billList.sort((a, b) => {
      return b.amount - a.amount;
    });
  };
  return (
    <Wrapper>
      <div className="title">支出排行榜</div>
      <ol className="bill">
        {getBillList().map((record, index) => {
          return (
            <BillWrapper key={index}>
              <Icon className="icon" name={record.icon} />
              <div className="info">
                <span>{record.name}</span>
                <span>{record.amount}</span>
              </div>
            </BillWrapper>
          );
        })}
      </ol>
    </Wrapper>
  );
};
export { BillSection };