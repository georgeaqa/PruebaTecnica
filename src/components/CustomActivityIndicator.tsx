import React from "react";
import { View } from "react-native";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";

const pulse: CSSAnimationKeyframes = {
  from: {
    opacity: 1,
    transform: [{ scale: 1 }, { rotateZ: "-15deg" }],
  },
  to: {
    opacity: 0,
    transform: [{ scale: 4 }, { rotateZ: "15deg" }],
  },
};

export default function CustomActivityIndicator() {
  return (
    <View className="flex-1 items-center justify-center">
      {[...Array(3).keys()].map((index) => {
        return (
          <Animated.View
            key={index}
            className="absolute w-[100px] h-[100px] bg-black rounded-full"
            style={{
              animationName: pulse,
              animationDuration: 1000,
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDelay: index * 300,
            }}
          />
        );
      })}
    </View>
  );
}
