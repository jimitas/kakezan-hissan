import * as se from "./se.js";
import {hissan} from "./hissan.js";

// 全ての音声を事前読み込み
se.preloadAllSounds().then(() => {
  console.log("📱 アプリケーションの初期化完了");
  // 音声読み込み完了後にアプリケーションを開始
  hissan();
}).catch((error) => {
  console.error("音声読み込み中にエラーが発生しましたが、アプリケーションを起動します:", error);
  // エラーが発生してもアプリケーションは起動
  hissan();
});
