import { useState } from "react";
import { config, useSpring, animated } from "@react-spring/three";

export const Bar = (props) => {
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: config.wobbly,
  });

  return (
    <animated.mesh
      scale={props.sizeChange ? scale : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={props.rotation}
    >
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={props.color} />
    </animated.mesh>
  );
};
