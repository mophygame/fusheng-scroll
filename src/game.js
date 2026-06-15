const GAME_STATE = Object.freeze({
  TITLE: "title",
  DIALOGUE: "dialogue",
  SELECT: "select",
  READER: "reader",
  VIDEO: "video",
  CHAPTER: "chapter",
});

const prologueDialogue = [
  { speaker: "旁白", character: null, text: "雨下得正急。你循著一盞將熄的燈，推開了巷尾那扇從未見過的門。" },
  { speaker: "書肆主人 · 眠", character: "mian", text: "姑娘，夜半入店，可是來尋一本忘了名字的書？" },
  { speaker: "你", character: null, text: "我只是避雨。這裡……賣的都是書卷嗎？" },
  { speaker: "書肆主人 · 沐", character: "mu", text: "眠，你別嚇著客人。既然進了門，便是與這些書有緣。" },
  { speaker: "書肆主人 · 眠", character: "mian", text: "尋常書卷記人間事；我們這裡的，記的是人間未了之事。" },
  { speaker: "你", character: null, text: "未了之事……也包括已經忘記的人嗎？" },
  { speaker: "書肆主人 · 沐", character: "mu", text: "五卷命書，五位故人。有人等你一世，也有人等了不只一世。" },
  { speaker: "書肆主人 · 眠", character: "mian", text: "選吧。只是書卷一開，前塵便再也不能只當作一場夢了。" },
];

const returnedDialogue = [
  { speaker: "旁白", character: null, scene: "shop", text: "最後一卷在你指下闔起，五道墨色印記同時泛起微光，而後歸於沉寂。" },
  { speaker: "書肆主人 · 沐", character: "mu", scene: "shop", text: "五卷皆閱，看來你已經見過那些等在前塵裡的人了。" },
  { speaker: "書肆主人 · 眠", character: "mian", scene: "shop", text: "不過，若只看他們的故事，仍不足以明白一切從何而起。" },
  { speaker: "書肆主人 · 沐", character: "mu", scene: "shop", text: "你可想知道，大封王朝真正的歷史？" },
];

const laterDialogue = [
  { speaker: "書肆主人 · 眠", character: "mian", scene: "shop", text: "無妨。歷史不會離去，它只會在書頁深處，等你願意回頭。" },
  { speaker: "旁白", character: null, scene: "shop", text: "右上方的命書印記微微發亮。你隨時可以重開五卷，也可以再次詢問大封舊史。" },
];

const historyIntroDialogue = [
  { speaker: "書肆主人 · 沐", character: "mu", scene: "shop", text: "既然你願意問，我們便從五卷命書共同遺漏的那一年說起。" },
  { speaker: "書肆主人 · 眠", character: "mian", scene: "shop", text: "大封建國一百二十七年，史冊只留下盛世二字，卻抹去了赤京城裡的一場血雨。" },
  { speaker: "書肆主人 · 沐", character: "mu", scene: "shop", text: "接下來所見，並非夢境。那是命書替你保存至今的歷史殘影。" },
  { speaker: "書肆主人 · 眠", character: "mian", scene: "shop", text: "莫要移開目光。故事，便從那扇宮門開啟之時開始。" },
];

const chapterDialogue = [
  { speaker: "旁白", character: null, scene: "city", text: "大封建國一百二十七年，北境風雪未歇，赤京城內卻已暗潮洶湧。" },
  { speaker: "書肆主人 · 沐", character: "mu", scene: "city", text: "史書說，那一年天下太平。可寫史的人，從來不會記下每一個被犧牲的名字。" },
  { speaker: "書肆主人 · 眠", character: "mian", scene: "shop", text: "五卷命書，正是在那場被抹去的舊事裡彼此交會。" },
  { speaker: "你", character: null, scene: "city", text: "所以我看見的前世，不只是五段彼此無關的故事？" },
  { speaker: "書肆主人 · 沐", character: "mu", scene: "city", text: "不。它們共同指向一場宮變、一紙密詔，還有一個不該被歷史忘記的人。" },
  { speaker: "旁白", character: null, scene: "city", text: "第一章 · 山雨欲來。遠處宮門緩緩開啟，你聽見命運重新落筆的聲音。" },
];

