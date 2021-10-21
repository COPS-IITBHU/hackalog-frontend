import { Text } from "atomize"
import { PropsWithChildren } from "react"

interface TextProps {
    tag: string
    textSizeXs: string
    textSizeMd: string
    text: string
}

export default function EventText({
    tag,
    text,
    textSizeXs,
    textSizeMd,
}: PropsWithChildren<TextProps>) {
    return (
        <Text
            tag={tag}
            textSize={{ xs: textSizeXs, md: textSizeMd }}
            textColor="#003e54"
            fontFamily="madetommy-bold"
        >
            {text}
        </Text>
    )
}
