const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.json({
    result: {
      list_api: "Tiktok Downloader",
      url_api: "/tiktok?url=https://vt.tiktok.com/example-link",
    },
  });
});

app.get("/tiktok", (req, res) => {
  const { url } = req.query;

  const apiurl = `https://api.akuari.my.id/downloader/tiktok4?link=${url}`;

  const tiktokDownload = async () => {
    const respons = await axios.get(apiurl);
    const results = await respons;
    const data = results.data;
    res.json({
      result: {
        message: "Success, Berhasil mendapatkan url",
        data: data.respon,
        isSuccess: true,
      },
    });
  };

  if (url !== "") {
    tiktokDownload();
  } else {
    res.json({
      result: {
        message: "Failed, url tidak boleh kosong",
        isSuccess: false,
      },
    });
  }
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
