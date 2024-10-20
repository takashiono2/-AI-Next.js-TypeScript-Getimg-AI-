'use client';
import { useState } from "react";
import styles from "./page.module.css";
import MonsterForm from "./components/MonsterForm";
import fetchMonsterImg from "./lib/getImgApi";
import Image from "next/image";
import Loading from 'react-loading';

export default function Home() {
  const [monsterImg, setMonsterImg] = useState<string>('');
  const [formData, setFormData] = useState({ description: "", attribute: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (
    description: string,
    attribute: string
  ) => {
    setIsLoading(true);
    setFormData({ description, attribute });
    const imageUrl: string = await fetchMonsterImg({ description, attribute });
    setMonsterImg(imageUrl);
    setIsLoading(false);
  };

  const handleXShare = () => {
    const shareUrl = encodeURIComponent(monsterImg);
    const twitterText = encodeURIComponent(
      `ついに発見！${formData.description}、${formData.attribute}タイプの新しいモンスター！？😂 \n #モンスター画像生成 \n`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${shareUrl}`;
    window.open(twitterUrl, '_blank');
  };


  const LoadingSection = () => (
    <>
      <Loading
        type='spinningBubbles'
        color="#0070f3"
        height={100}
        width={100}
      />
      <p className={styles.loadingText}>画像を生成中です…</p>
    </>
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          AI Monster Generator
        </h1>
        <MonsterForm
          onSubmit={handleFormSubmit}
          isRegenerated={!!monsterImg}
        />
        <div className={styles.imageContainer}>
          {isLoading ? (
            <LoadingSection />
          ) : (
            monsterImg && (
              <>
                <Image
                  src={monsterImg}
                  alt='生成されたモンスターの画像'
                  className={styles.monsterImage}
                  width={300}
                  height={300}
                />
                <button className={styles.shareButton} onClick={handleXShare}>
                  X（旧Twitter）で自慢する
                </button>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}
