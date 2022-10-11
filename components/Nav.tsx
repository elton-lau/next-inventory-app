import { ThemeContext } from "@emotion/react";
import {
  MantineNumberSize,
  ActionIcon,
  Box,
  Navbar,
  ScrollArea,
  useMantineColorScheme,
  Title,
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  useMantineTheme,
  Avatar
} from "@mantine/core";
import { NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoArchive } from "react-icons/go";
import { ImSun, ImIcoMoon } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { TbClipboardList } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { useUser } from "@supabase/auth-helpers-react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useHover } from "@mantine/hooks";
MdKeyboardArrowLeft

const Brand = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group align="center" position="apart">
        <Group>
          <ThemeIcon
            size="lg"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            radius="lg"
          >
            <GoArchive size={18} />
          </ThemeIcon>
          <Title size={"1.2rem"} weight={400} sx={{ fontStyle: "italic" }}>
            Inventory
          </Title>
        </Group>

        {/* Dark - Light Mode */}
        <ActionIcon
          variant="default"
          onClick={() => {
            toggleColorScheme();
          }}
          size={30}
        >
          {colorScheme === "dark" ? <ImSun /> : <ImIcoMoon />}
        </ActionIcon>
      </Group>
    </Box>
  );
};

export interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  pageLink: string;
}

const mainLinks: MainLinkProps[] = [
  {
    icon: <AiOutlineHome size={18} />,
    color: "blue",
    label: "home",
    pageLink: "/",
  },
  {
    icon: <BiCategory size={18} />,
    color: "teal",
    label: "Category",
    pageLink: "/categories",
  },
  {
    icon: <BsBox size={16} />,
    color: "teal",
    label: "Inventory",
    pageLink: "/inventory",
  },
  {
    icon: <TbClipboardList size={20} />,
    color: "grape",
    label: "Products",
    pageLink: "/products",
  },
  {
    icon: <FiSettings size={16} />,
    color: "orange",
    label: "Settings",
    pageLink: "/settings",
  },
];



const getWordInitals = (word:string) => {
  const bits = word.trim().split(' ');
  return bits.map(bit => bit.charAt(0)).join('').toUpperCase()
}

const User = () => {
  const theme = useMantineTheme();
  const { pathname } = useRouter();
  const { user, error } = useUser();

  // console.log(user?.user_metadata?.name)

  return (
    <Link passHref href={pathname === "settings" ? "/" : "/settings"}>
      <Box
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <UnstyledButton
          sx={{
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            "&:hover": {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
            }
          }}
        >
          <Group>
            <Avatar radius='xl' color='blue' variant='light' src={user?.user_metadata?.avatar_url}>
              {`${getWordInitals(user?.user_metadata?.name ?? "")}`}
            </Avatar>
            <Box sx={{flex: 1}}>
              <Text size="sm" weight={500}>
                {user?.user_metadata?.name}
              </Text>
              <Text color="dimmed" size="xs">{user?.user_metadata?.email}</Text>
            </Box>
            
            {pathname === '/settings' ? (
              <MdKeyboardArrowLeft size={18} /> 
            ) : (
              <MdKeyboardArrowRight size={18} /> 

            )}
          </Group>
        </UnstyledButton>
      </Box>
    </Link>
  );
};

const Nav = ({
  opened,
  hiddenBreakpoint,
  setOpened
}: {
  opened: boolean;
  hiddenBreakpoint: MantineNumberSize;
  setOpened: (value: boolean) => void;
}) => {

  const MainLink = ({ icon, color, label, pageLink }: MainLinkProps) => {
    const router = useRouter();
    const { hovered, ref } = useHover();

    return (
      <Link href={pageLink} passHref>
        <UnstyledButton
          onClick={() => setOpened(false)}
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.spacing.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            backgroundColor:
              router.pathname === pageLink
                ? theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0]
                : "transparent",
            "&: hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon color={color} variant={"light"}>
              {icon}
            </ThemeIcon>
            <Text size="sm">{label}</Text>
          </Group>
        </UnstyledButton>
      </Link>
    );
  };

  return (
    <Navbar
      p="xs"
      width={{ sm: 300 }}
      hiddenBreakpoint={hiddenBreakpoint}
      hidden={!opened}
    >
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        {mainLinks.map((link) => {
          return (
            <MainLink
              icon={link.icon}
              color={link.color}
              label={link.label}
              pageLink={link.pageLink}
              key={link.label}
            />
          );
        })}
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
