import React from 'react'

import {Popover,
PopoverTrigger,
Button,
PopoverContent,
PopoverHeader,
PopoverArrow,
PopoverCloseButton,
PopoverBody,
Tooltip,
Center} from '@chakra-ui/react'


import { RiMailSendLine } from 'react-icons/ri'

const ConfirmPopper = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <Tooltip label="Send to Friends">
          <Button variant="ghost">
            <RiMailSendLine />
          </Button>
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent bg={"brand.800"}>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to send this track?
            <Center>
              <Button colorScheme="green">Yeah!</Button>
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
}

export default ConfirmPopper