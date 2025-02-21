import { View } from "react-native";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { wingIcon, heartIcon, musicIcon, personIcon, questionIcon } from "../Components/Icons";
import { Card, Flex, CardProps, AnimatedScreen, fastIcon, groupIcon  } from "../Components";
import { CardFlip } from "../Components/CardFlip";

type Card = {
  text: string,
  icon: JSX.Element,
  secondIcon?: JSX.Element,
}

export const QuestionGame: FunctionComponent<{}> = ({
}) => {
  const flipRef = useRef<any>(null)
  const usedCards = useRef<string[]>([])

  const countAllCards = () => {
    return physical.length + musicalOrRP.length + questions.length + romantic.length + personal.length
  }
  const getCard = ():Card => {
    const cardCategories = [physical, musicalOrRP, questions, romantic, personal]
    const randomCategory = cardCategories[Math.floor(Math.random() * cardCategories.length)]
    const randomCard = randomCategory[Math.floor(Math.random() * randomCategory.length)]
    if (usedCards.current.includes(randomCard.text)) {
      if (usedCards.current.length === countAllCards()) {
        usedCards.current = []
      }
      return getCard()
    }
    else {
      usedCards.current.push(randomCard.text)
      return randomCard
    }
  }

  // add memory so we dont show questions we've already shown until we go through all of them
  const [curQuestion, setCurQuestion] = useState<Card>({text: "Poop", icon: questionIcon})
  const [nextQuestion, setNextQuestion] = useState<Card>({text: "More poop", icon: questionIcon})
  const [hideDescription, setHideDescription] = useState<number>(1)

  useEffect(() => {
    setCurQuestion(getCard())
    setNextQuestion(getCard())
  }, [])

  return (
    <AnimatedScreen>
        <Flex centered centeredVertical full style={{marginTop: -100}}>
          <CardFlip
            expectedHeight={350}
            expectedWidth={350}
            ref={flipRef}
            >
            <Card
              key={"Question1"}
              name={undefined}
              firstSuit={curQuestion.icon}
              firstDetail={curQuestion.text}
              secondSuit={curQuestion.secondIcon}
              secondDetail={undefined}
              description={undefined}
              hideDescription={hideDescription === 0}
              typed
              game={"SingleCardGame"}
              onPress={() => {
                flipRef?.current?.flip()
                setTimeout(() => setHideDescription(0), 1010)
                setTimeout(() => setCurQuestion(getCard()), 1000)
              }}
            />
            <Card
              key={"Question2"}
              name={undefined}
              firstSuit={nextQuestion.icon}
              firstDetail={nextQuestion.text}
              secondSuit={nextQuestion.secondIcon}
              secondDetail={undefined}
              description={undefined}
              hideDescription={hideDescription === 1}
              typed
              game={"SingleCardGame"}
              onPress={() => {
                flipRef?.current?.flip()
                setTimeout(() => setHideDescription(1), 1010)
                setTimeout(() => setNextQuestion(getCard()), 1000)
              }}
            />
          </CardFlip>
        </Flex>
    </AnimatedScreen>
  )
};


const physical = [
  {
    text: "Do a non-trivial skill check",
    icon: wingIcon,
  },
  {
    text: "Can you raise your hand before I finish this sentence?",
    icon: wingIcon,
  },
  {
    text: "Beat me at Simon says in 10 lines",
    icon: wingIcon,
  },
  {
    text: "Fight the air or a thing",
    icon: wingIcon,
  },
  {
    text: "Bounce something",
    icon: wingIcon,
  },

]

const musicalOrRP = [
  {
    text: "Sing something",
    icon: musicIcon,
  },
  {
    text: "Make an accent and I'll mimic it",
    icon: musicIcon,
  },
  {
    text: "Sing/hum/play something and I'll back u up",
    icon: musicIcon,
  },
  {
    text: "Pick an animal to be for a minute",
    icon: musicIcon,
  },
  {
    text: "Make a beat, make it drop, mix it up",
    icon: musicIcon,
  },
  {
    text: "Listen to a song and dance",
    icon: musicIcon,
  },

]

const questions = [
  {
    text: "Notice something beautiful",
    icon: questionIcon,
  },
  {
    text: "Say something surprising (story, opinion, etc)",
    icon: questionIcon,
  },
  {
    text: "Make up a character",
    icon: questionIcon,
  },
  {
    text: "Make up a story",
    icon: questionIcon,
  },
  {
    text: "Tell/ask me a riddle (doesn't have to be good)",
    icon: questionIcon,
  },
  {
    text: "Tell me a joke (doesnt have to be good)",
    icon: questionIcon,
  },
  {
    text: "Make yourself laugh",
    icon: questionIcon,
  },
  {
    text: "Make an idiom (ex: the cat's out of the bag)",
    icon: questionIcon,
  },
  {
    text: "What's a good idea for a book?",
    icon: questionIcon,
  },
  {
    text: "Describe something mundane in great or dramatic detail",
    icon: questionIcon,
  },
  {
    text: "Describe an alternative universe of us",
    icon: questionIcon,
  },
  {
    text: "You have a minor wish. Improve the world with it",
    icon: questionIcon,
  },
  {
    text: "Create a new holiday and tradition, what does it celebrate?",
    icon: questionIcon,
  },
  {
    text: "Invent a new word and its meaning",
    icon: questionIcon,
  },
  {
    text: "What's a really nice thing and why?",
    icon: questionIcon,
  },
  {
    text: "Create a social norm or custom (can't just cancel one out)",
    icon: questionIcon,
  },
  {
    text: "Pretend to be an expert on ___ while I ask you questions about it",
    icon: questionIcon,
  },
  {
    text: "Point to something and explain why its so cool",
    icon: questionIcon,
  },
]

const romantic = [
  {
    text: "Tell me why I'm cute",
    icon: heartIcon,
  },
  {
    text: "Tell me why I'm smart ",
    icon: heartIcon,
  },
  {
    text: "Make me blush",
    icon: heartIcon,
  },
  {
    text: "What did I say one minute ago?",
    icon: heartIcon,
  },
  {
    text: "What's a happy memory of us?",
    icon: heartIcon,
  },
  {
    text: "Why do you love me?",
    icon: heartIcon,
  },
  {
    text: "What do you think when you look at me?",
    icon: heartIcon,
  },
]

const personal = [
  {
    text: "Tell a story from your past",
    icon: personIcon,
  },
  {
    text: "Recall a happy memory",
    icon: personIcon,
  },
  {
    text: "Whats one of your dreams (goals)?",
    icon: personIcon,
  },
  {
    text: "What's one unusual or humdrum thing that makes you happy?",
    icon: personIcon,
  },
  {
    text: "If you could be any fictional character, who would you be?",
    icon: personIcon,
  },
  {
    text: "What would be a dream vacation?",
    icon: personIcon,
  },
  {
    text: "Describe something you don't like and why",
    icon: personIcon,
  },
  {
    text: "You have a minor wish. How would you improve yourself?",
    icon: personIcon,
  },
  {
    text: "Tell a fact about yourself that almost nobody knows.",
    icon: personIcon,
  },
  {
    text: "What’s a piece of advice you would give to your younger self? My younger self?",
    icon: personIcon,
  },
  {
    text: "What are you proud of yourself for doing/being?",
    icon: personIcon,
  },
]
