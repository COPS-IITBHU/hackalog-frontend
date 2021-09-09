import { Text, Tag } from "atomize"

export const Interests = ({ interests }: { interests: string }) => {
    const skills: JSX.Element[] = interests.length
        ? interests.split(",").map((skill: string, id: number) => {
              return (
                  <Tag
                      bg={`warning700`}
                      textColor="white"
                      p={{ x: "0.75rem", y: "0.25rem" }}
                      m={{ r: "0.5rem", b: "0.5rem" }}
                      textSize="body"
                      rounded="circle"
                      key={id}
                  >
                      {skill.trim()}
                  </Tag>
              )
          })
        : []
    return (
        <div>
            <Text
                tag="h4"
                textSize="title"
                textColor="#003e54"
                fontFamily="madetommy-bold"
                m={{ b: "0.5rem" }}
            >
                Interests
            </Text>
            <Text tag="p" textSize="paragraph" textColor="#003e54">
                {!skills.length ? "Add Your Interests to Show Off" : skills}
            </Text>
        </div>
    )
}
