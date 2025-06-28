import React from "react";
import { Box, Spinner, Text, HStack, Icon } from "@chakra-ui/react";
import { FaEthereum, FaBitcoin, FaLink } from "react-icons/fa";
import useChainlinkPriceFeed from "../web3/useChainlinkPriceFeed";

const tokenIcons = {
  ETH: <Icon as={FaEthereum} color="blue.300" boxSize={6} />, 
  BTC: <Icon as={FaBitcoin} color="orange.300" boxSize={6} />, 
  LINK: <Icon as={FaLink} color="blue.400" boxSize={6} />,
};

const PriceDisplay = ({ token }) => {
  const { price, loading, error } = useChainlinkPriceFeed(token);

  return (
    <Box textAlign="center">
      <HStack justify="center" mb={2}>
        {tokenIcons[token]}
        <Text fontWeight="bold" color="blue.200" fontSize="lg">{token}/USD</Text>
      </HStack>
      {loading && <Spinner color="blue.300" />}
      {error && <Text color="red.300">{error}</Text>}
      {price && !loading && !error && (
        <Text fontSize="2xl" color="green.300" fontWeight="bold">
          ${price}
        </Text>
      )}
    </Box>
  );
};

export default PriceDisplay; 