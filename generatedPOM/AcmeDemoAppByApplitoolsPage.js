class AcmeDemoAppByApplitools {
  constructor() {
    this.username = "#username";
    this.password = "#password";
    this.signIn = "#log-in";
  }

  getElementByName(name) {
    return this[name];
  }
}

module.exports = new AcmeDemoAppByApplitools();
