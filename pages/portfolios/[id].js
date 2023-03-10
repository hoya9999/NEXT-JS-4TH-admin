import { async } from "@firebase/util";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import PortfolioForm from "../../components/views/PortfolioForm";
import firebaseApp from "../../net/firebaseApp";

export default function Page({ id, portfolio }) {
    return <PortfolioForm id= { id } portfolio={ portfolio } />
}

export const getServerSideProps = async ({params}) => {
    const { id } = params;
    const firestore = getFirestore(firebaseApp);
    // const portfolios = collection(firestore, 'portfolios');
    const docRef = doc(firestore, 'portfolios', id );
    const portfolio = await getDoc(docRef);
    const data = portfolio.data();
    delete data.created_at;
    delete data.updated_at;
    return( {
        props: {
            id,
            portfolio : {
                ...data,
                id: portfolio.id,
            }
        }
    });
}