import {
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';

export function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      mt="12"
      borderTop={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Stack
        px={{
          base: '2',
          md: '4',
        }}
      >
        <Stack
          direction="row"
          spacing="2"
          align="center"
          justify="space-between"
        >
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton
              as="a"
              target="_blank"
              href="https://github.com/fredmaiaarantes/simpletasks"
              aria-label="GitHub"
              icon={<FaGithub fontSize="20px" />}
            />
            <IconButton
              as="a"
              target="_blank"
              href="https://twitter.com/fredmaiaarantes"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="20px" />}
            />
            <IconButton
              as="a"
              target="_blank"
              href="https://linkedin.com/in/fredmaiaarantes"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="20px" />}
            />
          </ButtonGroup>
        </Stack>
        <Text
          fontSize="xs"
          alignSelf={{
            base: 'center',
            sm: 'start',
          }}
        >
          &copy; {new Date().getFullYear()} Charm (Chakra-UI, React,{' '}
          <a href="https://meteor.com" target="_blank">
            Meteor.js
          </a>
          ) by{' '}
          <a href="https://twitter.com/fredmaiaarantes" target="_blank">
            @fredmaiaarantes
          </a>
          .
        </Text>
        <Text
            fontSize="xs"
            alignSelf={{
              base: 'center',
              sm: 'start',
            }}
        >
          <a href="https://webpack.js.org" target="_blank">
            Vite
          </a>
          {' '}by{' '}
          <a href="https://twitter.com/nachocodoner" target="_blank">
            @nachocodoner
          </a>
          .
        </Text>
      </Stack>
    </Box>
  );
}
