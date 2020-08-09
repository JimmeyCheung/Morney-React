import React from "react";
import { useTags } from "hooks/useTags";
import { useParams, useHistory } from "react-router-dom";
import Layout from "components/Layout";
import Icon from "components/Icon";
import styled from "styled-components";
import { Input } from "../components/Input";
import { Center } from "../components/Center";
import { Space } from "../components/Space";
import { Button } from "components/Button";
import { Label } from 'components/Label';

type Params = {
  id: string;
};
const Topbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  padding: 14px;
  background: white;
`;
const InputWrapper = styled.div`
  background: white;
  padding: 0 16px;
  margin-top: 8px;
`;
const Tag: React.FC = () => {
  const { findTag, updateTag, deleteTag } = useTags();
  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  };
  let { id: idString } = useParams<Params>();
  const tag = findTag(parseInt(idString));
  const tagContent = (tag: { id: number; name: string, category: Category }) => (
    <div>
      <InputWrapper>
        <Input
          label="标签名"
          type="text"
          placeholder="标签名"
          value={tag.name}
          onChange={(e) => {
            updateTag({ ...tag, name: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>
          <span>标签类别</span>
          <select onChange={(e) => {
            console.log(e.target.value)
            let category = tag.category as Category;
            updateTag({ ...tag, category });
          }}>
            <option value="+">收入</option>
            <option value="-">支出</option>
          </select>
        </Label>
      </InputWrapper>
      <Center>
        <Space />
        <Space />
        <Space />
        <Button
          onClick={() => {
            if (deleteTag(tag.id)) {
              alert("删除成功");
              history.goBack();
            }
          }}
        >
          删除标签
        </Button>
      </Center>
    </div>
  );
  return (
    <Layout>
      <Topbar>
        <Icon name="left" onClick={onClickBack} />
        <span>编辑标签</span>
        <Icon />
      </Topbar>
      {tag && tagContent(tag)}
    </Layout>
  );
};
export { Tag };
