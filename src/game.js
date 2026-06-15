const GAME_STATE = Object.freeze({
  TITLE: "title",
  DIALOGUE: "dialogue",
  SELECT: "select",
  TEASER: "teaser",
});

const dialogue = [
  { speaker: "旁白", text: "雨下得正急。你循著一盞將熄的燈，推開了巷尾那扇從未見過的門。" },
  { speaker: "書肆主人", text: "姑娘，夜半入店，可是來尋一本忘了名字的書？" },
  { speaker: "你", text: "我只是避雨。這裡……賣的都是書卷嗎？" },
  { speaker: "書肆主人", text: "尋常書卷記人間事；我這裡的，記的是人間未了之事。" },
  { speaker: "書肆主人", text: "五卷命書，五位故人。有人等你一世，也有人等了不只一世。" },
  { speaker: "書肆主人", text: "選吧。只是書卷一開，前塵便再也不能作夢看了。" },
];

const routes = [
  { glyph: "霜", title: "照雪錄", era: "前世 · 大晟十二年", role: "冷面少將軍", seal: "守", tone: "linear-gradient(145deg, #27313d, #12171e)", line: "他曾以一城風雪，換你平安離去。今生再見，卻唯獨不記得你。" },
  { glyph: "燼", title: "焚心策", era: "前世 · 赤京之變", role: "偏執帝王", seal: "業", tone: "linear-gradient(145deg, #4a211d, #160e0d)", line: "萬里江山與你，他從來沒有選對過。這一次，他說要重寫結局。" },
  { glyph: "月", title: "聽月箋", era: "前世 · 江南煙雨", role: "溫柔琴師", seal: "念", tone: "linear-gradient(145deg, #263d3b, #101918)", line: "你忘了月下那一曲，他卻在每個輪迴，都彈到天明。" },
  { glyph: "詭", title: "無相書", era: "前世 · 司天秘聞", role: "神秘國師", seal: "謎", tone: "linear-gradient(145deg, #33263d, #151019)", line: "他替天下人算盡命數，卻把你的名字，藏在無人能解的卦中。" },
  { glyph: "劍", title: "山河契", era: "前世 · 仙門舊約", role: "清冷劍尊", seal: "契", tone: "linear-gradient(145deg, #334044, #101718)", line: "斬斷情絲那日，他的劍沒有回鞘。千年後，你成了他唯一的心魔。" },
];

class AudioDirector {
  constructor() {
    this.context = null;
    this.muted = false;
    this.ambientTimer = null;
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
}

class OtomeGame {
  constructor() {
    this.state = GAME_STATE.TITLE;
    this.dialogueIndex = 0;
    this.typeTimer = null;
    this.audio = new AudioDirector();

    this.el = {
      scene: document.querySelector("#scene"),
      title: document.querySelector("#title-screen"),
      story: document.querySelector("#story-screen"),
      enter: document.querySelector("#enter-button"),
      sound: document.querySelector("#sound-toggle"),
      chapter: document.querySelector("#chapter-card"),
      panel: document.querySelector("#dialogue-panel"),
      speaker: document.querySelector("#speaker-name"),
      text: document.querySelector("#dialogue-text"),
      progress: document.querySelector("#progress-mark"),
      next: document.querySelector("#dialogue-next"),
      select: document.querySelector("#scroll-select"),
      grid: document.querySelector("#scroll-grid"),
      teaser: document.querySelector("#route-teaser"),
      routeEra: document.querySelector("#route-era"),
      routeTitle: document.querySelector("#route-title"),
      routeSeal: document.querySelector("#route-seal"),
      routeLine: document.querySelector("#route-line"),
      back: document.querySelector("#return-button"),
      transition: document.querySelector("#transition"),
      embers: document.querySelector("#embers"),
    };
  }

  start() {
    this.createEmbers();
    this.createScrolls();
    this.bindEvents();
  }

  bindEvents() {
    this.el.enter.addEventListener("click", () => this.enterStory());
    this.el.next.addEventListener("click", () => this.nextDialogue());
    this.el.panel.addEventListener("click", (event) => {
      if (!event.target.closest("button")) this.nextDialogue();
    });
    this.el.sound.addEventListener("click", () => {
      const muted = this.audio.toggle();
      this.el.sound.classList.toggle("is-muted", muted);
      this.el.sound.setAttribute("aria-label", muted ? "開啟音效" : "關閉音效");
    });
    this.el.back.addEventListener("click", () => this.showScrollSelect());
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
    this.audio.enter();
    this.el.transition.classList.add("active");
    await this.wait(900);
    this.state = GAME_STATE.DIALOGUE;
    this.el.title.hidden = true;
    this.el.story.hidden = false;
    this.el.scene.classList.remove("scene-title");
    this.el.scene.classList.add("scene-shop");
    await this.wait(550);
    this.el.transition.classList.remove("active");
    await this.wait(2900);
    this.el.chapter.hidden = true;
    this.el.scene.classList.add("dialogue-active");
    this.el.panel.hidden = false;
    this.showDialogue();
  }

  showDialogue() {
    const line = dialogue[this.dialogueIndex];
    this.el.speaker.textContent = line.speaker;
    this.el.progress.textContent = `${String(this.dialogueIndex + 1).padStart(2, "0")} / ${String(dialogue.length).padStart(2, "0")}`;
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

    const current = dialogue[this.dialogueIndex].text;
    if (this.el.text.textContent.length < Array.from(current).length) {
      window.clearInterval(this.typeTimer);
      this.el.text.textContent = current;
      return;
    }

    this.audio.tap();
    if (this.dialogueIndex < dialogue.length - 1) {
      this.dialogueIndex += 1;
      this.showDialogue();
      return;
    }
    this.showScrollSelect();
  }

  showScrollSelect() {
    this.state = GAME_STATE.SELECT;
    window.clearInterval(this.typeTimer);
    this.el.panel.hidden = true;
    this.el.teaser.hidden = true;
    this.el.select.hidden = false;
    this.audio.reveal();
  }

  async chooseRoute(route) {
    this.audio.reveal();
    this.el.transition.classList.add("active");
    await this.wait(650);
    this.state = GAME_STATE.TEASER;
    this.el.select.hidden = true;
    this.el.routeEra.textContent = route.era;
    this.el.routeTitle.textContent = route.title;
    this.el.routeSeal.textContent = route.glyph;
    this.el.routeLine.textContent = route.line;
    this.el.teaser.hidden = false;
    await this.wait(300);
    this.el.transition.classList.remove("active");
  }

  wait(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }
}

new OtomeGame().start();
