import React from 'react';
import { Button, Col, Collapse, Form, Input, Row, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
interface Props {
  form: Antd.FormInstance;
  onPublish?: () => void;
  onDraft?: () => void;
  draftLoading?: boolean;
  publishLoading?: boolean;
  collapseIsOpen?: boolean;
  onChangeCollapse?: (value: boolean) => void;
}
const ArticleCollapseForm: React.FC<ViewProps<Props>> = (props) => {
  const {
    className = '',
    onPublish,
    onDraft,
    form,
    draftLoading,
    publishLoading,
    collapseIsOpen = true,
    onChangeCollapse,
  } = props;

  //render
  return (
    <Collapse className={`article-collapse-form ${className}`} activeKey={[String(collapseIsOpen)]}>
      <Panel
        showArrow={false}
        forceRender
        className="header-cursor-auto"
        header={
          <nav className="clear" style={{ width: '100%' }}>
            <Button
              type="primary"
              onClick={() => {
                onChangeCollapse && onChangeCollapse(!collapseIsOpen);
              }}>
              配置
              <RightOutlined className="arrow" style={{ transform: `rotate(${collapseIsOpen ? 90 : 0}deg)` }} />
            </Button>
            <Space className="fr">
              <Button onClick={onDraft} loading={draftLoading}>
                草稿
              </Button>
              <Button onClick={onPublish} type="primary" loading={publishLoading}>
                发布
              </Button>
            </Space>
          </nav>
        }
        key="true">
        <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="title" label="标题" rules={[{ required: true }]}>
                <Input placeholder="请输入标题" />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item name="author" label="作者" rules={[{ required: true }]}>
                <AppInput placeholder="请输入作者" />
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item name="description" label="描述">
                <Input.TextArea placeholder="请输入描述" maxLength={100}></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={24}>
            <Col span={8}></Col>
          </Row> */}
        </Form>
        <footer className="clear">
          <Button
            className="fr"
            onClick={() => {
              form.resetFields();
            }}>
            重置
          </Button>
        </footer>
      </Panel>
    </Collapse>
  );
};
export default ArticleCollapseForm;
