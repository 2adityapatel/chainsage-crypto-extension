import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, VStack, Text, HStack, useToast, Spinner } from "@chakra-ui/react";

const MAX_INPUT_LENGTH = 100;
const MAX_RESPONSE_LENGTH = 180; // ~2-3 sentences

const SUGGESTIONS = [
  "Should we invest in BTC?",
  "What is BTC",
  "Tell me about cryptocurrency."
];

const SYSTEM_INSTRUCTION =
  "You are Eliza, a crypto-savvy assistant. Only answer questions about cryptocurrencies, prices, alerts, and related topics. Be concise, friendly, and never answer unrelated questions.";

const BACKEND_URL = "http://localhost:3001/api/gemini-chat";

const CryptoElizaChat = () => {
  const [messages, setMessages] = useState([
    { from: "eliza", text: "Hi, I'm Eliza, your crypto price analyzer and guide! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (input.length > MAX_INPUT_LENGTH) {
      toast({ title: "Input too long", status: "warning", duration: 2000 });
      return;
    }
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      console.log("[Frontend] Sending prompt:", input);
      
      const requestBody = {
        prompt: input,
        systemInstruction: SYSTEM_INSTRUCTION,
      };
      console.log("[Frontend] Request body:", requestBody);
      
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      console.log("[Frontend] Response status:", res.status);
      console.log("[Frontend] Response ok:", res.ok);
      
      const data = await res.json();
      console.log("[Gemini API] Raw backend response:", data);
      
      if (!res.ok) {
        console.error("[Frontend] Backend error:", data);
        throw new Error(`Backend error: ${data.error || 'Unknown error'}`);
      }
      
      let response = data.text || "(No response)";
      if (!data.text) {
        console.warn("[Gemini API] No 'text' field in response:", data);
      }
      if (response.length > MAX_RESPONSE_LENGTH) {
        response = response.slice(0, MAX_RESPONSE_LENGTH) + "...";
      }
      setMessages((msgs) => [...msgs, { from: "eliza", text: response }]);
    } catch (error) {
      console.error("[Gemini API] Fetch error:", error);
      setMessages((msgs) => [...msgs, { from: "eliza", text: "Sorry, I couldn't reach Gemini right now." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <VStack align="stretch" spacing={3} h="350px" maxH="350px" width="100%" maxWidth="100%">
      <Box
        flex={1}
        overflowY="auto"
        bg="gray.900"
        p={3}
        borderRadius="md"
        border="1px solid"
        borderColor="blue.700"
        minH="220px"
        maxH="220px"
      >
        {messages.map((msg, idx) => (
          <Box key={idx} textAlign={msg.from === "user" ? "right" : "left"} mb={2}>
            <Text
              display="inline-block"
              px={3}
              py={2}
              borderRadius="lg"
              bg={msg.from === "user" ? "blue.700" : "gray.700"}
              color={msg.from === "user" ? "white" : "blue.200"}
              fontSize="sm"
              maxW="80%"
              wordBreak="break-word"
            >
              {msg.text}
            </Text>
          </Box>
        ))}
        {loading && (
          <Box textAlign="left" mb={2}>
            <Spinner size="sm" color="blue.400" mr={2} />
            <Text as="span" color="blue.200" fontSize="sm">Eliza is thinking...</Text>
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>
      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
          onKeyDown={handleInputKeyDown}
          placeholder="Ask about crypto prices, alerts..."
          maxLength={MAX_INPUT_LENGTH}
          bg="gray.800"
          color="white"
          isDisabled={loading}
        />
        <Button colorScheme="blue" onClick={handleSend} isDisabled={!input.trim() || loading}>
          Send
        </Button>
      </HStack>
      <HStack spacing={2} mt={1} flexWrap="wrap" width="100%" maxWidth="100%" justifyContent="flex-start" height="32px">
        {SUGGESTIONS.map((s, i) => (
          <Button
            key={i}
            size="xs"
            variant="solid"
            bg="gray.700"
            color="blue.200"
            border="1px solid"
            borderColor="blue.700"
            _hover={{ bg: "blue.800", color: "white", borderColor: "blue.400" }}
            _active={{ bg: "blue.900", color: "white", borderColor: "blue.500" }}
            onClick={() => setInput(s)}
            borderRadius="md"
            px={3}
            py={1}
            transition="all 0.15s"
            whiteSpace="nowrap"
            isDisabled={loading}
          >
            {s}
          </Button>
        ))}
      </HStack>
      <Text fontSize="xs" color="gray.400" textAlign="right">
        {input.length}/{MAX_INPUT_LENGTH} characters
      </Text>
    </VStack>
  );
};

export default CryptoElizaChat; 