import {View} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  wingIcon,
  heartIcon,
  musicIcon,
  personIcon,
  questionIcon,
  gameIcon,
} from '../Components/Icons';
import {Card, Flex, CardProps, AnimatedScreen} from '../Components';
import {CardFlip} from '../Components/CardFlip';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Card = {
  text: string;
  icon: JSX.Element;
  secondIcon?: JSX.Element;
  smallText?: boolean;
};

export const QuestionGame: FunctionComponent<{}> = ({}) => {
  const flipRef = useRef<any>(null);
  const usedCards = useRef<string[]>([]);

  const countAllCards = () => {
    return (
      physical.length +
      musicalOrRP.length +
      questions.length +
      romantic.length +
      personal.length +
      games.length
    );
  };
  const getCard = (): Card => {
    const cardCategories = [
      physical,
      musicalOrRP,
      questions,
      romantic,
      personal,
      games,
    ];
    const randomCategory =
      cardCategories[Math.floor(Math.random() * cardCategories.length)];
    const randomCard =
      randomCategory[Math.floor(Math.random() * randomCategory.length)];
    if (usedCards.current.includes(randomCard.text)) {
      if (usedCards.current.length === countAllCards()) {
        usedCards.current = [];
      }
      return getCard();
    } else {
      usedCards.current.push(randomCard.text);
      AsyncStorage.setItem('usedCards', JSON.stringify(usedCards.current));
      return randomCard;
    }
  };

  // add memory so we dont show questions we've already shown until we go through all of them
  const [curQuestion, setCurQuestion] = useState<Card>({
    text: 'Poop',
    icon: questionIcon,
  });
  const [nextQuestion, setNextQuestion] = useState<Card>({
    text: 'More poop',
    icon: questionIcon,
  });

  useEffect(() => {
    const asyncCall = async () => {
      const jsonValue = await AsyncStorage.getItem('usedCards');
      usedCards.current = jsonValue != null ? JSON.parse(jsonValue) : [];
      setCurQuestion(getCard());
      setNextQuestion(getCard());
    };
    asyncCall();
  }, []);

  return (
    <AnimatedScreen>
      <Flex centered centeredVertical full>
        <CardFlip expectedHeight={420} expectedWidth={300} ref={flipRef}>
          <Card
            key={'Question1'}
            name={undefined}
            firstSuit={curQuestion.icon}
            firstDetail={curQuestion.text}
            smallText={curQuestion.smallText}
            secondSuit={curQuestion.icon}
            secondDetail={undefined}
            description={undefined}
            typed
            game={'SingleCardGame'}
            onPress={() => {
              setNextQuestion(getCard());
              flipRef?.current?.flip();
            }}
          />
          <Card
            key={'Question2'}
            name={undefined}
            firstSuit={nextQuestion.icon}
            firstDetail={nextQuestion.text}
            smallText={nextQuestion.smallText}
            secondSuit={nextQuestion.icon}
            secondDetail={undefined}
            description={undefined}
            typed
            game={'SingleCardGame'}
            onPress={() => {
              setCurQuestion(getCard());
              flipRef?.current?.flip();
            }}
          />
        </CardFlip>
      </Flex>
    </AnimatedScreen>
  );
};

const physical = [
  {
    text: 'Do a non-trivial skill check',
    icon: wingIcon,
  },
  {
    text: 'Can you raise your hand before I finish this sentence?',
    icon: wingIcon,
  },
  {
    text: 'Fight the air or a thing',
    icon: wingIcon,
  },
  {
    text: 'Bounce something',
    icon: wingIcon,
  },
];

const musicalOrRP = [
  {
    text: 'Sing something',
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
    text: 'Pick an animal to be for a minute',
    icon: musicIcon,
  },
  {
    text: 'Make a beat, make it drop, mix it up',
    icon: musicIcon,
  },
  {
    text: 'Listen to a song and dance',
    icon: musicIcon,
  },
];

