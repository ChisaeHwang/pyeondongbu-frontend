import React from "react";

interface AdBannerProps {
  client?: string;
  slot?: string;
  width?: number;
  height?: number;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  client = "ca-pub-9895707756303015",
  slot = "5409996939",
  width = 300,
  height = 250,
  className = "my-8",
}) => {
  return (
    <div className={`flex justify-center w-full ${className}`}>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <amp-ad
            layout="fixed"
            width="${width}"
            height="${height}"
            type="adsense"
            data-ad-client="${client}"
            data-ad-slot="${slot}">
          </amp-ad>
        `,
        }}
      />
    </div>
  );
};

export default AdBanner;
