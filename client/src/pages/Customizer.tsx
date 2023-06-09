import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useGlobalStore } from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { CustomButton } from "../components/CustomButton";
import {
  DecalTypeKeys,
  DecalTypes,
  EditorTabs,
  FilterTabs,
} from "../config/constants";
import { Tab } from "../components/Tab";
import ColorPicker from "../components/ColorPicker";
import { FilePicker } from "../components/FilePicker";
import { getScreenshot, reader } from "../config/helpers";
import { AIPicker } from "../components/AIPicker";
import { apiConfig } from "../config/config";
import { DownloadModal } from "../components/DownloadModal";
export const Customizer = () => {
  const { intro, updateBykey, isLogoTexture, isFullTexture } = useGlobalStore();
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<
    Record<string, boolean>
  >({
    logoShirt: isLogoTexture,
    stylishShirt: isFullTexture,
  });

  const [file, setFile] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [prompt, setPrompt] = useState("");
  const toggleEditorTab = (tabName: string) => {
    switch (tabName) {
      case "colorpicker":
        if (activeEditorTab === tabName) {
          setActiveEditorTab("");
        } else {
          setActiveEditorTab(tabName);
        }
        break;
      case "filepicker":
        if (activeEditorTab === tabName) {
          setActiveEditorTab("");
        } else {
          setActiveEditorTab(tabName);
        }
        break;
      case "aipicker":
        if (activeEditorTab === tabName) {
          setActiveEditorTab("");
        } else {
          setActiveEditorTab(tabName);
        }
        break;
    }
  };
  const handleSubmit = async (type: DecalTypeKeys) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(apiConfig.production.backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();
      if (!data.photo) {
        return;
      }
      console.log("%cCustomizer.tsx line:66 data", "color: #007acc;", data);

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        updateBykey("isLogoTexture", !activeFilterTab[tabName]);

        break;
      case "stylishShirt":
        updateBykey("isFullTexture", !activeFilterTab[tabName]);

        break;
      case "download":
        getScreenshot("download")
        break;
      default:
        updateBykey("isLogoTexture", true);
        updateBykey("isFullTexture", false);

        break;
    }
    if(tabName == "download"){
      return 
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };
  const handleDecals = (type: DecalTypeKeys, result: any) => {
    if (!result) {
      return;
    }
    const decalType = DecalTypes[type];
    if (!decalType) {
      return;
    }
    updateBykey(decalType.stateProperty as any, result);
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type: DecalTypeKeys) => {
    if (!file) {
      return;
    }
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  const generateTabContent = (activeEditorTab: string) => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;

      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;

      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };
  return (
    <AnimatePresence>
      {!intro && (
        <>
          {/* 返回按钮 */}
          <motion.div
            key="goBack"
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                updateBykey("intro", true);
              }}
              customStyles="w-fit px-4 font-bold lg:text-[2vmin] text-[100%]"
            />
          </motion.div>
          {/* 左边选项 */}
          <motion.div
            key="pickers"
            className="absolute top-0 left-0 z-10 "
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => toggleEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent(activeEditorTab)}
              </div>
            </div>
          </motion.div>
          {/* 下面选项 */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
                
          </motion.div>
  
        </>
      )}
    </AnimatePresence>
  );
};