const questions = [
  {
    text: 'Notice something beautiful',
    icon: questionIcon,
  },
  {
    text: 'Say something surprising (story, opinion, etc)',
    icon: questionIcon,
  },
  {
    text: 'Make up a character',
    icon: questionIcon,
  },
  {
    text: 'Make up a story',
    icon: questionIcon,
  },
  {
    text: "Tell/ask me a riddle (doesn't have to be good)",
    icon: questionIcon,
  },
  {
    text: 'Tell me a joke (doesnt have to be good)',
    icon: questionIcon,
  },
  {
    text: 'Make yourself laugh (by saying/doing something you find funny)',
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
    text: 'Describe something mundane in great or dramatic detail',
    icon: questionIcon,
  },
  {
    text: 'Describe an alternative universe of us',
    icon: questionIcon,
  },
  {
    text: 'You have a minor wish. Improve the world with it',
    icon: questionIcon,
  },
  {
    text: 'Create a new holiday and tradition, what does it celebrate?',
    icon: questionIcon,
  },
  {
    text: 'Invent a new word and its meaning',
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
    text: 'Pretend to be an expert on ___ while I ask you questions about it',
    icon: questionIcon,
  },
  {
    text: 'Point to something and explain why its so cool',
    icon: questionIcon,
  },
  {
    text: 'Give an object a backstory',
    icon: questionIcon,
  },
  {
    text: "Create a conspiracy theory and I'll ask questions",
    icon: questionIcon,
  },
  {
    text: "What's the meaning of life (not a typical one, but still serious)? ",
    icon: questionIcon,
  },
  {
    text: 'How would you make society less fake/prescriptive/etc?',
    icon: questionIcon,
  },
  {
    text: 'Criticize one of my/your values that you normally agree with',
    icon: questionIcon,
  },
  {
    text: 'Be skeptical of a socio-political idea we normally agree with',
    icon: questionIcon,
  },
];

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
    text: 'Make me blush',
    icon: heartIcon,
  },
  {
    text: 'What did I say one minute ago?',
    icon: heartIcon,
  },
  {
    text: "What's a happy memory of us?",
    icon: heartIcon,
  },
  {
    text: 'Why do you love me?',
    icon: heartIcon,
  },
  {
    text: 'What do you think when you look at me?',
    icon: heartIcon,
  },
  {
    text: 'What’s something small I do that you adore?',
    icon: heartIcon,
  },
  {
    text: 'Make up a pickup line for me',
    icon: heartIcon,
  },
];

const personal = [
  {
    text: 'What do you think people want from you?',
    icon: personIcon,
  },
  {
    text: 'Who are you?',
    icon: personIcon,
  },
  {
    text: 'What do you want out of life',
    icon: personIcon,
  },
  {
    text: 'What’s an Unusual sensory thing (smell, etc) or experience you love?',
    icon: personIcon,
  },
  {
    text: 'Tell a story from your past',
    icon: personIcon,
  },
  {
    text: 'Recall a happy memory',
    icon: personIcon,
  },
  {
    text: 'Whats one of your dreams (goals)?',
    icon: personIcon,
  },
  {
    text: "What's one unusual or humdrum thing that makes you happy?",
    icon: personIcon,
  },
  {
    text: 'If you could be any fictional character, who would you be?',
    icon: personIcon,
  },
  {
    text: 'What would be a dream vacation?',
    icon: personIcon,
  },
  {
    text: "Describe something you don't like and why",
    icon: personIcon,
  },
  {
    text: 'You have a minor wish. How would you improve yourself?',
    icon: personIcon,
  },
  {
    text: 'Tell a fact about yourself that almost nobody knows.',
    icon: personIcon,
  },
  {
    text: 'What’s a piece of advice you would give to your younger self? My younger self?',
    icon: personIcon,
  },
  {
    text: 'What are you proud of yourself for doing/being?',
    icon: personIcon,
  },
];

const games = [
  {
    text: 'Mini LoreCraft - Think of a few subjects for me to make a story about. Also think of a secret goal. See if my story completes the goal!',
    icon: gameIcon,
    smallText: true,
  },
  {
    text: 'Word Slip - Think of an object, the more obscure the harder. You have 3 minutes to slip it into a normal conversation. No lists!',
    icon: gameIcon,
    smallText: true,
  },
  {
    text: "Secret - We both think of characters to roleplay as. You have a secret you don't want me to find out. You also have an obvious tell when you're lying. I have 5 minutes to find the secret.",
    icon: gameIcon,
    smallText: true,
  },
  {
    text: 'Suggestion - Get me to do something without me realising it',
    icon: gameIcon,
  },
  {
    text: 'Simon Says - Beat me in 10 lines',
    icon: gameIcon,
  },
  {
    text: "\n\nThanks, Sucker - We both think of characters to roleplay as. You have a secret task. You ask me for favours, items, etc to help you complete that task. I have to figure out what you're doing before you complete it.",
    icon: gameIcon,
    smallText: true,
  },
];
