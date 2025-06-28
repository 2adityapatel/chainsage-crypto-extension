import React from "react";
import { HStack, Select, Image, Text } from "@chakra-ui/react";

const TOKENS = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIa3GDAlj9jCzDOu-MBV7_NRhZ4VlzN-i8pg&s",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxo7e_boMAxnsdr58vrfq9BzFTtlAT2Xb51v9TUmsOqooFCnpVY2z1Tk-DxJp4vudKkI&usqp=CAU",
  },
  // Add more tokens here
];

const TokenSelector = ({ selected, onChange }) => (
  <HStack spacing={3} justify="center">
    <Select
      value={selected}
      onChange={e => onChange(e.target.value)}
      maxW="180px"
      bg="gray.700"
      color="blue.200"
      borderColor="blue.500"
      fontWeight="bold"
      iconColor="blue.300"
    >
      {TOKENS.map(token => (
        <option key={token.symbol} value={token.symbol}>
          {token.name} ({token.symbol})
        </option>
      ))}
    </Select>
    {TOKENS.filter(t => t.symbol === selected).map(token => (
      <HStack key={token.symbol} spacing={1}>
        <Image src={token.icon} alt={token.symbol} boxSize="24px" borderRadius="full" />
        <Text color="blue.200" fontWeight="bold">{token.symbol}</Text>
      </HStack>
    ))}
  </HStack>
);

export default TokenSelector; 