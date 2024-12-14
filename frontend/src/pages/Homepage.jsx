import { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  Grid,
  GridItem,
  Button,
  useColorModeValue,
  Heading,
  Input,
  useToast,
  HStack,
} from "@chakra-ui/react";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "whiteAlpha.900");
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const shadow = useColorModeValue("md", "lg");

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle Delete Product
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product._id !== id)); // Remove from UI
      toast({
        title: "Product Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle Update Product
  const updateProduct = async (id) => {
    try {
      const updatedProduct = { name: newName, price: newPrice };
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, ...data.data } : product
        )
      );
      setEditingProduct(null); // Close editing mode
      toast({
        title: "Product Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating product:", error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" p={6} bg={bgColor} color={textColor}>
      <Heading
        fontSize={{ base: "22px", sm: "28px" }}
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        bgClip="text"
        bgGradient="linear(to-r, red.400, blue.500)"
        mb={6}
      >
        Explore Our Products
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {products.map((product) => (
          <GridItem key={product._id}>
            <Box
              bg={cardBg}
              p={4}
              borderRadius="md"
              boxShadow={shadow}
              position="relative"
            >
              <Image
                src={product.image}
                alt={product.name}
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />

              <VStack align="start" spacing={2}>
                {editingProduct === product._id ? (
                  <>
                    <Input
                      placeholder="New Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <Input
                      placeholder="New Price"
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <Button
                      colorScheme="teal"
                      onClick={() => updateProduct(product._id)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Text fontWeight="bold" fontSize="lg">
                      {product.name}
                    </Text>
                    <Text fontSize="md" color="teal.400">
                      ${product.price}
                    </Text>
                  </>
                )}

                <HStack spacing={2} mt={4}>
                  <Button
                    colorScheme="yellow"
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product._id);
                      setNewName(product.name);
                      setNewPrice(product.price);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Homepage;
