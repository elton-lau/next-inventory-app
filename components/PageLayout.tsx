import { NextComponentType } from "next";
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import Nav from './Nav'

interface PageLayoutProps {}

const PageLayout = ({ children }: any) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useToggle();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[7],
        },
      }}
      navbarOffsetBreakpoint='sm'
      navbar={<Nav opened={opened} hiddenBreakpoint='sm' setOpened={setOpened} />}
      header={
        <Header height={70} p='md'>
          <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            {/* sm = 768px */}
            <MediaQuery largerThan="sm" styles={{display: 'none'}}>
              <Burger opened={opened} onClick={() => setOpened()} size='md' color={theme.colors.gray[6]} mr='xl'  />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
export default PageLayout;
