const imageLoader = ({
  src,
  width,
  height,
  quality,
}: {
  src: any;
  width: any;
  height: string;
  quality?: any;
}) => {
  return `${src}?w${width}&h=${height}&q=${quality}`;
};

export default imageLoader;
