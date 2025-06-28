import React from "react";
import { Box, HStack, Text, IconButton, Tag } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const directionColor = {
  above: "green",
  below: "red",
};

const AlertList = ({ alerts, onRemove }) => (
  <Box>
    {alerts.length === 0 ? (
      <Text color="gray.400" textAlign="center">No alerts set.</Text>
    ) : (
      alerts.map((alert, idx) => (
        <HStack key={idx} spacing={3} mb={2} justify="space-between" bg="gray.700" p={2} borderRadius="md">
          <Tag colorScheme="blue" fontWeight="bold">{alert.token}</Tag>
          <Tag colorScheme={directionColor[alert.direction]}>{alert.direction.toUpperCase()}</Tag>
          <Text color="blue.200" fontWeight="bold">${alert.price}</Text>
          <IconButton
            icon={<CloseIcon />}
            size="xs"
            colorScheme="red"
            variant="ghost"
            aria-label="Remove alert"
            onClick={() => onRemove(idx)}
          />
        </HStack>
      ))
    )}
  </Box>
);

export default AlertList; 