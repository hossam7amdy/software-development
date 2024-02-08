interface IMessage {
  send(): void;
}

class Hotmail implements IMessage {
  send() {
    console.log("Sending email using Hotmail");
  }
}

class Gmail implements IMessage {
  send() {
    console.log("Sending email using Gmail");
  }
}

class NotifyService {
  private messageService: IMessage;

  constructor(messageService: IMessage) {
    this.messageService = messageService;
  }

  send() {
    this.messageService.send();
  }
}

const notify = new NotifyService(new Gmail());
notify.send();

const notify2 = new NotifyService(new Hotmail());
notify2.send();
