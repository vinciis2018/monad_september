import port from "services/port";

/**
 * Get file's media type
 * @param {string} contentType html5 content type
 * @returns {string} file type
 */
export const getMediaType = (contentType: any) => {
  let mediaType = contentType;
  // console.log(mediaType);
  if (contentType) {
    if (contentType.includes("image/")) {
      mediaType = "image";
    } else if (contentType.includes("video/")) {
      mediaType = "video";
    } else if (contentType.includes("text/html")) {
      mediaType = "iframe";
    }
  }
  return mediaType;
};

/**
 * Get file blob and data buffer
 * @param {string} url File url
 * @returns {Array} [dataBuffer, blob]
 */
export const getFileData = async (url: string) => {
  // console.log("url", url);
  const response = await fetch(url);
  // console.log(response);
  const blob = await response.blob();
  // console.log(blob);
  const dataBuffer = await blob.arrayBuffer();

  return [dataBuffer, blob];
};

export const triggerPort = (nftId: any[]) => {
  port.propagatePoRT(nftId);
};

/**
 *
 * @param {Function} fn Function to poll for result
 * @param {Number} timeout How long to poll for
 * @param {Number} interval Polling interval
 * @returns {Promise}
 */
export const poll = (fn: any, timeout: any, interval: any) => {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  var checkCondition = function (resolve: any, reject: any) {
    // If the condition is met, we're done!
    var result = fn();
    if (result) {
      resolve(result);
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    // Didn't match and too much time, reject!
    else {
      reject(new Error("timed out for " + fn + ": " + arguments));
    }
  };

  return new Promise(checkCondition);
};
