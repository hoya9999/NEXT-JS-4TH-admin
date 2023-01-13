import BaseLayout from "../../components/containers/BaseLayout";
import { Button, Form, Input } from "antd";
import firebaseApp from "../../net/firebaseApp";
import { getFirestore, doc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore/lite';
import { useRouter} from 'next/router';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uid from 'tiny-uid';
import { DateTime } from "luxon";
import { useState } from "react";
import Image from 'next/image';

export default function PortfolioForm( {id, portfolio }) {
    const router = useRouter();
    const [thumbnail, setThumbnail] = useState(portfolio?.thumbnail || null);
    return( 
        <BaseLayout>
            <Form layout="vertical"
                initialValues={{
                    subject: portfolio?.subject || null,
                    content: portfolio?.content || null,
                }}
                onFinish={async (values) => {
                    const firestore = getFirestore(firebaseApp);
                    const portfolios = collection( firestore, 'portfolios' );
                    if ( !id ) {
                        await addDoc(portfolios, {
                            ...values,
                            thumbnail,
                            created_at: new Date(),
                            updated_at: new Date(),
                        })
                            // .then( res => console.log("res", res) )
                            // .then( res => router.back())                        
                        .then(res =>{
                                const cnf = confirm('입력 완료!!!\n더 이상 입력을 하지 않으시겠습니까?');
                                // console.log(cnf);
                                if(cnf) {
                                    router.back();
                                }
                        })
                        .catch( console.warn );
                    }
                    else {
                        const docRef = doc(firestore, "portfolios", id);                        
                        await updateDoc(docRef, {
                            ...values,
                            thumbnail,
                            // created_at: new Date(),
                            updated_at: new Date(),
                        })
                            // .then( res => console.log("res", res) )
                            // .then( res => router.back())                        
                        .then(res =>{
                            router.back();
                        })
                        .catch( console.warn );                     
                    }
                }}
            >
                <Form.Item label="대표 이미지" required>
                    <input type="file" onChange={async evt => {
                        if ( evt.target.files.length == 0 ) return;
                        const storage = getStorage(firebaseApp);
                        const file = evt.target.files[0];
                        const fileName = file.name;
                        const dir = DateTime.now().toFormat('yy/MM');
                        // const dir = DateTime.now().toFormat('yy/LL');
                        // DateTime.now().toFormat('MM-dd-yyyy')	//=>	"11-02-2022"
                        // DateTime.now().toFormat('MMMM dd, yyyy')
                        const spt = file.name.split(".");
                        console.log(`file: `, file); 
                        console.log(`fileName: `, fileName);                        
                        console.log(`spt: `, spt);                       
                        // const savedName = `${uid()}.${file.name.split('.').pop()}`;
                        const savedPath = `/${dir}/${encodeURIComponent(spt[0])}-${uid()}.${spt[1]}`;
                        const fileRef = ref( storage, savedPath );
                        await uploadBytes( fileRef, file );
                        const url = await getDownloadURL( fileRef );
                        setThumbnail(url);
                        console.log('url:', url);
                        console.log(`thu: `, thumbnail);                        
                        console.log('savedPath', savedPath);
                        // console.log(fileRef);
                        // console.log(dir);
                        // console.log(savedPath);
                        // console.log(`file: `, file); 
                        // console.log(`fileName: `, fileName);                        
                        // console.log(`spt: `, spt);
                    }} />
                    { thumbnail && (
                            <img src={thumbnail} style={{maxWidth:200, maxHeight:200}} />
                            // <Image loader={thumbnail} src='김치냉장고 s5641 -560000.jpg' width={200} height={200} alt="Picture" />
                      )
                    }
                </Form.Item>
                <Form.Item label="제목" required name="subject">
                    <Input />
                </Form.Item>
                <Form.Item label="설명" required name="content">
                    <Input.TextArea />
                </Form.Item>
                <div className="flex flex-row justify-between">
                    <Form.Item>
                        <Button type="primary" htmlType="">전송</Button>
                    </Form.Item>
                    {id &&
                        <Form.Item>
                            <Button type="danger" onClick={async () => {
                                if (!confirm ('삭제 하시겠습니까?')) return;
                                const firestore = getFirestore(firebaseApp);                                
                                const docRef = doc(firestore, "portfolios", id);
                                await deleteDoc( docRef )
                                    .then(res =>{
                                        router.back();
                                    })
                                    .catch( console.warn );  
                            }}>삭제</Button>
                        </Form.Item>                    
                    }
                </div>
            </Form>
        </BaseLayout>
    );    
}