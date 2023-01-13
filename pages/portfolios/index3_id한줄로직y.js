import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import BaseLayout from "../../components/containers/BaseLayout";
import firebaseApp from "../../net/firebaseApp";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default function PortfolioList() {
    const [portfolios, setPortfolios] = useState([]);
    useEffect(() => {
        const firestore = getFirestore(firebaseApp);
        const portfolios = collection( firestore, 'portfolios' ); //.orderBy('created_at', 'desc');
        getDocs(portfolios)
            .then(snapshot => {
                // setPortfolios(snapshot.docs.map(doc => doc.data()));   //json Data 추출, id값은 가지고 오지 않음
                setPortfolios(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})
                ))});   //collection 문서 id값 가져오기
        }, []);
    return (
        <BaseLayout>
            <ul>
                {portfolios.map(items => {
                    console.log(items);
                    return (
                        <li key={items.id}>{items.content}</li>
                    );
                })}
            </ul>

            <div className="flex flex-row justify-end">
                <Link href="/portfolios/create">
                    <Button>추가</Button>
                </Link>
            </div>
        </BaseLayout>
    )
}