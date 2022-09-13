export const Board = (props) => {
  return (
    <mesh
      position={props.position}
      scale={props.scale}
      rotation={props.rotation}
    >
      <planeGeometry args={props.size} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};
