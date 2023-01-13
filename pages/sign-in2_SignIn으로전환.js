import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

import{ getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '../net/firebaseApp';
import { useRouter } from 'next/router';

export default function SignIn() {
    const router = useRouter();
    return (
        // <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center h-screen'>            
            <Button onClick={() => {
                const auth = getAuth( firebaseApp );
                const provider = new GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                //별도 체크 없는 로그인
                // signInWithPopup( auth, provider)
                //     .then(result => console.log(result))
                //     .catch( console.warn );
                //이메일 주소를 기준으로 로그인 허락
                signInWithPopup( auth, provider)
                    .then(result => {
                        console.log(result)
                        const { email } = result.user;
                        switch( email ) {
                            case "ghkwon9999@naver.com": 
                                router.push("/");
                                break;
                            default:
                                alert("관리자만 로그인 할 수 있습니다.");
                        }
                    })
                    .catch( console.warn );                    
            }}>로그인</Button>
        </div>

    );
}