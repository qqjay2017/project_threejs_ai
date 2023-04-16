import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalStore } from "../store";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../components/CustomButton";
export const Home = () => {
  const { intro, updateBykey } = useGlobalStore();

  return (
    <AnimatePresence>
      {intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./images/AI_202304161149.png"
              alt="logo"
              className="w-16 h-16 object-contain rounded-full"
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
              我们全新推出的3D定制工具，能够让你DIY出独一无二、只属于你的衬衫！😍😍
              <br className="xl:block hidden" />
              这款工具简直是一场独特创作的释放，让你的创作无限可能！🔥🔥
              <br className="xl:block hidden" />
              你可以尽情发挥，定义你自己的风格，定制你想要的唯一的衣服！😎😎
              <br className="xl:block hidden" />
             
                用我们的 <strong>3D定制工具</strong>，尽情释放你的创意和想象力吧！🤩🤩
              </p>
              <CustomButton
                type="filled"
                title="开启你的DIY梦想"
                handleClick={() => {
                  updateBykey("intro", false);
                }}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
