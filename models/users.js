const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hashed_password: { type: String, required: true },
    salt: { type: String, required: true }
});

// Define the changePassword method
UserSchema.methods.changePassword = function(oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    const user = this;

    // First, validate the current password
    const oldPasswordBuffer = Buffer.from(oldPassword, 'utf-8');
    crypto.pbkdf2(oldPasswordBuffer, user.salt, 310000, 32, 'sha256', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        const currentHash = derivedKey.toString('base64');
        if (currentHash !== user.hashed_password) {
          reject(new Error('Current password is incorrect'));
          return;
        }

        // Generate a new salt and hash the new password
        user.salt = crypto.randomBytes(16).toString('base64');
        const newPasswordBuffer = Buffer.from(newPassword, 'utf-8');
        crypto.pbkdf2(newPasswordBuffer, user.salt, 310000, 32, 'sha256', (err, derivedKey) => {
          if (err) {
            reject(err);
          } else {
            user.hashed_password = derivedKey.toString('base64');
            user.save()
              .then(() => resolve())
              .catch(error => reject(error));
          }
        });
      }
    });
  });
};


module.exports = mongoose.model('User', UserSchema);
