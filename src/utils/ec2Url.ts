const ec2Ip = import.meta.env.VITE_EC2_IP;
const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

// export const getUrl = (local: boolean) => {
//   let url = "";

//   if (local) url = `http://${host}:${port}/api`;
//   else if (!local) url = `http://${ec2Ip}:${port}/api`;

//   return url;
// };
let url = "";

export const getUrl = {
  local: () => {
    url = `http://${host}:${port}/api`;
    return url;
  },

  ec2: () => {
    url = `http://${ec2Ip}:${port}/api`;
    return url;
  },

  ec2Secure: () => {
    url = `https://${ec2Ip}:${port}/api`;
    return url;
  },
};
