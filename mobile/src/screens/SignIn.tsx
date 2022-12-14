import { Center, Text, Icon } from "native-base";
import { Button } from "../components/Button";
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from "../hooks/useAuth";
import Logo from '../assets/logo.svg';

export function SignIn() {
    const { signIn } = useAuth();

    return (
        <Center
            flex={1}
            bgColor="gray.900"
            p={7}
        >
            <Logo
                width={212}
                height={40}
            />

            <Button
                title="ENTRAR COM O GOOGLE"
                type="SECONDARY"
                leftIcon={<Icon
                    as={Fontisto}
                    name="google"
                    color="white"
                    size="md"
                />}
                mt={12}
                onPress={signIn}
            />

            <Text
                color="white"
                textAlign="center"
                mt={4}
            >
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação da sua conta
            </Text>
        </Center>
    )
}