const routes = [
  { id: "zhaoxue", glyph: "燈", title: "火闌珊", name: "魏諍", era: "前世 · 帝業遺錄", role: "黃奕澤", modernRole: "雜貨店老闆", ancientRole: "封文帝", seal: "燈", portraitTone: "#27313d", tone: "linear-gradient(145deg, #27313d, #12171e)", line: "贈爾之鈴鐺，一步一響，一步一嚮。", background: "朕這一生，為江山、為百姓，可當朕第一眼見到妳時，才恍然，原來朕想要的是與妳白頭偕老，執子之手。\r\n\r\n「若來世，不復相見」\r\n是朕用盡力氣給妳最後的祝福。", letter: "信件內容。", wish: "吾願以吾名起誓，換汝一生平安。" },
  { id: "fenxin", glyph: "晝", title: "行夜已", name: "上官映雪", era: "前世 · 玉階殘雪", role: "褚晏時", modernRole: "街頭藝術家", ancientRole: "上官皇后", seal: "晝", portraitTone: "#592a21", tone: "linear-gradient(145deg, #4a211d, #160e0d)", line: "他曾以一城風雪，換你平安離去。今生再見，卻唯獨不記得你。", background: "裴燼掌管龐大的家族企業，行事強勢，從不容許任何事脫離掌控。前世他坐擁天下，卻在權力與你之間做錯了選擇；今生所有看似偶然的相遇，其實都是他精心安排的重逢。", letter: "信件內容。", wish: "願以江山為聘，只換卿回眸。" },
  { id: "tingyue", glyph: "餘", title: "罪成判", name: "魏猙", era: "前世 · 懿德秘錄", role: "白霽", modernRole: "百貨公司美妝頂級銷售", ancientRole: "懿德殿掌事太監", seal: "餘", portraitTone: "#294644", tone: "linear-gradient(145deg, #263d3b, #101918)", line: "你我這一生，禍福相倚，事事不由己，若還有來世，吾希望吾還是在後院讀著洛神賦的魏猙。", background: "前世與今生，我所追求的是隨心所欲，能與相愛之人相守、鬥蛐蛐、觀戲曲。\r\n可造化弄人，竟讓我成了這般連自己都認不出的鬼樣子。\r\n這一世，我的死不是遺憾，而是我終於能為自己選擇一次，選擇留在那個被稱為藝術之都的起源。", letter: "信件內容。", wish: "逝於我此生所熱愛的美裡。" },
  { id: "wuxiang", glyph: "燼", title: "然後星", name: "霍驍", era: "前世 · 烽煙紀略", role: "祁烈", modernRole: "武打演員替身", ancientRole: "玄甲將軍", seal: "燼", portraitTone: "#403047", tone: "linear-gradient(145deg, #33263d, #151019)", line: "他替天下人算盡命數，卻把你的名字，藏在無人能解的卦中。", background: "謝無妄擅長看穿謊言，卻從不談自己的過去。他以理性分析所有命運般的巧合，只有面對你時，冷靜的判斷總會出現裂縫。前世他竄改天命救你，也因此被抹去了姓名。", letter: "信件內容", wish: "願逆天命，護卿一世無憂。" },
  { id: "shanhe", glyph: "絮", title: "果如執", name: "疾風", era: "前世 · 鐵騎殘卷", role: "馬唯冀", modernRole: "馬術教練", ancientRole: "寶馬", seal: "絮", portraitTone: "#38494d", tone: "linear-gradient(145deg, #334044, #101718)", line: "本馬這一生，斬昏君，平邊疆，馳騁沙場戰八方\r\n也算半個皇帝\r\n但居然折在這死戀愛腦狗皇帝手上\r\n我就問！殉情就殉情，拖著我幹啥？\r\n得，怕是黃泉路你倆嘮嗑會腳酸是吧？", background: "本馬呼籲\r\n騎馬不徇情，要死自己死\r\n請遵守交通規則\r\n\r\n他馬的\r\n咦ㄩ～～～（馬叫聲）", letter: "信件內容", wish: "願與卿遵守交通規則。" },
];

class AudioDirector {
  constructor() {
    this.context = null;
    this.muted = false;
    this.musicMuted = false;
    this.musicStarted = false;
    this.music = new Audio("./assets/musics/浮生_伴奏.mp3");
    this.music.loop = true;
    this.music.preload = "auto";
    this.music.volume = 0.42;
  }

  ensureContext() {
    if (!this.context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = AudioContext ? new AudioContext() : null;
    }
    if (this.context?.state === "suspended") this.context.resume();
  }

