import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Heading, VStack, Divider, Flex, Image, useColorMode, Button, HStack } from "@chakra-ui/react";
// Placeholder imports for components to be created
// import TokenSelector from "../components/TokenSelector";
// import PriceDisplay from "../components/PriceDisplay";
// import AlertForm from "../components/AlertForm";
// import AlertList from "../components/AlertList";
import logoUrl from "../../public/icons/icon128.png";
import TokenSelector from "./TokenSelector";
import PriceDisplay from "./PriceDisplay";
import AlertForm from "./AlertForm";
import AlertList from "./AlertList";
// Placeholder for the new chat component
import CryptoElizaChat from "./CryptoElizaChat";

const Popup = () => {
  // Optional: allow toggling color mode for dev
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState("alerts"); // 'alerts' or 'chat'

  const handleAddAlert = (alert) => setAlerts((prev) => [...prev, alert]);
  const handleRemoveAlert = (idx) => setAlerts((prev) => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.id // Only true in extension context
    ) {
      chrome.runtime.sendMessage({ type: "UPDATE_ALERTS", alerts });
    }
  }, [alerts]);
  
  return (
    <ChakraProvider>
      <Box minW="370px" maxW="410px" minH="520px" bgGradient="linear(to-br, #232526, #0f2027)" boxShadow="2xl" p={0}>
        <Flex align="center" justify="space-between" px={5} pt={5} pb={2}>
          <Flex align="center" gap={2}>
            <Image src={logoUrl} alt="Chainlink Logo" boxSize="40px" borderRadius="full" bg="transparent" p={1} />
            <Heading size="md" color="blue.300" fontWeight="bold" letterSpacing={1}>
              Chainsage
            </Heading>
          </Flex>
          {/* <Button size="sm" onClick={toggleColorMode} variant="ghost">{colorMode === 'light' ? '🌙' : '☀️'}</Button> */}
        </Flex>
        {/* Tab Bar */}
        <HStack spacing={0} borderBottom="2px" borderColor="blue.900" mb={2}>
          <Button
            flex={1}
            variant={activeTab === "alerts" ? "solid" : "ghost"}
            colorScheme={activeTab === "alerts" ? "blue" : "whiteAlpha"}
            borderRadius={activeTab === "alerts" ? "12px 12px 0 0" : "12px 12px 0 0"}
            borderBottom={activeTab === "alerts" ? "2px solid #3182ce" : "none"}
            bg={activeTab === "alerts" ? "blue.700" : "whiteAlpha.200"}
            color={activeTab === "alerts" ? "white" : "blue.200"}
            transition="all 0.2s"
            _hover={{ bg: activeTab === "alerts" ? "blue.800" : "whiteAlpha.300" }}
            _active={{ bg: "blue.800" }}
            onClick={() => setActiveTab("alerts")}
            size="sm"
            fontWeight="bold"
            fontSize="md"
            boxShadow={activeTab === "alerts" ? "md" : "none"}
            zIndex={activeTab === "alerts" ? 1 : 0}
          >
            Alerts
          </Button>
          <Button
            flex={1}
            variant={activeTab === "chat" ? "solid" : "ghost"}
            colorScheme={activeTab === "chat" ? "blue" : "whiteAlpha"}
            borderRadius={activeTab === "chat" ? "12px 12px 0 0" : "12px 12px 0 0"}
            borderBottom={activeTab === "chat" ? "2px solid #3182ce" : "none"}
            bg={activeTab === "chat" ? "blue.700" : "whiteAlpha.200"}
            color={activeTab === "chat" ? "white" : "blue.200"}
            transition="all 0.2s"
            _hover={{ bg: activeTab === "chat" ? "blue.800" : "whiteAlpha.300" }}
            _active={{ bg: "blue.800" }}
            onClick={() => setActiveTab("chat")}
            size="sm"
            fontWeight="bold"
            fontSize="md"
            boxShadow={activeTab === "chat" ? "md" : "none"}
            zIndex={activeTab === "chat" ? 1 : 0}
          >
            Chat with AI
          </Button>
        </HStack>
        {/* Tab Content */}
        {activeTab === "alerts" ? (
          <VStack spacing={4} align="stretch" px={5} pb={5}>
            {/* <TokenSelector /> */}
            <Box bg="gray.800" color="gray.100" p={3} borderRadius="lg" textAlign="center" border="1px" borderColor="blue.700">
              <TokenSelector selected={selectedToken} onChange={setSelectedToken} />
            </Box>
            <Divider borderColor="blue.900" />
            {/* <PriceDisplay /> */}
            <Box bg="gray.900" color="blue.200" p={3} borderRadius="lg" textAlign="center" border="1px" borderColor="blue.700">
              <PriceDisplay token={selectedToken} />
            </Box>
            <Divider borderColor="blue.900" />
            {/* <AlertForm /> */}
            <Box bg="gray.800" color="gray.100" p={3} borderRadius="lg" textAlign="center" border="1px" borderColor="blue.700">
              <AlertForm token={selectedToken} onAddAlert={handleAddAlert} />
            </Box>
            <Divider borderColor="blue.900" />
            {/* <AlertList /> */}
            <Box bg="gray.900" color="blue.200" p={3} borderRadius="lg" textAlign="center" border="1px" borderColor="blue.700">
              <AlertList alerts={alerts} onRemove={handleRemoveAlert} />
            </Box>
          </VStack>
        ) : (
          <Box px={5} py={5}>
            <CryptoElizaChat />
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Popup; 