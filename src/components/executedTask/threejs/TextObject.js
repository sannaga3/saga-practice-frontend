import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const TextObject = (props) => {
  const ref = useRef();

  // マイフレーム毎にボックス（ref属性の対象）を回転させる
  useFrame(() => {
    props.isRotate
      ? (ref.current.rotation.y += 0.01)
      : (ref.current.rotation.y = 0);
  });

  const font = {
    font: "/public/fonts/Roboto_Italic.json",
    fontSize: 2.5,
    letterSpacing: 0.1,
    lineHeight: 1,
    "material-toneMapped": false,
  };

  return (
    <mesh>
      <Text ref={ref} {...props} {...font} />
    </mesh>
  );
};
