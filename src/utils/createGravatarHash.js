import MD5 from "crypto-js/md5";

const createGravatarHash = (email) => {
  return MD5(email.toLowerCase().trim());
};

export default createGravatarHash;
