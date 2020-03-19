import Component from '@ember/component';
import { set, computed } from '@ember/object';

export default Component.extend({
  dark: true,
  iconName: computed("dark", function(){
    return this.dark ? "light" : "dark"
  }),

  toggleDarkTheme(match) {
    document.body.classList.toggle('dark', match);
  },
  init() {
    this._super();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    set(this, 'dark', prefersDark.matches);
    this.toggleDarkTheme(this.dark);
    prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches))
  },
  actions: {
    onToggle() {
      if (this.dark) {
        set(this, 'dark', false);
        this.toggleDarkTheme(this.dark);
      }
      else {
        set(this,'dark', true);
        this.toggleDarkTheme(this.dark);
      }
    }
  }
});