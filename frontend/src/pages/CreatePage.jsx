import { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Image,
    Heading,
    useToast,
    useColorModeValue,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const toast = useToast();
    const { createProduct } = useProductStore();
    const newProduct = {
        name: productName,
        price: price,
        image: imageUrl,
    };

    // Use dynamic colors for light and dark modes
    const formBg = useColorModeValue("white", "gray.700");
    const inputBg = useColorModeValue("gray.100", "gray.600");
    const headingColor = useColorModeValue("teal.500", "teal.300");
    const labelColor = useColorModeValue("black", "white");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !price || !imageUrl) {
            toast({
                title: "Error!",
                description: "All fields are required.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // save the product
        const result = await createProduct(newProduct);

        if (!result.success) {
            toast({
              title: "Error!",
              description: result.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            })
        } else {
            toast({
              title: "success",
              description: result.message,
              status: "success",
              duration: 3000,
              isClosable: true,
            })
            // Reset form
            setProductName("");
            setPrice("");
            setImageUrl("");
        }
    };

    return (
        <Box
            maxW="md"
            mx="auto"
            mt="8"
            p="6"
            boxShadow="lg"
            borderRadius="md"
            bg={formBg} // Form background adjusts to color mode
        >
            <Heading
                textAlign="center"
                mb="6"
                size="lg"
                color={headingColor} // Dynamic heading color
            >
                Create New Product
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing="4">
                    <FormControl id="productName" isRequired>
                        <FormLabel color={labelColor}>Product Name</FormLabel>
                        <Input
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            bg={inputBg} // Input background adapts to color mode
                        />
                    </FormControl>

                    <FormControl id="price" isRequired>
                        <FormLabel color={labelColor}>Price</FormLabel>
                        <Input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            bg={inputBg}
                        />
                    </FormControl>

                    <FormControl id="imageUrl" isRequired>
                        <FormLabel color={labelColor}>Image URL</FormLabel>
                        <Input
                            type="url"
                            placeholder="Enter image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            bg={inputBg}
                        />
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt="Product Preview"
                                boxSize="100px"
                                mt="3"
                                borderRadius="md"
                                objectFit="cover"
                            />
                        )}
                    </FormControl>

                    <Button type="submit" colorScheme="teal" width="full">
                        Create Product
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default CreatePage;
