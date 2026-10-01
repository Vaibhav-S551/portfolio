const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dns.promises
  .resolveSrv("_mongodb._tcp.portfolio.8osujb0.mongodb.net")
  .then((records) => {
    console.log("SRV lookup successful:");
    console.log(records);
  })
  .catch((error) => {
    console.error("SRV lookup failed:");
    console.error(error);
  });