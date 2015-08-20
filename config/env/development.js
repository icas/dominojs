/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  application_auth: {
    facebookClientID: "397964557060349",
    facebookClientSecret: "de3bb0d05e5a75df8aeda8fbbe120f52",
    facebookCallbackURL: "http://localhost:1337/auth/facebook/callback"
  }
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

};
