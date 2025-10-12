//コンテンツ共通の効果音の登録
export const pi = new Howl({
  src: ["./Sounds/pi.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const set = new Howl({
  src: ["./Sounds/set.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const seikai1 = new Howl({
  src: ["./Sounds/seikai.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const seikai2 = new Howl({
  src: ["./Sounds/seikai2.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const reset = new Howl({
  src: ["./Sounds/reset.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const right = new Howl({
  src: ["./Sounds/right.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const move1 = new Howl({
  src: ["./Sounds/move1.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const move2 = new Howl({
  src: ["./Sounds/move2.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const alert = new Howl({
  src: ["./Sounds/alert.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});
export const kako = new Howl({
  src: ["./Sounds/kako.mp3"],
  preload: true, // 事前ロード
  volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
  loop: false, // ループ再生するか
  autoplay: false, // 自動再生するか
});

// 全ての音声のリスト
const allSounds = [pi, set, seikai1, seikai2, reset, right, move1, move2, alert, kako];

// 全ての音声の読み込み完了を待つ関数
export function preloadAllSounds() {
  console.log("🔊 音声ファイルの読み込みを開始...");

  return Promise.all(
    allSounds.map(sound => {
      return new Promise((resolve) => {
        if (sound.state() === 'loaded') {
          // 既に読み込み済み
          console.log("✅ 既に読み込み済み:", sound._src);
          resolve();
        } else {
          // 読み込み完了を待つ
          sound.once('load', () => {
            console.log("✅ 音声読み込み完了:", sound._src);
            resolve();
          });
          sound.once('loaderror', (id, error) => {
            console.error("❌ 音声読み込みエラー:", sound._src, error);
            resolve(); // エラーでも続行
          });
          // 明示的に読み込みを開始
          sound.load();
        }
      });
    })
  ).then(() => {
    console.log("🎉 全ての音声ファイルの読み込みが完了しました！");
  });
}
// export const cancel = new Howl({
//   src: ["./Sounds/cancel.mp3"],
//   preload: true, // 事前ロード
//   volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
//   loop: false, // ループ再生するか
//   autoplay: false, // 自動再生するか
// });
// export const cancel2 = new Howl({
//   src: ["./Sounds/cancel2.mp3"],
//   preload: true, // 事前ロード
//   volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
//   loop: false, // ループ再生するか
//   autoplay: false, // 自動再生するか
// });
// export const cancel3 = new Howl({
//   src: ["./Sounds/cancel3.mp3"],
//   preload: true, // 事前ロード
//   volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
//   loop: false, // ループ再生するか
//   autoplay: false, // 自動再生するか
// });
// export const open1 = new Howl({
//   src: ["./Sounds/open1.mp3"],
//   preload: true, // 事前ロード
//   volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
//   loop: false, // ループ再生するか
//   autoplay: false, // 自動再生するか
// });
// export const open2 = new Howl({
//   src: ["./Sounds/open2.mp3"],
//   preload: true, // 事前ロード
//   volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
//   loop: false, // ループ再生するか
//   autoplay: false, // 自動再生するか
// });
// export const shot = new Howl({
//   src: ["./Sounds/shot.mp3"],
//   preload: true, // 事前ロード
//   volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
//   loop: false, // ループ再生するか
//   autoplay: false, // 自動再生するか
// });