  tone(frequency, duration, type = "sine", volume = 0.04, delay = 0) {
    if (this.muted) return;
    this.ensureContext();
    if (!this.context) return;

    const start = this.context.currentTime + delay;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(this.context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.05);
  }

  enter() {
    this.tone(196, 1.3, "sine", 0.05);
    this.tone(293.66, 1.7, "sine", 0.035, 0.13);
    this.tone(440, 1.8, "triangle", 0.018, 0.27);
  }

  tap() {
    this.tone(620, 0.12, "sine", 0.018);
  }

  reveal() {
    this.tone(220, 0.8, "triangle", 0.035);
    this.tone(329.63, 1.2, "sine", 0.022, 0.08);
  }

  toggle() {
    this.muted = !this.muted;
    if (!this.muted) this.tap();
    return this.muted;
  }

  async startMusic() {
    if (this.musicStarted || this.musicMuted) return;
    try {
      await this.music.play();
      this.musicStarted = true;
    } catch (error) {
      console.warn("背景音樂無法播放", error);
    }
  }

  async toggleMusic() {
    this.musicMuted = !this.musicMuted;
    if (!this.musicStarted) return this.musicMuted;

    if (this.musicMuted) {
      this.music.pause();
    } else {
      try {
        await this.music.play();
        this.musicStarted = true;
      } catch (error) {
        console.warn("背景音樂無法播放", error);
      }
    }
    return this.musicMuted;
  }

  pauseMusic() {
    this.music.pause();
  }

  async resumeMusic() {
    if (this.musicMuted || !this.musicStarted) return;
    try {
      await this.music.play();
    } catch (error) {
      console.warn("背景音樂無法恢復", error);
    }
  }
}

class OtomeGame {
  constructor() {
    this.state = GAME_STATE.TITLE;
    this.dialogueIndex = 0;
    this.dialogueScript = prologueDialogue;
    this.onDialogueComplete = () => this.showScrollSelect();
    this.lastSpeaker = "mian";
    this.selectedRoute = null;
    this.viewedRoutes = this.loadViewedRoutes();
    this.booksUnlocked = localStorage.getItem("booksUnlocked") === "true";
    this.typeTimer = null;
    this.audio = new AudioDirector();

    this.el = {
      scene: document.querySelector("#scene"),
      title: document.querySelector("#title-screen"),
      story: document.querySelector("#story-screen"),
      enter: document.querySelector("#enter-button"),
      sound: document.querySelector("#sound-toggle"),
      music: document.querySelector("#music-toggle"),
      books: document.querySelector("#books-toggle"),
      shopkeepers: document.querySelector("#shopkeepers"),
      chapter: document.querySelector("#chapter-card"),
      panel: document.querySelector("#dialogue-panel"),
      speaker: document.querySelector("#speaker-name"),
      text: document.querySelector("#dialogue-text"),
      progress: document.querySelector("#progress-mark"),
      next: document.querySelector("#dialogue-next"),
      askHistory: document.querySelector("#ask-history-button"),
      select: document.querySelector("#scroll-select"),
      grid: document.querySelector("#scroll-grid"),
      shelveBooks: document.querySelector("#shelve-books-button"),
      reader: document.querySelector("#scroll-reader"),
      closeScroll: document.querySelector("#close-scroll-button"),
      loveLetterButton: document.querySelector("#love-letter-button"),
      loveLetter: document.querySelector("#love-letter"),
      closeLetter: document.querySelector("#close-letter-button"),
      letterName: document.querySelector("#letter-name"),
      letterText: document.querySelector("#letter-text"),
      letterSignature: document.querySelector("#letter-signature"),
      letterWish: document.querySelector("#letter-wish"),
      letterAuthorName: document.querySelector("#letter-author-name"),
      inkPortrait: document.querySelector("#ink-portrait"),
      portraitModern: document.querySelector("#portrait-modern"),
      portraitAncient: document.querySelector("#portrait-ancient"),
      portraitModernGlyph: document.querySelector("#portrait-modern-glyph"),
      portraitAncientGlyph: document.querySelector("#portrait-ancient-glyph"),
      readerBookTitle: document.querySelector("#reader-book-title"),
      readerName: document.querySelector("#reader-name"),
      readerSeal: document.querySelector("#reader-seal"),
      readerModernRole: document.querySelector("#reader-modern-role"),
      readerAncientRole: document.querySelector("#reader-ancient-role"),
      readerLine: document.querySelector("#reader-line"),
      readerBackground: document.querySelector("#reader-background"),
      historyChoice: document.querySelector("#history-choice"),
      enterHistory: document.querySelector("#enter-history-button"),
      laterHistory: document.querySelector("#later-history-button"),
      historyVideoScreen: document.querySelector("#history-video-screen"),
      historyVideo: document.querySelector("#history-video"),
      transition: document.querySelector("#transition"),
      embers: document.querySelector("#embers"),
    };
  }

