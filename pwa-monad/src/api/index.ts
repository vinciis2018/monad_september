import axios from "services/axios";

export const voteAsNsfw = async (nftId: string) => {
  return await axios.post(
    `/voteNSFWContent`,
    {
      NFTId: nftId,
    },
    {
      baseURL: process.env.REACT_APP_API_URL,
    }
  );
};

export const fetchNsfwList = async () => {
  return await axios.get(`/getNSFWList`, {
    baseURL: process.env.REACT_APP_API_URL,
  });
};

/**
 *
 * @param videoFile {FIle} // the video file
 * @param numberOfThumbnails {number} //number of thumbnails you want to generate
 * @returns {string[]} // an array of base64 thumbnails images
 *
 * @abstract
 * Idea taken from - https://codepen.io/aertmann/pen/mrVaPx
 * The original functionality of getVideoThumbnail() function is customized as per working code
 * If it didn't work in future then replace it with about links working example
 */
export const generateVideoThumbnails = async (
  videoFile: any,
  numberOfThumbnails: any
) => {
  let thumbnail: any = [];
  let fractions: any = [];
  return new Promise((resolve, reject) => {
    if (!videoFile.type?.includes("video")) reject("not a valid video file");
    getVideoDuration(videoFile).then(async (duration: any) => {
      // divide the video timing into particular timestamps in respective to number of thumbnails
      // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
      // we will use this timestamp to take snapshots
      for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
        fractions.push(Math.floor(i));
      }
      // the array of promises
      let promiseArray = fractions.map((time: any) => {
        return getVideoThumbnail(videoFile, time);
      });
      // console.log('promiseArray', promiseArray)
      // console.log('duration', duration)
      // console.log('fractions', fractions)
      await Promise.all(promiseArray)
        .then((res) => {
          res.forEach((res) => {
            // console.log('res', res.slice(0,8))
            thumbnail.push(res);
          });
          console.log("thumbnail", thumbnail);
          resolve(thumbnail);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          resolve(thumbnail);
        });
    });
    reject("something went wront");
  });
};

const getVideoThumbnail = (file: any, videoTimeInSeconds: any) => {
  let revoke: any = null;
  return new Promise((resolve, reject) => {
    if (file.type.match("video")) {
      importFileandPreview(
        file.then((urlOfFile: any) => {
          var video = document.createElement("video");
          var timeupdate = function () {
            if (snapImage()) {
              video.removeEventListener("timeupdate", timeupdate);
              video.pause();
            }
          };
          video.addEventListener("loadeddata", function () {
            if (snapImage()) {
              video.removeEventListener("timeupdate", timeupdate);
            }
          });
          var snapImage = function () {
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
              .getContext("2d")
              ?.drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();
            var success = image.length > 100000;
            if (success) {
              URL.revokeObjectURL(urlOfFile);
              resolve(image);
            }
            return success;
          };
          video.addEventListener("timeupdate", timeupdate);
          video.preload = "metadata";
          video.src = urlOfFile;
          video.muted = true;
          video.playsInline = true;
          video.currentTime = videoTimeInSeconds;
          video.play();
        }),
        revoke
      );
    } else {
      reject("file not valid");
    }
  });
};

export const getVideoDuration = (videoFile: any) => {
  return new Promise((resolve, reject) => {
    if (videoFile) {
      if (videoFile.type.match("video")) {
        importFileandPreview(videoFile, null).then((url) => {
          let video = document.createElement("video");
          video.addEventListener("loadeddata", function () {
            resolve(video.duration);
          });
          video.preload = "metadata";
          // video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
          //  window.URL.revokeObjectURL(url);
        });
      }
    } else {
      reject(0);
    }
  });
};

export const importFileandPreview = (file: any, revoke: any) => {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    let preview = window.URL.createObjectURL(file);
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 100);
  });
};
