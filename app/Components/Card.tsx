import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { Flex } from "./Layout";
import { StyledText } from "./Text";
import { Typewriter } from "./TypeWriter"
import { AnimatedPiece, AnimatedPieceFunctions } from "./AnimatedPiece";
import { Spacer } from "./Spacer";
import LinearGradient from "react-native-linear-gradient";

type NodeProps = {children?:React.ReactNode}

// A rounded rectangle with various built-in animations, appearances, etc
// Currently assumes there's up to 3 areas: a large name taking the top 3/5ths, and a smaller bottom containing up to 2 suits/names
export type CardProps = {
  name?: string;
  typed?: boolean;
  firstSuit?: ReactElement;
  description?: string;
  secondSuit?: ReactElement;
  onPress?: () => void;
  firstDetail?: string;
  secondDetail?: string;
  game?: "CardAndTextGame" | "SingleCardGame";
  hideDescription?: boolean;
};

export const Card: FunctionComponent<CardProps> = ({
  name,
  typed = false,
  firstSuit,
  description,
  secondSuit,
  firstDetail,
  secondDetail,
  game,
  hideDescription,
  onPress
}) => {
  const curGame = game || "SingleCardGame"
  const curStyle = { ...styles[curGame], ...nonStyles[curGame] }

  // a reference for each of the card's section's animation component
  const containerAnimations = useRef<AnimatedPieceFunctions>(null);
  const nameAnimations = useRef<AnimatedPieceFunctions>(null);
  const descriptionAnimations = useRef<AnimatedPieceFunctions>(null);
  const topAnimations = useRef<AnimatedPieceFunctions>(null);
  const botAnimations = useRef<AnimatedPieceFunctions>(null);

  // a list of all animations that a card can do.
  // when triggered, each will trigger the appropriate animations on all of the card's subcomponents
  const shake = () => {
    containerAnimations.current?.shake()
    // the contents of the card shake slightly delayed to simulate reacting to the container shaking
    setTimeout(() => {
      //nameAnimations.current?.shake()
      //descriptionAnimations.current?.shake()
      topAnimations.current?.shake(0.015)
      botAnimations.current?.shake(0.015)
    }, 50)
  }
  
  const pace = () => {
    const left = Math.random() > 0.5
    containerAnimations.current?.pace({left, ...curStyle.paceContainer})
    // the contents of the card slide in the opposite direction a tiny bit to simulate drag/weight
    setTimeout(() => {
        //nameAnimations.current?.pace({left: !left, ...curStyle.paceContents})
        //descriptionAnimations.current?.pace({left: !left, ...curStyle.paceContents})
        topAnimations.current?.pace({left: !left, ...curStyle.paceContents})
        botAnimations.current?.pace({left: !left, ...curStyle.paceContents})
    }, 300)
  }
  
  const jump = () => {
    containerAnimations.current?.jump(curStyle.jumpContainer)
    // the contents of the card jump/fall in the opposite direction a tiny bit to simulate drag/weight
    setTimeout(() => {
        //nameAnimations.current?.jump({inverse: true, ...curStyle.jumpContents})
        //descriptionAnimations.current?.jump({inverse: true, ...curStyle.jumpContents})
        topAnimations.current?.jump({inverse: true, ...curStyle.jumpContents})
        botAnimations.current?.jump({inverse: true, ...curStyle.jumpContents})
    }, 50)
  }
  
  const fallOffAndRespawn = () => {
    containerAnimations.current?.fallOffAndRespawn()
  }
  
  const jumpShake = () => {
    containerAnimations.current?.jumpShake(curStyle.jumpShakeContainer)
    /*
    setTimeout(() => {
        nameAnimations.current?.jumpShake({inverse: true, distance: 1})
        botAnimations.current?.jumpShake({inverse: true, distance: 1})
        topAnimations.current?.jumpShake({inverse: true, distance: 1})
    }, 75)
    */
  }
  
  const zoomOutAndBackIn = () => {
    containerAnimations.current?.zoomOutAndBackIn()
    // the contents of the card zoom out to add a double-layer zoom effect
    //nameAnimations.current?.zoomOutAndBackIn()
    //descriptionAnimations.current?.zoomOutAndBackIn()
    topAnimations.current?.zoomOutAndBackIn()
    botAnimations.current?.zoomOutAndBackIn()
  }

  // these animations are made available to our parent component to call at will
  // TODO

  // a special property of home screen cards is they have random animations applied to them at random intervals
  const randomAnimationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    // TODO if we're on the Homepage, each card will use a random animation every 5-15 seconds
    if (true) {
      // remember the interval so we can clear it later
      randomAnimationInterval.current = setInterval(() => {
        // our animation options
        const animations = [
          pace,
          zoomOutAndBackIn,
        ]
        // pick one at random and do it
        animations[Math.floor(Math.random() * animations.length)]?.()
        // wait 10-25 seconds
      }, 5000)
    }
    // clear interval on unmount
    return () => {
      if (randomAnimationInterval.current) {
        clearInterval(randomAnimationInterval.current)
      }
    }
  }, [])

  // by default, a card has a gradient from top suit's color (or white) to the page's default color (usually black) to bottom suit's color (or white)
  // if gradient is turned off, it's just the page's default color (usually black)
  const firstColor = firstSuit?.props.fill || "#ffffff"
  const secondColor = secondSuit?.props.fill || firstSuit?.props.fill || "#ffffff"

  
  
    // we make 4 containers for the background here:
    // 1. an absolutely positioned, container-size view for the vertical side lines
    // 2. an absolutely positioned, container-size view for the horizontal side line
    // 3. an absolutely positioned, container-size view for the suits in the top corners
    // 4. a normal container for the card's contents
    const lineColor = "#DADADA"
    const transparent = "#00000000"
    const absolute:ViewStyle = {position: "absolute"}
 


  return (
    <AnimatedPiece
      animationComplete={() => {}}
      startingHeight={curStyle.container.height + curStyle.container.padding * 2}
      startingWidth={curStyle.container.width + curStyle.container.padding * 2}
      overrideHeight={curStyle.container.height + curStyle.container.padding * 2}
      overrideWidth={curStyle.container.width + curStyle.container.padding * 2}
      ref={containerAnimations}
    >
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <View style={[curStyle.container, absolute, {justifyContent: "center"}]}>
          <LinearGradient
            style={[curStyle.verticalSideLine, absolute, {left: 0}]}
            colors={[lineColor, transparent]}
          />
          <LinearGradient
            style={[curStyle.verticalSideLine, absolute, {right: 0}]}
            colors={[lineColor, transparent]}
          />
        </View>
        <View style={[curStyle.container, absolute, {alignItems: "center"}]}>
          <View
            style={[curStyle.horizontalSideLine, absolute, {
              top: 0,
              backgroundColor: lineColor
            }]}
          />
        </View>
        <View style={[curStyle.container, absolute]}>
          {firstSuit && (
            <View style={[absolute, {
              top: -firstSuit?.props.height/3,
              left: -firstSuit?.props.width/3,
              transform: [{rotate: "-15deg"}]
            }]}>
              { firstSuit }
            </View>
          )}
          {secondSuit && (
            <View style={[absolute, {
              top: -secondSuit?.props.height/3,
              right: -secondSuit?.props.width/3,
              transform: [{rotate: "15deg"}]
            }]}>
              { secondSuit }
            </View>
          )}
        </View>
        <View
          style={curStyle.container}
        >
          {name &&
            <Flex flex={2} centered>
              <AnimatedPiece
                startingWidth={curStyle.container.width - curStyle.container.padding * 2}
                ref={nameAnimations}
                overrideHeight={typed ? (name.length/14) * 50: undefined}
              >
                <Flex full>
                <Typewriter startFull={!typed} centered>
        <StyledText type={curStyle.text.name}>{name}</StyledText>
      </Typewriter>
                </Flex>
              </AnimatedPiece>
            </Flex>
          }
          {firstDetail && (
            
    <Flex flex={1} centered>
    <AnimatedPiece
      startingWidth={curStyle.container.width - curStyle.container.padding * 2}
      ref={topAnimations}
      overrideHeight={typed ? (firstDetail.length/14) * 50: undefined}
    >
      <Flex centered>
        <Flex row>
              
      {
        firstDetail &&
          <Flex fullWidth style={{opacity: hideDescription ? 0 : 1}}>
            <Typewriter startFull={!typed} centered>
              <StyledText type={curStyle.text.details} style={{ color: firstColor }}>
                {firstDetail}
              </StyledText>
            </Typewriter>
          </Flex>
      }
      </Flex>
    </Flex>
  </AnimatedPiece>
</Flex>
          )}
          {secondDetail && (
                <Flex flex={1} centered>
                <AnimatedPiece
                  startingWidth={curStyle.container.width - curStyle.container.padding * 2}
                  ref={botAnimations}
                  overrideHeight={typed ? (secondDetail.length/14) * 50: undefined}
                >
                  <Flex centered>
                    <Flex row>
                      {props.children}
              
      {
        secondDetail &&
        <Flex fullWidth>
          <Typewriter startFull={!typed} centered>
            <StyledText type={curStyle.text.details} style={{ color: secondColor }}>
              {secondDetail}
            </StyledText>
          </Typewriter>
          </Flex>
      }
            
            </Flex>
                  </Flex>
                </AnimatedPiece>
              </Flex>
          )}
          {description && (
    <Flex flex={2} centered>
      <AnimatedPiece
        startingWidth={curStyle.container.width - curStyle.container.padding * 2}
        ref={descriptionAnimations}
        overrideHeight={typed ? (description.length/14) * 50: undefined}
      >
        <Flex full>
      <Typewriter startFull={!typed} centered>
        <StyledText type={curStyle.text.description}>{description}</StyledText>
      </Typewriter>
        </Flex>
      </AnimatedPiece>
    </Flex>
          )}
        
        </View>
      </TouchableOpacity>
    </AnimatedPiece>
  );
};


