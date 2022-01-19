/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["api.immortalarena.io"],
    loader: "imgix",
    path: "",
  },
};
