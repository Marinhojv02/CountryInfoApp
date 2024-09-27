'use client'

import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    ListItem,
    UnorderedList,
    Text,
    Container,
    VStack,
    Heading,
    Center,
    Divider,
} from '@chakra-ui/react';

interface Country {
    countryCode: string;
    name: string;
}

const CountriesPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/countries`)
        .then((res) => res.json())
            .then((data: Country[]) => {
                setCountries(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching countries data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Center>
        );
    }

    if (!countries.length) {
        return (
            <Center height="100vh">
                <Text fontSize='2xl' color='red.500'>Country data not found</Text>
            </Center>
        );
    }

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={4}>
                <Heading as="h1" size="xl" textAlign="center">All Countries Page</Heading>
                <Divider />
                <UnorderedList spacing={3} width="100%">
                    {countries.map((country) => (
                        <ListItem key={country.countryCode}>
                            <Link href={`/countries/${country.countryCode}`}>
                                <Text fontSize='lg' color='blue.600' _hover={{ textDecoration: 'underline' }}>
                                    country code: {country.countryCode} | country name: {country.name}
                                </Text>
                            </Link>
                        </ListItem>
                    ))}
                </UnorderedList>
            </VStack>
        </Container>
    );
}

export default CountriesPage;
