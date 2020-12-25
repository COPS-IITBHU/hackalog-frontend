/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Row, Text, Button, Icon } from "atomize"
import copy from "copy-to-clipboard"

const Clipboard = (props) => {
    const copyClipboard = () => {
        copy(props.code)
        props.notify()
    }
    return (
        <Row m={{ x: "1.2rem" }} align="center">
            <Text
                tag="h4"
                textSize="title"
                textColor={props.titleColor || "#003e54"}
                fontFamily="madetommy-regular"
                m={{ r: "1rem" }}
            >
                Team Code:
            </Text>
            <Text
                tag="h4"
                textSize="title"
                textColor={props.codeColor || "gray800"}
                fontFamily="madetommy-regular"
                textDecor="underline"
                m={{ r: "1rem" }}
            >
                {props.code}
            </Text>
            <Button
                h="2.5rem"
                w="2.5rem"
                rounded="circle"
                m={{ r: "1rem" }}
                onClick={copyClipboard}
                bg={props.buttonBg || "#178a80"}
                hoverBg={props.buttonHoverBg || "success600"}
                hoverShadow="3"
                title="Copy Code"
            >
                <Icon
                    name={props.iconName || "Rename"}
                    size="20px"
                    color="white"
                />
            </Button>
        </Row>
    )
}

export default Clipboard
