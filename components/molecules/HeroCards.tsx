import React from "react";
import { motion } from "framer-motion";
import move from "lodash-move";
import styled from "styled-components";

const CARD_COLORS = ["#266678", "#cb7c7a", " #36a18b", "#cda35f", "#747474"];
const CARD_IMAGES = [
  "../../assets/turntable.png",
  "../../assets/airplay.png",
  "../../assets/streaming.png",
  "../../assets/tv.png",
];
const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const CardStack = () => {
  const [cards, setCards] = React.useState(CARD_COLORS);
  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <HeroCardsStyling>
      <ul className="cardWrapStyle">
        {cards.map((img, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={img}
              className="cardStyle"
              style={{
                // backgroundImage: `url(${img})`,
                // backgroundSize: "contain",
                backgroundColor: img,

                transformOrigin: "center",
                cursor: canDrag ? "grab" : "auto",
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARD_COLORS.length - index,
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              onDragEnd={() => moveToEnd(index)}
            />
          );
        })}
      </ul>
    </HeroCardsStyling>
  );
};

const HeroCardsStyling = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  .cardWrapStyle {
    position: relative;
    width: 350px;
    height: 350px;
    /* aspect-ratio: 1; */
    .cardStyle {
      position: absolute;
      width: 350px;
      height: 350px;
      border-radius: 8px;
      transform-origin: top center;
      list-style: none;
    }
  }
`;
// const wrapperStyle = {
//   position: "relative",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "100vh"
// };

// const cardWrapStyle = {
//   position: "relative",
//   width: "350px",
//   height: "220px"
// };

// const cardStyle = {
//   position: "absolute",
//   width: "350px",
//   height: "220px",
//   borderRadius: "8px",
//   transformOrigin: "top center",
//   listStyle: "none"
// };
export default CardStack;
