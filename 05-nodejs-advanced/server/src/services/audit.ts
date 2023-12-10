import { EventEmitter } from "events";

enum ACTIONS {
  SERVER_ERROR = "SERVER_ERROR",
  FAILED_LOGIN_ATTEMPT = "FAILED_LOGIN_ATTEMPT",
}

/**
 * Audit service
 * @description
 * this.emitter service is responsible for logging audit events
 * @event audit
 * @param {object} event
 * @param {string} event.action - action name
 * @param {object} event.data
 * @example
 * const auditService = new AuditService();
 * auditService.onAudit((event) => {
 *  console.log(event);
 * });
 * auditService.log(AuditService.ACTIONS.SERVER_ERROR, { message: "Something went wrong" });
 * auditService.log(AuditService.ACTIONS.FAILED_LOGIN_ATTEMPT, { username: "admin" });
 * @see https://nodejs.org/api/events.html#events_class_eventemitter
 */

class AuditService {
  private readonly type = "audit";
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  log(action: ACTIONS, data: any) {
    this.emitter.emit(this.type, { action, data });
  }

  onAudit(handler: (event: any) => void) {
    this.emitter.on(this.type, handler);
  }

  offAudit(handler: (event: any) => void) {
    this.emitter.off(this.type, handler);
  }

  static ACTIONS = ACTIONS;
}

export default AuditService;
