import type { NextPage } from "next";
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const Home: NextPage = () => {
  return <div>Welcome back</div>;
};

export default Home;
export const getServerSideProps = withPageAuth({ redirectTo: '/auth/signin' })