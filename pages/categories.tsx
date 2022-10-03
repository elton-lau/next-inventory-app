import { NextPage } from 'next';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

interface categoriesProps {}

const categories: NextPage = ({}) => {
    return <></>;
}
export default categories;
export const getServerSideProps = withPageAuth({ redirectTo: '/auth/signin' })