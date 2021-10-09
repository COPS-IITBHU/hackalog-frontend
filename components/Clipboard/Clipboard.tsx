import { Row, Text, Button, Icon } from "atomize"
import copy from "copy-to-clipboard"

const Clipboard = (props: {
    code: string
    notify: () => void
    titleColor?: string
    codeColor?: string
    buttonBg?: string
    iconName?: string
}) => {
    const copyClipboard = (): void => {
        copy(props.code)
        props.notify()
    }

    return (
        <Row align="center">
            <Text
                tag="h4"
                textSize="subheader"
                textColor={props.titleColor || "#003e54"}
                fontFamily="madetommy-regular"
                m={{ r: "1rem" }}
            >
                Team Code:
            </Text>
            <Text
                tag="h4"
                textSize="subheader"
                textColor={props.codeColor || "gray800"}
                fontFamily="madetommy-regular"
                textDecor="underline"
                m={{ r: "1rem" }}
            >
                {props.code}
            </Text>
            <Button
                h="2rem"
                w="2rem"
                rounded="circle"
                m={{ r: "1rem" }}
                onClick={copyClipboard}
                bg={props.buttonBg || "#178a80"}
                hoverShadow="3"
                title="Copy Code"
            >
                <Icon
                    name={props.iconName || "Rename"}
                    size="16px"
                    color="white"
                />
            </Button>
        </Row>
    )
}

export default Clipboard
