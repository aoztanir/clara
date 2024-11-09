import Image from 'next/image';
import { Flex, Text, useComputedColorScheme } from '@mantine/core';

export default function Logo({
  width = 30,
  height = 30,
  nameIncluded = true,
}: {
  width?: number;
  height?: number;
  nameIncluded?: boolean;
}) {
  const computedColorScheme = useComputedColorScheme();
  return (
    <Flex align="center" gap="3" justify="center">
      <Image
        width={width}
        height={height}
        src={computedColorScheme == 'light' ? '/dark_logo.png' : '/light_logo.png'}
      ></Image>
      {nameIncluded ? (
        <Text fw="900" className="artsy-text" fz="xl">
          laro
        </Text>
      ) : (
        <></>
      )}
    </Flex>
  );
}