  start() {
    this.createEmbers();
    this.createScrolls();
    this.bindEvents();
    this.el.books.hidden = true;
    this.updateReadingProgress();
  }

  loadViewedRoutes() {
    try {
      const savedRoutes = JSON.parse(localStorage.getItem("viewedRoutes") || "[]");
      return new Set(Array.isArray(savedRoutes) ? savedRoutes : []);
    } catch {
      return new Set();
    }
  }

  bindEvents() {
    this.el.enter.addEventListener("click", () => this.enterStory());
    this.el.next.addEventListener("click", () => this.nextDialogue());
    this.el.askHistory.addEventListener("click", () => {
      this.el.askHistory.hidden = true;
      this.startDialogue(historyIntroDialogue, () => this.playHistoryVideo());
    });
    this.el.panel.addEventListener("click", (event) => {
      if (!event.target.closest("button")) this.nextDialogue();
    });
    this.el.sound.addEventListener("click", () => {
      const muted = this.audio.toggle();
      this.el.sound.classList.toggle("is-muted", muted);
      this.el.sound.setAttribute("aria-label", muted ? "開啟音效" : "關閉音效");
    });
    this.el.music.addEventListener("click", async () => {
      const muted = await this.audio.toggleMusic();
      this.el.music.classList.add("music-started");
      this.el.music.classList.toggle("music-muted", muted);
      this.el.music.setAttribute("aria-label", muted ? "開啟背景音樂" : "關閉背景音樂");
    });
    this.el.books.addEventListener("click", () => this.showScrollSelect());
    this.el.shelveBooks.addEventListener("click", () => this.shelveBooks());
    this.el.closeScroll.addEventListener("click", () => this.closeScroll());
    this.el.inkPortrait.addEventListener("click", () => {
      this.el.inkPortrait.classList.toggle("show-ancient");
    });
    this.el.loveLetterButton.addEventListener("click", () => {
      if (!this.selectedRoute) return;
      this.el.letterName.textContent = "致　XX";
      this.el.letterText.textContent = this.selectedRoute.letter;
      this.el.letterWish.textContent = this.selectedRoute.wish;
      this.el.letterAuthorName.textContent = this.selectedRoute.name;
      this.el.loveLetter.hidden = false;
      this.audio.reveal();
    });
    this.el.closeLetter.addEventListener("click", () => {
      this.el.loveLetter.hidden = true;
    });
    this.el.enterHistory.addEventListener("click", () => {
      this.el.historyChoice.hidden = true;
      this.startDialogue(historyIntroDialogue, () => this.playHistoryVideo());
    });
    this.el.laterHistory.addEventListener("click", () => {
      this.el.historyChoice.hidden = true;
      this.startDialogue(laterDialogue, () => this.showHistoryPrompt());
    });
    this.el.historyVideo.addEventListener("ended", () => this.finishHistoryVideo());
    [this.el.portraitModern, this.el.portraitAncient].forEach((image) => {
      image.addEventListener("error", () => image.classList.add("is-missing"));
      image.addEventListener("load", () => image.classList.remove("is-missing"));
    });
    window.addEventListener("keydown", (event) => {
      if ((event.key === " " || event.key === "Enter") && this.state === GAME_STATE.DIALOGUE) {
        event.preventDefault();
        this.nextDialogue();
      }
    });
  }

