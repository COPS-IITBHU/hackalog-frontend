import { Text } from "atomize"

export default function EventText({text,tag,textSizeXs,textSizeMd}){
    return(
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