new Vue({
  el: "#app",
  data() {
    return {
      playerLife: 100,
      monsterLife: 100,
      start: false,
      logs: [],
    };
  },
  computed: {
    hasResult() {
      return this.playerLife <= 0 || this.monsterLife <= 0;
    },
  },
  methods: {
    startGame() {
      this.start = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    attack(special) {
      this.hurt("monsterLife", 5, 10, special, "Hero", "Monster", "hero");
      if (this.monsterLife > 0) {
        this.hurt("playerLife", 7, 12, false, "Monster", "Hero", "monster");
      }
    },
    hurt(prop, min, max, special, source, target, cls) {
      const plus = special ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[prop] = Math.max(this[prop] - hurt, 0);
      this.registerLog(
        `${source} hits ${target} with ${hurt.toFixed(0)} points`,
        cls
      );
    },
    healAndHurt() {
      this.heal(10, 15);
      this.hurt("playerLife", 7, 12, false, "Monster", "Hero", "monster");
    },
    heal(min, max) {
      const heal = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.registerLog(
        `The Hero won ${heal.toFixed(0)} points healthy`,
        "hero"
      );
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return value;
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls });
    },
  },
  watch: {
    hasResult(value) {
      if (value) {
        this.start = false;
      }
    },
  },
});
