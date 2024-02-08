class Hotmail {
  send() {
    console.log("Sending email using Hotmail");
  }
}

class Gmail {
  send() {
    console.log("Sending email using Gmail");
  }
}

export class Notify {
  private gmail = new Gmail();
  private hotmail = new Hotmail();

  sendGmail() {
    this.gmail.send();
  }

  sendHotmail() {
    this.hotmail.send();
  }
}

const notify = new Notify();
notify.sendGmail();
notify.sendHotmail();
