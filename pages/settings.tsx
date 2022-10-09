import { NextPage } from 'next';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';


const settings: NextPage = ({}) => {
    return (<></>);
}
export default settings;
export const getServerSideProps = withPageAuth({ redirectTo: '/auth/signin' })