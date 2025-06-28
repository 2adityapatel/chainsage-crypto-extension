import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
  Stack,
  HStack,
} from "@chakra-ui/react";

const AlertForm = ({ token, onAddAlert }) => {
  const [direction, setDirection] = useState("above");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Enter a valid price");
      return;
    }
    onAddAlert({ token, direction, price: priceNum });
    setPrice("");
    setDirection("above");
    toast({
      title: `Alert set for ${token} ${direction} $${priceNum}`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <Stack direction="column" spacing={3} mb={2} align="stretch" w="100%">
        <RadioGroup value={direction} onChange={setDirection} colorScheme="blue">
          <HStack spacing={2}>
            <Radio value="above">Above</Radio>
            <Radio value="below">Below</Radio>
          </HStack>
        </RadioGroup>
        <Input
          type="number"
          placeholder="Price (USD)"
          value={price}
          onChange={e => setPrice(e.target.value)}
          w="100%"
          bg="gray.700"
          color="blue.200"
          borderColor="blue.500"
          _placeholder={{ color: "gray.400" }}
        />
        <Button
          type="submit"
          colorScheme="blue"
          variant="solid"
          size="sm"
          px={4}
          w="100%"
        >
          Set Alert
        </Button>
      </Stack>
      {error && <Text color="red.300" fontSize="sm" textAlign="center">{error}</Text>}
    </Box>
  );
};

export default AlertForm; 