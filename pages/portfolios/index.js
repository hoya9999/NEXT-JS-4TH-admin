import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import BaseLayout from "../../components/containers/BaseLayout";
import firebaseApp from "../../net/firebaseApp";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { DateTime } from "luxon";

function Item({ portfolio }) {
    return (
        <li className="flex flex-row items-center py-2 border-b">
            <div className="flex w-16 justify-center">
                <img src={portfolio.thumbnail} className="max-w-16 max-h-16" />
            </div>
            <div className="flex-1 mx-2">
                <Link href={`/portfolios/${portfolio.id}`}>
                    {portfolio.subject}
                </Link>
            </div>
            <div>
                {/* {JSON.stringify(portfolio.created_at)} */}
                {/* {portfolio.created_at.seconds} */}
                {DateTime.fromSeconds(portfolio.created_at.seconds).toFormat('yyyy-LL-dd')}
            </div>
        </li>
    )
}

export default function PortfolioList() {
    const [portfolios, setPortfolios] = useState([]);
    useEffect(() => {
        const firestore = getFirestore(firebaseApp);
        const portfolios = collection( firestore, 'portfolios' ); //.orderBy('created_at', 'desc');
        getDocs(portfolios)
            .then(snapshot => {
                // setPortfolios(snapshot.docs.map(doc => doc.data()));   //json Data 추출, id값은 가지고 오지 않음
                const json = JSON.stringify(snapshot.docs);
                const obj = JSON.parse(json);
                console.log(`json: ${json}`);
                console.log(`obj: ${obj[0]._firestore.app._isDeleted}`);
                setPortfolios(
                    snapshot.docs
                        .map(doc => ({id: doc.id, ...doc.data()}))
                        .sort((x, y) => y.created_at.seconds - x.created_at.seconds)    
                        //asc: x.created_at.seconds - y.created_at.seconds, desc(최근등록순): y.created_at.seconds - x.created_at.seconds
                    )});   //collection 문서 id값 가져오기
        }, []);
    return (
        <BaseLayout>
            <ul>
                {portfolios.map(portfolio => (<Item key={portfolio.id} portfolio={portfolio} />))}
            </ul>

            <div className="flex flex-row justify-end">
                <Link href="/portfolios/create">
                    <Button>추가</Button>
                </Link>
            </div>
        </BaseLayout>
    )
}