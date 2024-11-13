import React from "react";
import { useTransition, animated } from "@react-spring/web";

interface AnimatedListProps<T> {
  items: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const AnimatedList = <T,>({
  items,
  keyExtractor,
  renderItem,
  className = "",
}: AnimatedListProps<T>) => {
  const transitions = useTransition(items, {
    keys: items.map(keyExtractor),
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
  });

  return (
    <ul className={`${className}`}>
      {transitions((style, item, _t, index) => (
        <animated.div key={keyExtractor(item, index)} style={style}>
          {renderItem(item, index)}
        </animated.div>
      ))}
    </ul>
  );
};

export default AnimatedList;
