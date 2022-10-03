import { FC } from 'react';
import { FaGoogle } from 'react-icons/fa';
import {Center, Button, Title, Stack, Text, Group} from '@mantine/core';
import { supabase } from '../../utils/supabaseClient';
import { authProtected } from '../../components/AuthProtected';


interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {

  async function signInWithGoogle(event: any) {
    event.preventDefault();
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })
  }

    return (
      <>
        <Center sx={{width: '100vw', height: '100vh'}}>
          <Stack spacing="xl">
            <Title align="center">Welcome To Inventory App ✋</Title>
            <Button onClick={signInWithGoogle} size="lg" sx={{alignSelf: 'center'}}>
              <Group>
                <Text size="md">Sign in With Google</Text>
                <FaGoogle />
              </Group>
            </Button>
          </Stack>
        </Center>
      </>
    );
}
export default SignIn;