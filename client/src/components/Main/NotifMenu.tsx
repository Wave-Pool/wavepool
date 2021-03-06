import React, { useContext } from 'react';
import {
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  IconButton,
  useColorModeValue,
  Stack,
  Flex,
  Link,
  useDisclosure,
  Image,
  Text,
  Spacer,
  Badge,
} from '@chakra-ui/react';
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';
import { gql, useMutation } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { BiBell } from 'react-icons/bi';
import NotifModal from './NotifModal';

const REMOVE_NOTIFICATION = gql`
  mutation RemoveNotificationMutation(
    $removeNotificationData: RemoveNotificationInput!
  ) {
    removeNotification(data: $removeNotificationData)
  }
`;

const NotifMenu = (props: any) => {
  const { isLoggedIn, userObj, refetch }: any = useContext(UserContext);
  const [removeNotification] = useMutation(REMOVE_NOTIFICATION);
  const bg = useColorModeValue('brand.100', 'brand.800');
  const { onOpen, onClose } = useDisclosure();
  const notifArray = [...userObj.notifications];
  const list = notifArray
    .sort((a: any, b: any) => {
      return (
        new Date(b.timestampp).getTime() - new Date(a.timestampp).getTime()
      );
    })
    .filter((e: any) => {
      return e.viewed === false;
    })
    .map((e: any, i: number) => {
      return (
        <MenuItem
          key={i}
          closeOnSelect={false}
          onClick={() => {
            removeNotification({
              variables: {
                removeNotificationData: {
                  timestampp: e.timestampp,
                  user_id: e.user_id,
                },
              },
            });
            setTimeout(() => refetch(), 500);
          }}
        >
          <Image
            boxSize='2rem'
            borderRadius='full'
            src={e.photo}
            alt='friend profile picture'
            mr='12px'
          />
          <Stack
            key={i}
            mt={4}
            mb={4}
            borderRadius={'2vh'}
          >
            <Text fontSize='md' maxW={{ base: '300px', md: '400px' }}>
              {e.message}{' '}
            </Text>
            <Spacer />
            <Text as='i' fontSize='xs'>
              {moment(new Date(e.timestampp)).fromNow()}
            </Text>
          </Stack>
          <CloseIcon boxSize="10px" _hover={{bg}}/>
        </MenuItem>
      );
    });

  return (
    <Menu>
      <Badge
        variant='solid'
        colorScheme='red'
        position='absolute'
        mb={8}
        ml={8}
      >
        {notifArray
          .filter((e: any) => {
            return e.viewed === false;
          })
          .length.toString()}
      </Badge>
      <MenuButton
        m={4}
        as={IconButton}
        aria-label='Options'
        icon={<BiBell />}
        variant='ghost'
        onClick={onOpen}
      />
      <MenuList
        bg={useColorModeValue('brand.50', 'brand.900')}
        zIndex={2}
        maxW='350px'
      >
        <MenuGroup>
          <Flex justifyContent='space-between'>
            <Link m={4} onClick={onClose}>
              Notifications
            </Link>
            <Flex>
              <MenuItem onClick={onClose}>
                <CloseIcon boxSize="14px"/>
              </MenuItem>
            </Flex>
          </Flex>
          <MenuDivider />
          {isLoggedIn && <chakra.div>{list.slice(0, 5)}</chakra.div>}

          {isLoggedIn && userObj.notifications.length >= 0 && (
            <NotifModal notifs={userObj.notifications} />
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
export default NotifMenu;