  createEmbers() {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 22; index += 1) {
      const ember = document.createElement("i");
      ember.className = "ember";
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.setProperty("--duration", `${7 + Math.random() * 9}s`);
      ember.style.setProperty("--delay", `${Math.random() * -12}s`);
      ember.style.setProperty("--drift", `${-35 + Math.random() * 70}px`);
      fragment.appendChild(ember);
    }
    this.el.embers.appendChild(fragment);
  }

  createScrolls() {
    routes.forEach((route, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "scroll-card";
      button.dataset.routeId = route.id;
      button.style.setProperty("--tone", route.tone);
      button.innerHTML = `
        <span class="scroll-number">卷之 ${String(index + 1).padStart(2, "0")}</span>
        <b class="scroll-glyph">${route.glyph}</b>
        <h3>${route.title}</h3>
        <p>${route.role}</p>
        <span class="seal">${route.seal}<br>之印</span>
      `;
      button.addEventListener("click", () => this.chooseRoute(route));
      this.el.grid.appendChild(button);
    });
  }

  async enterStory() {
    this.audio.startMusic();
    this.el.music.classList.add("music-started");
    this.audio.enter();
    this.el.transition.classList.add("active");
    await this.wait(900);
    this.state = GAME_STATE.DIALOGUE;
    this.el.title.hidden = true;
    this.el.story.hidden = false;
    this.el.scene.classList.remove("scene-title");
    this.el.scene.classList.add("scene-shop");
    this.el.books.hidden = !this.booksUnlocked;
    await this.wait(550);
    this.el.transition.classList.remove("active");
    await this.wait(2900);
    this.el.chapter.hidden = true;
    this.el.scene.classList.add("dialogue-active");
    this.el.panel.hidden = false;
    this.showDialogue();
  }

  showDialogue() {
    const line = this.dialogueScript[this.dialogueIndex];
    this.el.askHistory.hidden = true;
    this.el.next.hidden = false;
    this.applyDialogueScene(line.scene);
    if (line.character) this.lastSpeaker = line.character;
    this.el.scene.classList.toggle("speaker-mu", line.character === "mu");
    this.el.scene.classList.toggle("speaker-mian", line.character === "mian");
    this.el.scene.classList.toggle("speaker-neutral", !line.character);
    this.el.scene.classList.toggle("last-speaker-mu", this.lastSpeaker === "mu");
    this.el.scene.classList.toggle("last-speaker-mian", this.lastSpeaker === "mian");
    this.el.speaker.textContent = line.speaker;
    this.el.progress.textContent = `${String(this.dialogueIndex + 1).padStart(2, "0")} / ${String(this.dialogueScript.length).padStart(2, "0")}`;
    this.typeText(line.text);
  }

  typeText(content) {
    window.clearInterval(this.typeTimer);
    this.el.text.textContent = "";
    const chars = Array.from(content);
    let index = 0;
    this.typeTimer = window.setInterval(() => {
      this.el.text.textContent += chars[index] ?? "";
      index += 1;
      if (index >= chars.length) window.clearInterval(this.typeTimer);
    }, 34);
  }

  nextDialogue() {
    if (this.state !== GAME_STATE.DIALOGUE) return;

    const current = this.dialogueScript[this.dialogueIndex].text;
    if (this.el.text.textContent.length < Array.from(current).length) {
      window.clearInterval(this.typeTimer);
      this.el.text.textContent = current;
      return;
    }

    this.audio.tap();
    if (this.dialogueIndex < this.dialogueScript.length - 1) {
      this.dialogueIndex += 1;
      this.showDialogue();
      return;
    }
    this.onDialogueComplete();
  }

  startDialogue(script, onComplete) {
    this.state = GAME_STATE.DIALOGUE;
    this.dialogueScript = script;
    this.dialogueIndex = 0;
    this.onDialogueComplete = onComplete;
    this.el.select.hidden = true;
    this.el.reader.hidden = true;
    this.el.historyChoice.hidden = true;
    this.el.panel.hidden = false;
    this.el.askHistory.hidden = true;
    this.el.next.hidden = false;
    this.el.scene.classList.remove("scroll-select-active");
    this.el.scene.classList.add("dialogue-active");
    this.showDialogue();
  }

  applyDialogueScene(scene) {
    if (!scene) return;
    this.el.scene.classList.toggle("scene-chapter-city", scene === "city");
    this.el.scene.classList.toggle("scene-chapter-shop", scene === "shop");
  }

  showScrollSelect() {
    this.state = GAME_STATE.SELECT;
    window.clearInterval(this.typeTimer);
    this.el.scene.classList.remove("speaker-mu", "speaker-mian", "speaker-neutral");
    this.el.scene.classList.add("scroll-select-active");
    this.el.panel.hidden = true;
    this.el.historyChoice.hidden = true;
    this.el.reader.hidden = true;
    this.el.select.hidden = false;
    this.updateReadingProgress();
    this.audio.reveal();
  }

  async chooseRoute(route) {
    this.audio.reveal();
    this.el.transition.classList.add("active");
    await this.wait(500);
    this.selectedRoute = route;
    this.el.scene.classList.remove("scroll-select-active");
    this.el.select.hidden = true;
    this.openScroll();
    await this.wait(220);
    this.el.transition.classList.remove("active");
  }

  openScroll() {
    if (!this.selectedRoute) return;
    const route = this.selectedRoute;
    this.viewedRoutes.add(route.id);
    localStorage.setItem("viewedRoutes", JSON.stringify([...this.viewedRoutes]));
    this.updateReadingProgress();
    this.state = GAME_STATE.READER;
    this.audio.reveal();
    this.el.reader.hidden = false;
    this.el.loveLetter.hidden = true;
    this.el.readerBookTitle.textContent = `${route.glyph}${route.title} • ${route.era} [${route.role}] `;
    this.el.readerName.textContent = route.name;
    const sealImagePath = `./assets/images/用印-${encodeURIComponent(route.name)}.webp`;
    this.el.readerSeal.src = sealImagePath;
    this.el.readerSeal.alt = `${route.name}用印`;
    this.el.letterSignature.src = sealImagePath;
    this.el.letterSignature.alt = `${route.name}情箋用印`;
    this.el.readerModernRole.textContent = route.modernRole;
    this.el.readerAncientRole.textContent = route.ancientRole;
    this.el.readerLine.textContent = route.line;
    this.el.readerBackground.textContent = route.background;
    this.el.portraitModernGlyph.textContent = route.glyph;
    this.el.portraitAncientGlyph.textContent = route.glyph;
    this.el.inkPortrait.style.setProperty("--portrait-tone", route.portraitTone);
    this.el.inkPortrait.classList.remove("show-ancient");
    this.el.portraitModern.classList.remove("is-missing");
    this.el.portraitAncient.classList.remove("is-missing");
    this.el.portraitModern.src = `./assets/images/routes/${route.id}-modern.webp`;
    this.el.portraitAncient.src = `./assets/images/routes/${route.id}-ancient.webp`;
    this.el.portraitModern.alt = `${route.title}男主今生人設`;
    this.el.portraitAncient.alt = `${route.title}男主前世人設`;
  }

  closeScroll() {
    this.el.loveLetter.hidden = true;
    this.showScrollSelect();
  }

  updateReadingProgress() {
    routes.forEach((route) => {
      const card = this.el.grid.querySelector(`[data-route-id="${route.id}"]`);
      card?.classList.toggle("is-viewed", this.viewedRoutes.has(route.id));
    });
    this.el.shelveBooks.hidden = this.viewedRoutes.size < routes.length;
  }

  shelveBooks() {
    if (this.viewedRoutes.size < routes.length) return;
    if (this.booksUnlocked) {
      this.startDialogue(laterDialogue, () => this.showHistoryPrompt());
      return;
    }
    this.booksUnlocked = true;
    localStorage.setItem("booksUnlocked", "true");
    this.el.books.hidden = false;
    this.startDialogue(returnedDialogue, () => this.showHistoryPrompt());
  }

  showHistoryChoice() {
    this.state = GAME_STATE.CHAPTER;
    this.el.panel.hidden = true;
    this.el.historyChoice.hidden = false;
    this.applyDialogueScene("shop");
  }

  showHistoryPrompt() {
    this.state = GAME_STATE.DIALOGUE;
    window.clearInterval(this.typeTimer);
    this.el.next.hidden = true;
    this.el.askHistory.hidden = false;
    this.el.panel.hidden = false;
    this.el.historyChoice.hidden = true;
  }

  async playHistoryVideo() {
    this.state = GAME_STATE.VIDEO;
    this.el.historyChoice.hidden = true;
    this.el.historyVideoScreen.hidden = false;
    this.audio.pauseMusic();
    this.el.historyVideo.currentTime = 0;
    try {
      await this.el.historyVideo.play();
    } catch (error) {
      console.warn("歷史影片無法播放", error);
      this.finishHistoryVideo();
    }
  }

  finishHistoryVideo() {
    this.el.historyVideo.pause();
    this.el.historyVideoScreen.hidden = true;
    this.audio.resumeMusic();
    this.startDialogue(chapterDialogue, () => {
      this.state = GAME_STATE.CHAPTER;
      this.el.panel.hidden = false;
    });
  }

  wait(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }
}

new OtomeGame().start();
