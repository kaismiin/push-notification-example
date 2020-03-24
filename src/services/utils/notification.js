/**
 * @file notification.js is responsible for Firebase Cloud Messaging related functions
 */
const admin = require('firebase-admin');
const { DATABASE_URL } = require('../../constant');
const firebaseConfig = require('../../assets/test-1a69b-firebase-adminsdk-tvuki-14d04b7d0c.json');

/**
 * Notification Class
 *
 * @class Notification
 */
class Notification {
  /**
   * Creates an instance of Notification.
   * @memberof Notification
   */
  constructor(app) {
    this.app = app;
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: DATABASE_URL,
    });
  }

  /**
   * Subscribe the devices corresponding to the registration tokens to the topic.
   *
   * @param {string[]} tokens - subscribers
   * @param {string} topic - topic
   * @returns {boolean} - return true if subscribe success
   * @memberof Notification
   */
  async subscribe(tokens, topic) {
    const response = await admin.messaging().subscribeToTopic(tokens, topic);
    console.log('Successfully subscribed to topic:', response);
    return true;
  }

  /**
   * Unsubscribe the devices corresponding to the registration tokens from the topic.
   *
   * @param {string[]} tokens - subscribers
   * @param {string} topic - topic
   * @returns {boolean} - return true if subscribe success
   * @memberof Notification
   */
  async unsubscribe(tokens, topic) {
    const response = await admin.messaging().unsubscribeFromTopic(tokens, topic);
    console.log('Successfully unsubscribed from topic:', response);
    return true;
  }

  /**
   * Send a message to the device subscribing to the provided topic.
   *
   * @param {string} topic - topic
   * @param {string} message - message
   * @returns {Promise} - resolve when send topic successfully
   * @memberof Notification
   */
  sendByTopic(topic, message) {
    return admin.messaging().send({
      data: {
        message,
      },
      topic,
    });
  }

  /**
   * Send a message to the device corresponding to the provided registration token.
   *
   * @param {string[]} tokens - token list
   * @param {string} title - title
   * @param {string} url - url to be opened
   * @param {string} message - message
   * @returns {Promise} - resolve when success
   * @memberof Notification
   */
  async sendByTokens(tokens, title, url, message) {
    return admin.messaging().sendToDevice(tokens, {
      notification: {
        click_action: url,
        icon: '/favicon-32.png',
        title,
        body: message,
      },
    });
  }

  /**
   * get singleton instance
   *
   * @readonly
   * @static
   * @returns {object} - notification instance
   * @memberof Notification
   */
  static getInstance(app) {
    if (!this.inst) {
      this.inst = new Notification(app);
    }
    return this.inst;
  }
}

module.exports = Notification;
