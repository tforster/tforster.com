("use strict");

// Third party dependencies (Typically found in public NPM packages)
const AWS = require("aws-sdk");

/**
 * A wrapper around the minimum required AWS Amplify methods required to deploy the built web artifacts
 * @class Amplify
 */
class Amplify {
  /**
   *
   * Deploy a pre-existing AWS Amplify website using content from an S3 bucket
   * @static
   * @param {object} options: A small set of properties describing S3 object details, AWS regions and Amplify application identity
   * @returns {promise}
   * @memberof Amplify
   */
  static async deploy(options) {
    // Construct the source Url to fetch the archive from
    const sourceUrl = `https://s3.${options.aws.bucketRegion}.amazonaws.com/${options.aws.bucket}/${options.aws.key}`;
    //https://s3.ca-central-1.amazonaws.com/wp.tforster.com/archive.zip

    // Create new Amplify client
    const amplify = new AWS.Amplify({ region: options.aws.amplifyRegion });

    // Set the minimal required Amplify application identifiers. Assumes the application was pre-created in the AWS Amplify Console
    // ToDo: Create a new Amplify application if this is the first time deploying and it does not exist.
    const appId = options.appId;
    const branchName = options.stage;

    // Deploy a previously copied zip from S3
    // ! Amplify deploys only changed files from the zip and does garbage collection on redundant files "later"
    await amplify
      .startDeployment({
        appId,
        branchName,
        sourceUrl,
      })
      .promise();

    return Promise.resolve("zip uploaded to AWS Amplify");
  }
}

module.exports = Amplify;