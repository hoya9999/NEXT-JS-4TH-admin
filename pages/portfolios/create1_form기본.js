import BaseLayout from "../../components/containers/BaseLayout";
import { Button, Form, Input } from "antd";

export default function PortfolioForm() {
    return( 
        <BaseLayout>
            <Form layout="vertical"
                onFinish={(values) => {
                    console.log("values:", values);
                }}
            >
                <Form.Item label="제목" required name="subject">
                    <Input />
                </Form.Item>
                <Form.Item label="설명" required name="content">
                    <Input.TextArea />
                </Form.Item>                
                 <Button type="primary" htmlType="">전송</Button>
            </Form>
        </BaseLayout>
    );
}