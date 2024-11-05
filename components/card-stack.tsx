"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

let interval: any;

type Card = {
  id: number;
  content: React.ReactNode;
  name: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const CARD_OFFSET = isDesktop ? 10 : 5;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>([items[0] || items[0]]);

  useEffect(() => {
    startFlipping();
    setCards(items);

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  const onChangeCardByIndex = (index: number) => {
    const item = cards[index];
    if (!item) return;

    setCards([item, ...cards.slice(0, index), ...cards.slice(index + 1)]);
  };

  const onChangeCard = (item) => {
    const index = cards.findIndex((card) => card.id === item.id);
    setCards([item, ...cards.slice(0, index), ...cards.slice(index + 1)]);
  };

  // TODO: Get screen width
  return (
    <div
      className="relative h-[220px] md:h-[670px] w-[331px] md:w-[1031px] z-10"
      onMouseEnter={() => clearInterval(interval)}
    >
      {cards.map((card, index) => {
        return (
          <TooltipProvider delayDuration={0}>
            <Tooltip key={card.id}>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute left-0 top-0 h-full w-full transition-all duration-200"
                  style={{
                    transform: `scale(${1 - SCALE_FACTOR * index}) translateY(${index * CARD_OFFSET}px)`,
                    zIndex: cards.length - index,
                    display: index > 2 ? "none" : "block",
                  }}
                  whileHover={{
                    top: index > 0 ? index * -CARD_OFFSET - 30 : 0,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div onClick={() => onChangeCardByIndex(index)}>{card.content}</div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="py-1 px-3 rounded-sm"
                sideOffset={8}
              >
                <p className="text-xs">{card.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};