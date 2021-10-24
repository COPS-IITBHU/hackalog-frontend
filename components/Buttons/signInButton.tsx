import { FcGoogle } from "react-icons/fc"
import { Div, Text } from "atomize"

export default function SignInButton() {
    return (
        <>
            <Div
                d="flex"
                border="1px solid"
                borderColor="#4285F4"
                rounded="sm"
                shadow="2"
                hoverShadow="4"
                cursor="pointer"
            >
                <Div m={{ x: "0.7rem", y: "auto" }}>
                    <FcGoogle />
                </Div>
                <Text bg="#4285F4" p="0.45rem" textColor="#fff">
                    Sign in
                </Text>
            </Div>
        </>
    )
}
