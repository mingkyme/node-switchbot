/* ------------------------------------------------------------------
* node-linking - switchbot-device-wohumi.js
*
* Copyright (c) 2019-2020, Futomi Hatano, All rights reserved.
* Released under the MIT license
* Date: 2020-02-10
* ---------------------------------------------------------------- */
'use strict';
const SwitchbotDevice = require('./switchbot-device.js');

class SwitchbotDeviceWoHumi extends SwitchbotDevice {

  /* ------------------------------------------------------------------
  * press()
  * - Press
  *
  * [Arguments]
  * - none
  *
  * [Returen value]
  * - Promise object
  *   Nothing will be passed to the `resolve()`.
  * ---------------------------------------------------------------- */
  press() {
    return this._operateBot([0x57, 0x01, 0x00]);
  }

  /* ------------------------------------------------------------------
  * turnOn()
  * - Turn on
  *
  * [Arguments]
  * - none
  *
  * [Returen value]
  * - Promise object
  *   Nothing will be passed to the `resolve()`.
  * ---------------------------------------------------------------- */
  turnOn() {
    return this._operateBot([0x57, 0x01, 0x01]);
  }

  /* ------------------------------------------------------------------
  * turnOff()
  * - Turn off
  *
  * [Arguments]
  * - none
  *
  * [Returen value]
  * - Promise object
  *   Nothing will be passed to the `resolve()`.
  * ---------------------------------------------------------------- */
  turnOff() {
    return this._operateBot([0x57, 0x01, 0x02]);
  }

  /* ------------------------------------------------------------------
  * down()
  * - Down
  *
  * [Arguments]
  * - none
  *
  * [Returen value]
  * - Promise object
  *   Nothing will be passed to the `resolve()`.
  * ---------------------------------------------------------------- */
  down() {
    return this._operateBot([0x57, 0x01, 0x03]);
  }

  /* ------------------------------------------------------------------
  * up()
  * - Up
  *
  * [Arguments]
  * - none
  *
  * [Returen value]
  * - Promise object
  *   Nothing will be passed to the `resolve()`.
  * ---------------------------------------------------------------- */
  up() {
    return this._operateBot([0x57, 0x01, 0x04]);
  }

  _operateBot(bytes) {
    return new Promise((resolve, reject) => {
      let req_buf = Buffer.from(bytes);
      this._command(req_buf).then((res_buf) => {
        let code = res_buf.readUInt8(0);
        if (res_buf.length === 3 && (code === 0x01 || code === 0x05)) {
          resolve();
        } else {
          reject(new Error('The device returned an error: 0x' + res_buf.toString('hex')));
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

}

module.exports = SwitchbotDeviceWoHumi;