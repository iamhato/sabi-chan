import { useState } from "react";
import "./App.css";
import { photos } from "./data/photos.js";


const tabs = ["すべて", "ご飯", "お昼寝", "不機嫌", "リラックス", "公園時代"];

function App() {
  const [activeTab, setActiveTab] = useState("すべて");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // フィルター処理（ここがReactの肝）
  const filteredPhotos =
    activeTab === "すべて"
      ? photos
       : photos.filter((photo) => photo.tag.includes(activeTab));

  const selectedPhoto =
    selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  const nextPhoto = () => {
    setSelectedIndex((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  };

  return (
    <div className="container">
      {/* ヘッダー */}
      <header className="header">
        <h1 className="title">Mr.Sabineko</h1>
        <p className="subtitle">2026.02.01</p>
      </header>

      {/* プロフィール */}
      <section className="profile">
        <h2>プロフィール</h2>
        <>
          <span>本名</span> サビちゃん<br></br>
          <span>別名</span> Mr.サビ猫、サビのすけ、サビ太朗、サビンヌ、サビンビン<br></br>
          <span>性別</span> ♀<br></br>
          <span>年齢</span> ???<br></br>
          <span>鳴声</span> ニ"ャ。ンニャ。<br></br>
          <span>好き</span> カルカンのウェットフード。日向ぼっこ。<br></br>
          <span>性格</span> 優しくておしとやか。甘えん坊。<br></br>
          <span>特徴</span> 美脚。鍵しっぽ。
        </>
      </section>

      {/* タブフィルター（ミニマルUI） */}
      <section className="filter">
        <div className="tab-list">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery">
        <h2>サビちゃんの日常</h2>
        <div className="gallery-grid">
          {filteredPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo.src}
              alt="sabi"
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </section>

      {selectedPhoto && (
        <div className="lightbox" onClick={() => setSelectedIndex(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close" onClick={() => setSelectedIndex(null)}>
              ×
            </button>

            <button className="prev" onClick={prevPhoto}>
              ←
            </button>

            <img src={selectedPhoto.src} alt="sabi-large" />

            <button className="next" onClick={nextPhoto}>
              →
            </button>

            <div className="lightbox-info">
              <p className="memo">{selectedPhoto.memo}</p>
              <p className="date">{selectedPhoto.date}</p>
            </div>
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="footer">
        © Mr.Sabineko 2026
      </footer>
    </div>
  );
}

export default App;