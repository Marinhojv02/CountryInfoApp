'use client'

import { Center, ChakraProvider, Heading, Spinner, Box, Text, VStack, Image, Divider, Link as ChakraLink } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import PopulationChart from "./populationChart";

interface CountryInfo {
    country_name: string;
    borders: [{
        commonName: string,
        officialName: string,
        countryCode: string,
        region: string,
        borders: null
    }];
    population_data: [{year: number, value: number}];
    flag_url: string;
}

const CountryPage = ({ params }: { params: { id: string } }) => {
    const [country, setCountry] = useState<CountryInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/countries/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setCountry(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching country data:', error);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) {
        return (
            <ChakraProvider>
                <Center height="100vh">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
            </ChakraProvider>
        );
    }

    if (!country) {
        return (
            <ChakraProvider>
                <Center height="100vh">
                    <Text fontSize="2xl" color="red.500">Country data not found</Text>
                </Center>
            </ChakraProvider>
        );
    }

    return (
        <ChakraProvider>
            <Box p='4'>
                <VStack spacing={6}>
                    <Heading as="h1" size="xl" textAlign="center">
                        {country.country_name} - Country Info
                    </Heading>
                    <Image src={country.flag_url} alt={`${country.country_name} flag`} boxSize="200px" objectFit="cover" />

                    <Divider />
                    <Text fontSize="lg" fontWeight="bold">Borders:</Text>
                    {country.borders?.length ? (
                        <VStack spacing={2} align="stretch">
                            {country.borders.map((borderCountry: { countryCode: string; commonName: string }) => (
                                <ChakraLink key={borderCountry.countryCode} href={`/countries/${borderCountry.countryCode}`} p={2} borderWidth={1} borderRadius="md" _hover={{ textDecoration: 'underline', bg: 'gray.100' }}>
                                    country code: {borderCountry.countryCode} | country name: {borderCountry.commonName}
                                </ChakraLink>
                            ))}
                        </VStack>
                    ) : (
                        <Text>No bordering countries</Text>
                    )}
                    <Divider />
                    <PopulationChart data={country.population_data}></PopulationChart>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default CountryPage;
