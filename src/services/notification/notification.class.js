const NotificationUtil = require('../utils/notification.js');
const { TOKENS, TITLE, LINK } = require('../../constant');
const moment = require('moment');

/* eslint-disable no-unused-vars */
exports.Notification = class Notification {
  constructor(options) {
    this.options = options || {};
  }

  /**
   * setup function which is invoked by feathers for initialization
   * @param {object} app - the app object of feathers
   * @param {object} path - the path of this service
   * @returns {Promise<void>} - return Promise contains void
   * @memberof KeyResultManagement
   */
  async setup(app, path) {
    this.app = app;
  }

  async find(params) {
    const message = moment().format('llll');
    return NotificationUtil.getInstance(this.app).sendByTokens(TOKENS, TITLE, LINK, message);
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
