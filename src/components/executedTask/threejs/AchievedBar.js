import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";

import { Bar } from "./Bar";
import { Board } from "./Board";
import { TextObject } from "./TextObject";

export const AchievedBar = ({ task, executedTasks }) => {
  if (Object.keys(task).length === 0 || Object.keys(executedTasks).length === 0)
    return;

  const target = task?.target_times;
  const times = executedTasks?.map((executedTask) => executedTask.times);
  const done = times.reduce((a, b) => {
    return a + b;
  });
  const achievementRate = Math.floor((done / target) * 100);

  const barSize = (40 / 100) * achievementRate;
  const barPosition = barSize / 2;

  return (
    <div className="w-full h-full bg-black">
      <Canvas
        camera={{ fov: 90, position: [0.3, -0.3, 12], rotation: [1, 1, 1] }}
        className="bg-black"
        id="canvas"
      >
        <OrbitControls />
        <TextObject
          position={[-9, 2.3, 3]}
          color={"black"}
          scale={[0.7, 0.7, 0.7]}
          text={`achieved : `}
        />
        <TextObject
          position={[0, 2.5, 3]}
          color={"orange"}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          text={`${achievementRate} %`}
          isRotate={true}
        />
        <TextObject
          position={[10, 2.2, 3]}
          color={"purple"}
          scale={[0.7, 0.7, 0.7]}
          rotation={[0, 0, 0]}
          text={`${done} / ${target}`}
        />
        <Board position={[0, 0, 0]} color={"lightgray"} size={[50, 15, 1]} />
        <Center position={[-21 + barPosition, -2, 0]}>
          <Bar
            position={[0, -0.46, 1]}
            color={"skyblue"}
            size={[barSize, 2.4, 1]}
            sizeChange={false}
            rotation={[0, 0, 0]}
          />
        </Center>
        {/* ambientLight 周囲光 全方位から均等に光を当てる 全体が明るくなるが影はできない */}
        {/* <ambientLight intensity={0.5} /> */}
        {/* spotLight 光源から広がるように前方を照らす angle => 照射角度 penumbra => 光の減衰率 */}
        <spotLight position={[100, 10, 20]} angle={0.15} penumbra={1} />
        <spotLight position={[20, 30, 30]} angle={0.45} penumbra={1} />
      </Canvas>
    </div>
  );
};

export default AchievedBar;
