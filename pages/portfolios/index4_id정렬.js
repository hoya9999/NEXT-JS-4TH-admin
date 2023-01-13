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
                setPortfolios(snapshot.docs.map(doc => doc.data()));   //json Data 추출
            });
    }, [])
    return (
        <BaseLayout>
            <ul>
                {portfolios.map(items => {
                    console.log(items);
                    return (
                        <li key={items.created_at}>{items.subject}</li>
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