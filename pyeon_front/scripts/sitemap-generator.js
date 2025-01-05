require("babel-register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-runtime"],
});

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;
const jobsData = require("../src/assets/data/jobs.json");
const noticesData = require("../src/assets/data/notices.json");

// 동적 라우트를 위한 파라미터 정의
const paramsConfig = {
  "/jobs/:id": jobsData.jobs.map((job) => ({
    id: job.id.toString(),
  })),
  "/notices/:id": noticesData.notices.map((notice) => ({
    id: notice.id.toString(),
  })),
};

function generateSitemap() {
  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build("https://pyeondongbu.com")
    .save("./public/sitemap.xml");
}

generateSitemap();