const styles = {
  CardAndTextGame: StyleSheet.create({
    container: {
      height: 210,
      width: 150,
      borderRadius: 25,
      margin: 20,
      padding: 20,
    },
    verticalSideLine: {
      height: 100,
      width: 4,
    },
    horizontalSideLine: {
      height: 4,
      width: 70,
    },
  }),
  SingleCardGame: StyleSheet.create({
    container: {
      height: 420,
      width: 300,
      borderRadius: 35,
      margin: 35,
      padding: 35,
    },
    verticalSideLine: {
      height: 200,
      width: 5,
    },
    horizontalSideLine: {
      height: 5,
      width: 140,
    },
  }),
}

const nonStyles = {
  CardAndTextGame: {
    text: {
      name: "body",
      details: "caption",
      description: "caption",
    },
    paceContainer: {
    },
    jumpContainer: {
    },
    jumpShakeContainer: {
    },
    paceContents: {
      // the distance the card's contents will pace in the opposite direction of the container's pace
      distance: 10,
    },
    jumpContents: {
      // the distance the card's contents will jump/fall in the opposite direction of the container's jump
      distance: 20,
    }
  },
  SingleCardGame: {
    text: {
      name: "header",
      details: "body",
      description: "caption",
    },
    paceContainer: {
    },
    jumpContainer: {
    },
    jumpShakeContainer: {
    },
    paceContents: {
      // the distance the card's contents will pace in the opposite direction of the container's pace
      distance: 20,
    },
    jumpContents: {
      // the distance the card's contents will jump/fall in the opposite direction of the container's jump
      distance: 40,
    }
  }
}
