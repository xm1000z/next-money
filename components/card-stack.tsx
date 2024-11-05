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
  const [cards, setCards] = useState<Card[]>(items);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCards((prevCards) => {
          const newCards = [...prevCards];
          const lastCard = newCards.pop();
          if (lastCard) {
            newCards.unshift(lastCard);
          }
          return newCards;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const onCardClick = (index: number) => {
    setIsAnimating(true);
    const selectedCard = cards[index];
    const newCards = [
      selectedCard,
      ...cards.slice(0, index),
      ...cards.slice(index + 1),
    ];
    setCards(newCards);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative h-[220px] w-[331px] z-10 md:h-[670px] md:w-[1031px]">
      {cards.map((card, index) => (
        <TooltipProvider key={card.id} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                className="absolute left-0 top-0 h-full w-full cursor-pointer"
                style={{
                  transform: `scale(${1 - SCALE_FACTOR * index}) translateY(${
                    index * CARD_OFFSET
                  }px)`,
                  zIndex: cards.length - index,
                  display: index > 2 ? "none" : "block",
                }}
                whileHover={{
                  top: index > 0 ? -30 : 0,
                  transition: { duration: 0.3 },
                }}
                onClick={() => onCardClick(index)}
              >
                {card.content}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="rounded-sm px-3 py-1"
              sideOffset={8}
            >
              <p className="text-xs">{card.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};