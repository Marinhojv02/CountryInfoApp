import CountriesPage from "./countries/page";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <CountriesPage></CountriesPage>
    </ChakraProvider>
  );
}
