import * as path from 'path';
const fs = require('fs');
import { A } from './index';
import * as AWS from 'aws-sdk';

describe("sample", function() {

  var s3;

  const inputBucket = {
    Bucket: "input-bucket-test1234", 
    CreateBucketConfiguration: {
      LocationConstraint: "ap-northeast-1"
    }
  };

  beforeAll(done => {
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.createBucket(inputBucket).promise()
    .then(output => {
      console.log('bucket create success!');
      const params = buildParams(__dirname, 'test.txt');
      return s3.putObject(params).promise();
    }).then(output => {
      console.log('file upload!');
      const url = s3.getSignedUrl('getObject', {Bucket: 'input-bucket-test1234', Key: 'text.txt'});
      console.log(url);
      done();
    }).catch(error => {
      console.log(error);
    });
  });

  afterAll(done => {
    s3 = new AWS.S3({apiVersion: '2006-03-01'});

    var deleteObject = function(bucketName, key) {
      return new Promise((resolve, reject) => {
        s3.deleteObject({
          Bucket: bucketName,
          Key: key
        })
        .promise()
        .then((data) => {
          console.log("  [Key]" + key + " DELETED");
          resolve();
        })
        .catch((err) => {
          reject("  [Error]" + key + " NOT DELETED ¥n" + err);
        });
      });
    }

    s3.listObjects({ Bucket: "input-bucket-test1234" }).promise()
    .then(output => {
      Promise.all(output.Contents.map(content => {
        return deleteObject("input-bucket-test1234", content.Key);
      })).then(output => {
        return s3.deleteBucket({ Bucket: "input-bucket-test1234" }).promise();
      }).then(output => {
        done();
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  });

  it("should be of a stock", function() {
    const a = new A('test');
    expect(a.say()).toBe('test');
  });

  it("should be hello!", function() {
    const a = new A('test');
    expect(a.hello()).toBe('hello');
  });
});


function buildParams(filedir, file) {
  return {
    Bucket: 'input-bucket-test1234',
    Key: file,
    Body: fs.readFileSync(path.join(filedir,file))
  };

}
