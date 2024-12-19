const wishes = [
  "愿平安夜的星光为你点亮前行的道路，愿圣诞节的祝福为你带来温暖与希望。🌟✨",
  "在这个飘雪的季节，愿圣诞老人把最美好的祝福悄悄放进你的梦里，伴你度过一个温馨难忘的圣诞节。🎅❄️",
  "愿圣诞的钟声，敲响你心中最美的愿望；愿圣诞的烛光，照亮你前方最好的方向。🕯️💫",
  "这个特别的日子里，愿你的心房盛满欢乐，愿你的生活处处洋溢着幸福的味道。🎄💝",
  "让我们一起分享圣诞的喜悦，愿这份温暖的祝福，如冬日的暖阳般温暖你的心房。☀️🤗",
  "在这个充满奇迹的节日里，愿你遇见最美好的惊喜，收获最真挚的祝福。✨🎁",
  "愿圣诞的雪花飘落你的窗前，带给你一份宁静与美好；愿节日的问候萦绕你的耳畔，送去一片温暖与祥和。❄️🏠",
  "在这个特别的日子，愿你的快乐如圣诞树上的星星般闪耀，愿你的幸福如圣诞老人的礼物般丰盈。⭐🎄"
];

export const getRandomWish = (): string => {
  const randomIndex = Math.floor(Math.random() * wishes.length);
  return wishes[randomIndex];
};

export const playBellSound = () => {
  const bell = new Audio('/src/assets/audio/bell-sound.mp3');
  bell.play().catch(console.error);
};
